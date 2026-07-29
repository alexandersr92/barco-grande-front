import { getChannels } from "@/lib/strapi";
import PillNav from "@/components/sections/PillNav";
import ChannelListing from "@/components/ChannelListing";

export interface ChannelListingSectionProps {
  showPillNav?: boolean;
}

// Sección de listado de canales de atención: barra de píldoras (anclas) +
// canales desde Strapi. Los canales son los mismos para todas las audiencias.
export default async function ChannelListingSection({
  showPillNav = true,
}: ChannelListingSectionProps) {
  const channels = await getChannels();
  if (channels.length === 0) return null;

  return (
    <>
      {showPillNav && (
        <PillNav
          items={channels.map((ch) => ({
            id: ch.id,
            label: ch.name,
            url: `#${ch.slug}`,
          }))}
        />
      )}
      <ChannelListing channels={channels} />
    </>
  );
}
