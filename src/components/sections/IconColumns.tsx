import Image from "next/image";
import type { IconFeature } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export interface IconColumnsProps {
  kicker?: string;
  heading?: string;
  anchorId?: string;
  items?: IconFeature[];
  /** Líneas verticales entre columnas. */
  dividers?: boolean;
}

// Columnas centradas con ícono + título + descripción. El número de columnas
// sale de la cantidad de items (4 en "Nuestros Pilares", 3 en zona digital).
export default function IconColumns({
  kicker,
  heading,
  anchorId,
  items,
  dividers = false,
}: IconColumnsProps) {
  if (!items?.length) return null;

  const cols =
    items.length >= 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : items.length === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-2";

  return (
    <section
      id={anchorId}
      className="mx-auto max-w-[1220px] scroll-mt-32 px-5 py-[70px]"
    >
      {kicker && (
        <p className="pb-2 text-center text-sm uppercase tracking-[2px] text-muted-light">
          {kicker}
        </p>
      )}
      {heading && (
        <h2 className="pb-12 text-center text-[32px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
          {heading}
        </h2>
      )}
      <div
        className={`grid gap-y-12 ${cols} ${
          dividers ? "lg:divide-x lg:divide-line" : ""
        }`}
      >
        {items.map((item) => {
          const iconUrl = getStrapiMedia(item.icon);
          return (
            <div
              key={item.id}
              className="flex flex-col items-center gap-4 px-8 text-center"
            >
              {iconUrl && (
                <Image
                  src={iconUrl}
                  alt=""
                  width={50}
                  height={50}
                  className="h-[50px] w-[50px] object-contain"
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
    </section>
  );
}
