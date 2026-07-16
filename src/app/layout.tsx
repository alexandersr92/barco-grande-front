import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { getAudiences, getGlobal } from "@/lib/strapi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppDownloadBanner from "@/components/AppDownloadBanner";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Banco Avanz",
    template: "%s | Banco Avanz",
  },
  description: "Ponemos a disposición productos y servicios a tu medida.",
};

// Renderizar en runtime (no pre-generar en el build): así el fetch de datos
// usa la red interna de Docker, que solo existe con el contenedor corriendo.
export const dynamic = "force-dynamic";

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
          appStoreUrl={global?.appStoreUrl}
          playStoreUrl={global?.playStoreUrl}
        />
        <Footer global={global} />
      </body>
    </html>
  );
}
