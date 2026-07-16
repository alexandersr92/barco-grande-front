import type { Metadata } from "next";
import { getChannels } from "@/lib/strapi";
import CategoryHero from "@/components/CategoryHero";
import CategoryFilterNav from "@/components/CategoryFilterNav";
import ChannelListing from "@/components/ChannelListing";

export const metadata: Metadata = {
  title: "Canales de atención",
  description:
    "Áreas de autoservicio, consultas y operaciones 24/7: Avanz Móvil, e-Banking, sucursales, ATM y más.",
};

// Página de Canales de Atención (diseño Figma 1506:31438): hero con panel azul
// petróleo, barra de píldoras y listado de canales (imagen + descripción +
// botón + características) alimentado desde el content type `channel` de Strapi.
export default async function CanalesDeAtencionPage() {
  const channels = await getChannels();

  return (
    <>
      <CategoryHero
        title="Canales de atención"
        subtitle="¡Hacemos tu vida más fácil! Áreas de Autoservicio, consultas y operaciones 24/7"
        backgroundImage="/images/canales-hero.jpg"
        variant="secondary"
      />
      <CategoryFilterNav
        items={channels.map((ch) => ({
          id: ch.documentId,
          label: ch.name,
          href: `#${ch.slug}`,
        }))}
      />
      <ChannelListing channels={channels} />
    </>
  );
}
