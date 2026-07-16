import Image from "next/image";
import Link from "next/link";
import type { InfoCard } from "@/components/sections/InfoCards";
import { getStrapiMedia } from "@/lib/strapi";

export interface CardGridProps {
  heading?: string;
  cards?: InfoCard[];
}

// Tarjetas con imagen arriba, kicker, título, descripción y botón naranja
// (las 3 del pie de "Sobre Avanz", diseño 1506:25105).
export default function CardGrid({ heading, cards }: CardGridProps) {
  if (!cards?.length) return null;

  return (
    <section className="mx-auto max-w-[1220px] px-5 py-[70px]">
      {heading && (
        <h2 className="pb-10 text-center text-[32px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
          {heading}
        </h2>
      )}
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => {
          const imageUrl = getStrapiMedia(card.image);
          return (
            <article key={card.id} className="flex flex-col bg-surface">
              {imageUrl && (
                <div className="relative aspect-[380/200] w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-7">
                {card.kicker && (
                  <p className="pb-2 text-xs uppercase tracking-[1.5px] text-muted-light">
                    {card.kicker}
                  </p>
                )}
                <h3 className="pb-3 text-[22px] leading-[1.3] tracking-[-0.5px] text-secondary">
                  {card.title}
                </h3>
                {card.description && (
                  <p className="flex-1 pb-6 text-[15px] leading-6 text-muted">
                    {card.description}
                  </p>
                )}
                {card.linkUrl && (
                  <Link
                    href={card.linkUrl}
                    className="inline-block w-fit bg-primary px-6 py-3 text-sm leading-5 text-white transition-colors hover:bg-primary-dark"
                  >
                    {card.linkLabel ?? "Conocé más"}
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
