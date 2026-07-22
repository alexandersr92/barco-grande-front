import Image from "next/image";
import type { IconFeature, StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export interface ValuesGridProps {
  kicker?: string;
  heading?: string;
  items?: IconFeature[];
  centerImage?: StrapiMedia | null;
}

function ValuesColumn({ items }: { items: IconFeature[] }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-1 flex-col gap-12">
      {items.map((item) => {
        const iconUrl = getStrapiMedia(item.icon);
        return (
          <div key={item.id} className="flex max-w-[300px] flex-col gap-3">
            {iconUrl && (
              <Image
                src={iconUrl}
                alt=""
                width={55}
                height={55}
                className="h-[55px] w-[55px] object-contain"
              />
            )}
            <h3 className="text-[24px] leading-[1.3] tracking-[-1px] text-secondary md:text-[28px] md:leading-[36.4px]">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-[17px] leading-7 text-muted">{item.description}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Valores con ícono repartidos alrededor de una imagen central (el ala Avanz),
// según diseño 1506:25105. En móvil caen en una sola columna y la imagen
// central se oculta.
export default function ValuesGrid({
  kicker,
  heading,
  items,
  centerImage,
}: ValuesGridProps) {
  const centerUrl = getStrapiMedia(centerImage);
  if (!items?.length) return null;

  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <section className="mx-auto max-w-[1220px] px-5 py-[80px]">
      {kicker && (
        <p className="pb-2 text-center text-sm uppercase tracking-[2px] text-muted-light">
          {kicker}
        </p>
      )}
      {heading && (
        <h2 className="pb-14 text-center text-[32px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
          {heading}
        </h2>
      )}

      <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-6">
        <ValuesColumn items={columns[0]} />

        {/* Imagen central (ala Avanz), entre ambas columnas en desktop */}
        {centerUrl && (
          <div className="hidden shrink-0 lg:block">
            <Image
              src={centerUrl}
              alt=""
              width={260}
              height={260}
              className="h-auto w-[220px] object-contain"
            />
          </div>
        )}

        <ValuesColumn items={columns[1]} />
      </div>
    </section>
  );
}
