import Image from "next/image";
import Link from "next/link";
import type { StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";
import { ArrowIcon } from "@/components/ui";

export interface InfoCard {
  id: number;
  kicker?: string;
  title: string;
  description?: string;
  linkLabel?: string;
  linkUrl?: string;
  image?: StrapiMedia | null;
}

export default function InfoCards({
  heading,
  cards,
}: {
  heading?: string;
  cards: InfoCard[];
}) {
  if (!cards || cards.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      {heading && (
        <h2 className="mb-10 text-center text-4xl font-bold tracking-[-1px] text-secondary">
          {heading}
        </h2>
      )}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const imageUrl = getStrapiMedia(card.image);
          return (
            <div
              key={card.id}
              className="flex flex-col gap-3 rounded-lg border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={card.title}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-contain"
                />
              )}
              {card.kicker && (
                <span className="text-xs font-bold uppercase tracking-[2px] text-primary">
                  {card.kicker}
                </span>
              )}
              <h3 className="text-2xl font-bold text-secondary">{card.title}</h3>
              {card.description && (
                <p className="flex-1 text-[15px] leading-6 text-muted">
                  {card.description}
                </p>
              )}
              {card.linkUrl && (
                <Link
                  href={card.linkUrl}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-secondary hover:text-primary"
                >
                  {card.linkLabel ?? "Conocé más"}
                  <ArrowIcon />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
