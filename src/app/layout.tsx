import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { getAudiences, getGlobal, getStrapiMedia } from "@/lib/strapi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppDownloadBanner from "@/components/AppDownloadBanner";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

// Metadata global. El favicon se edita desde Strapi (Global → favicon); si no
// hay uno subido se usa el favicon.ico por defecto del proyecto.
export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();
  const faviconUrl = getStrapiMedia(global?.favicon);
  return {
    ...(SITE_URL ? { metadataBase: new URL(SITE_URL) } : {}),
    title: {
      default: global?.siteName ?? "Banco Avanz",
      template: `%s | ${global?.siteName ?? "Banco Avanz"}`,
    },
    description: "Ponemos a disposición productos y servicios a tu medida.",
    openGraph: {
      siteName: global?.siteName ?? "Banco Avanz",
      type: "website",
      locale: "es_NI",
    },
    ...(faviconUrl ? { icons: { icon: faviconUrl } } : {}),
  };
}

// ISR: las páginas se cachean y se regeneran cada 5 minutos, así un cambio
// en Strapi aparece solo sin redeploy y sin golpear el backend en cada visita.
export const revalidate = 300;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [global, audiences] = await Promise.all([getGlobal(), getAudiences()]);

  return (
    <html lang="es" className={`${openSans.variable} h-full antialiased`}>
      <body className="flex min-h-screen flex-col">
        <Header global={global} audiences={audiences} />
        <main className="flex-1">{children}</main>
        <AppDownloadBanner
          title={global?.appBannerTitle}
          text={global?.appBannerText}
          appStoreUrl={global?.appStoreUrl}
          playStoreUrl={global?.playStoreUrl}
        />
        <Footer global={global} />
      </body>
    </html>
  );
}
