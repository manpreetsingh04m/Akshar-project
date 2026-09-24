const HUBSPOT_API_BASE = "https://api.hubapi.com";

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status?: number };

const MAX_RETRIES = 3;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function friendlyHubSpotError(status: number, body: string): string {
  if (status === 401 || status === 403) {
    return "We could not connect to our CRM. Please try again later or contact us directly.";
  }
  if (status === 409) {
    return "We already have your details on file — our team will be in touch.";
  }
  if (status === 429) {
    return "Our systems are busy. Please wait a moment and try again.";
  }
  try {
    const parsed = JSON.parse(body) as { message?: string };
    if (parsed.message?.includes("already exists")) {
      return "We already have your details on file — our team will be in touch.";
    }
  } catch {
    /* ignore */
  }
  return "Something went wrong while saving your details. Please try again.";
}

export async function hubspotFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<Result<T>> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    return { ok: false, error: "HubSpot integration is not configured." };
  }

  const url = path.startsWith("http") ? path : `${HUBSPOT_API_BASE}${path}`;
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let lastError: string = "Request failed.";
  let lastStatus: number | undefined;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, { ...init, headers });

      if (response.status === 429 && attempt < MAX_RETRIES) {
        const retryAfter = response.headers.get("Retry-After");
        const delayMs = retryAfter
          ? Number.parseInt(retryAfter, 10) * 1000
          : 2 ** attempt * 1000;
        await sleep(Number.isFinite(delayMs) ? delayMs : 1000);
        continue;
      }

      const text = await response.text();
      if (!response.ok) {
        lastStatus = response.status;
        lastError = friendlyHubSpotError(response.status, text);
        if (response.status === 429 && attempt === MAX_RETRIES) {
          return { ok: false, error: lastError, status: lastStatus };
        }
        if (response.status >= 500 && attempt < MAX_RETRIES) {
          await sleep(2 ** attempt * 1000);
          continue;
        }
        return { ok: false, error: lastError, status: lastStatus };
      }

      if (!text) {
        return { ok: true, data: {} as T };
      }

      try {
        return { ok: true, data: JSON.parse(text) as T };
      } catch {
        return { ok: false, error: "Unexpected response from HubSpot." };
      }
    } catch {
      lastError = "Network error while contacting HubSpot.";
      if (attempt < MAX_RETRIES) {
        await sleep(2 ** attempt * 1000);
        continue;
      }
    }
  }

  return { ok: false, error: lastError, status: lastStatus };
}

export type HubSpotContactProperties = {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  destination?: string;
  purpose?: string;
  source?: string;
  message?: string;
};

export async function createHubSpotContact(
  properties: HubSpotContactProperties,
): Promise<Result<{ id: string }>> {
  const hubspotProperties: Record<string, string> = {
    email: properties.email,
  };
  if (properties.firstname) hubspotProperties.firstname = properties.firstname;
  if (properties.lastname) hubspotProperties.lastname = properties.lastname;
  if (properties.phone) hubspotProperties.phone = properties.phone;
  if (properties.destination) hubspotProperties.destination = properties.destination;
  if (properties.purpose) hubspotProperties.purpose = properties.purpose;
  if (properties.source) hubspotProperties.source = properties.source;
  if (properties.message) hubspotProperties.message = properties.message;

  const result = await hubspotFetch<{ id: string }>(
    "/crm/v3/objects/contacts",
    {
      method: "POST",
      body: JSON.stringify({ properties: hubspotProperties }),
    },
  );

  if (!result.ok) {
    return result;
  }

  return { ok: true, data: { id: result.data.id } };
}
