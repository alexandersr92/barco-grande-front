import { getChannels } from "@/lib/strapi";
import CategoryHero from "@/components/CategoryHero";
import CategoryFilterNav from "@/components/CategoryFilterNav";
import ChannelListing from "@/components/ChannelListing";

// Canales de atención (diseño 1506:31438). Los canales son los mismos para
// todas las audiencias; se muestran bajo /[audience]/canales-de-atencion.
export default async function ChannelsPage() {
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
