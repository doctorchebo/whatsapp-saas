import { defaultLocale, locales } from "@/i18n";
import { getTeamForUser, getUser } from "@/lib/db/queries";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Manrope } from "next/font/google";
import { SWRConfig } from "swr";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js SaaS Starter",
  description: "Get started quickly with Next.js, Postgres, and Stripe.",
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  const messages = await getMessages();

  return (
    <html
      lang={locale || defaultLocale}
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SWRConfig
            value={{
              fallback: {
                // We do NOT await here
                // Only components that read this data will suspend
                "/api/user": getUser(),
                "/api/team": getTeamForUser(),
              },
            }}
          >
            {children}
          </SWRConfig>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
