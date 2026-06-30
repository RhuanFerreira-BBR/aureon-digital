export const contactEmail = {
  en: "contact@aureondigital.co",
  pt: "contato@aureondigital.co",
} as const;

export type ContactLang = keyof typeof contactEmail;

export function contactHref(lang: ContactLang, subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body.replace(/\r\n|\r|\n/g, "\r\n"));

  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${contactEmail[lang]}${query ? `?${query}` : ""}`;
}
