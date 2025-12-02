import { locales } from "@/i18n";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  // Validate locale
  if (!locales.includes(locale as any)) {
    return {
      messages: (await import(`@/messages/en.json`)).default,
    };
  }

  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
