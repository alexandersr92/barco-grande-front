import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { getGlobal } from "@/lib/strapi";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const global = await getGlobal();

  return (
    <html lang="es" className={`${openSans.variable} h-full antialiased`}>
      <body className="flex min-h-screen flex-col">
        <Header global={global} />
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
