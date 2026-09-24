/**
 * IRCC-inspired CRS estimate for educational purposes only.
 *
 * Simplifications vs official Express Entry CRS:
 * - Single CLB score applied to all four language abilities (no per-skill grid).
 * - Second official language points are not calculated separately.
 * - Spouse factors use reduced tables; spouse language/education are optional partial inputs.
 * - Skill transferability (education + language / foreign work combos) uses a capped proxy, not full IRCC matrices.
 * - No provincial nomination, job offer, or sibling in Canada bonuses.
 *
 * For a formal assessment, use IRCC tools or speak with a licensed consultant.
 */

export type EducationLevel =
  | "less-than-secondary"
  | "secondary"
  | "one-year"
  | "two-year"
  | "bachelors"
  | "two-or-more"
  | "masters"
  | "doctoral";

export type CrsSpouseInput = {
  education?: EducationLevel;
  englishClb?: number;
};

export type CrsInput = {
  age: number;
  education: EducationLevel;
  /** Representative CLB level (4–10) for first official language */
  englishClb: number;
  /** Full-time skilled work in Canada (years, 0–5+) */
  canadianWorkYears: number;
  spouse?: CrsSpouseInput;
};

export type CrsBreakdown = {
  age: number;
  education: number;
  firstLanguage: number;
  canadianWork: number;
  spouseEducation: number;
  spouseLanguage: number;
  skillTransferability: number;
};

export type CrsResult = {
  score: number;
  breakdown: CrsBreakdown;
};

function agePoints(age: number, spousePresent: boolean): number {
  const tableSingle: Record<number, number> = {
    17: 0,
    18: 99,
    19: 105,
    20: 110,
    21: 110,
    22: 110,
    23: 110,
    24: 110,
    25: 110,
    26: 110,
    27: 110,
    28: 110,
    29: 110,
    30: 105,
    31: 99,
    32: 94,
    33: 88,
    34: 83,
    35: 77,
    36: 72,
    37: 66,
    38: 61,
    39: 55,
    40: 50,
    41: 39,
    42: 28,
    43: 17,
    44: 6,
  };
  const tableSpouse: Record<number, number> = {
    17: 0,
    18: 90,
    19: 95,
    20: 100,
    21: 100,
    22: 100,
    23: 100,
    24: 100,
    25: 100,
    26: 100,
    27: 100,
    28: 100,
    29: 100,
    30: 95,
    31: 90,
    32: 85,
    33: 80,
    34: 75,
    35: 70,
    36: 65,
    37: 60,
    38: 55,
    39: 50,
    40: 45,
    41: 35,
    42: 25,
    43: 15,
    44: 5,
  };
  const table = spousePresent ? tableSpouse : tableSingle;
  if (age <= 17) return 0;
  if (age >= 45) return 0;
  return table[age] ?? 0;
}

function educationPoints(
  level: EducationLevel,
  spousePresent: boolean,
): number {
  const single: Record<EducationLevel, number> = {
    "less-than-secondary": 0,
    secondary: 30,
    "one-year": 90,
    "two-year": 98,
    bachelors: 120,
    "two-or-more": 128,
    masters: 135,
    doctoral: 150,
  };
  const spouse: Record<EducationLevel, number> = {
    "less-than-secondary": 0,
    secondary: 28,
    "one-year": 84,
    "two-year": 91,
    bachelors: 112,
    "two-or-more": 119,
    masters: 126,
    doctoral: 140,
  };
  return (spousePresent ? spouse : single)[level];
}

function firstLanguagePoints(clb: number, spousePresent: boolean): number {
  const clamped = Math.min(10, Math.max(4, Math.floor(clb)));
  const single = [0, 0, 0, 0, 6, 6, 9, 17, 23, 31, 34];
  const spouse = [0, 0, 0, 0, 6, 6, 8, 16, 22, 29, 32];
  const table = spousePresent ? spouse : single;
  return table[clamped] ?? 0;
}

function canadianWorkPoints(years: number, spousePresent: boolean): number {
  const y = Math.min(5, Math.max(0, Math.floor(years)));
  const single = [0, 40, 53, 64, 72, 80];
  const spouse = [0, 35, 46, 56, 63, 70];
  return (spousePresent ? spouse : single)[y] ?? 0;
}

function spouseEducationPoints(level?: EducationLevel): number {
  if (!level) return 0;
  const map: Record<EducationLevel, number> = {
    "less-than-secondary": 0,
    secondary: 2,
    "one-year": 6,
    "two-year": 7,
    bachelors: 8,
    "two-or-more": 9,
    masters: 10,
    doctoral: 10,
  };
  return map[level];
}

function spouseLanguagePoints(clb?: number): number {
  if (!clb || clb < 4) return 0;
  const clamped = Math.min(10, Math.floor(clb));
  if (clamped <= 4) return 0;
  if (clamped <= 6) return 1;
  if (clamped <= 8) return 3;
  return 5;
}

/** Simplified skill transferability cap (proxy for IRCC combo tables). */
function skillTransferabilityProxy(
  education: EducationLevel,
  clb: number,
  canadianYears: number,
): number {
  let points = 0;
  const postSecondary =
    education !== "less-than-secondary" && education !== "secondary";
  if (postSecondary && clb >= 7) points += 25;
  if (postSecondary && clb >= 9) points += 25;
  if (canadianYears >= 1 && clb >= 7) points += 25;
  if (canadianYears >= 2 && education === "bachelors") points += 25;
  return Math.min(100, points);
}

export function calculateCrs(input: CrsInput): CrsResult {
  const spousePresent = Boolean(input.spouse);
  const breakdown: CrsBreakdown = {
    age: agePoints(input.age, spousePresent),
    education: educationPoints(input.education, spousePresent),
    firstLanguage: firstLanguagePoints(input.englishClb, spousePresent),
    canadianWork: canadianWorkPoints(
      input.canadianWorkYears,
      spousePresent,
    ),
    spouseEducation: spousePresent
      ? spouseEducationPoints(input.spouse?.education)
      : 0,
    spouseLanguage: spousePresent
      ? spouseLanguagePoints(input.spouse?.englishClb)
      : 0,
    skillTransferability: skillTransferabilityProxy(
      input.education,
      input.englishClb,
      input.canadianWorkYears,
    ),
  };

  const score =
    breakdown.age +
    breakdown.education +
    breakdown.firstLanguage +
    breakdown.canadianWork +
    breakdown.spouseEducation +
    breakdown.spouseLanguage +
    breakdown.skillTransferability;

  return { score, breakdown };
}
