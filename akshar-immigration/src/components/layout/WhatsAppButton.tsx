import { MessageCircle } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447918036171";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP.replace(/\D/g, "")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
