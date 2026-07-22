import Image from "next/image";
import Link from "next/link";
import type { StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

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
    <section className="bg-white py-[90px]">
      <div className="mx-auto max-w-[1220px] px-5">
        {heading && (
          <h2 className="mb-10 text-center text-[34px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
            {heading}
          </h2>
        )}
        <div className="grid gap-y-14 md:grid-cols-3 md:divide-x md:divide-line">
          {cards.map((card) => {
            const iconUrl = getStrapiMedia(card.image);
            return (
              <div key={card.id} className="flex flex-col items-center px-8 text-center">
                {iconUrl && (
                  <div className="flex h-[55px] items-center pb-[9px]">
                    <Image
                      src={iconUrl}
                      alt=""
                      width={88}
                      height={55}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                )}
                {card.kicker && (
                  <p className="pt-4 text-sm uppercase tracking-[1px] text-primary">
                    {card.kicker}
                  </p>
                )}
                <h3 className="pt-[15px] text-[28px] leading-[36.4px] tracking-[-1px] text-secondary">
                  {card.title}
                </h3>
                {card.description && (
                  <p className="flex-1 pt-[15px] text-[17px] leading-7 text-muted">
                    {card.description}
                  </p>
                )}
                {card.linkUrl && (
                  <Link
                    href={card.linkUrl}
                    className="mt-[26px] inline-flex items-center gap-2.5 px-[30px] py-[15px] text-base leading-[22.4px] text-secondary hover:text-primary"
                  >
                    {card.linkLabel ?? "Conocé más"}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 21 21"
                      fill="none"
                      aria-hidden
                      className="text-primary"
                    >
                      <circle cx="10.5" cy="10.5" r="9.5" stroke="currentColor" strokeWidth="1.4" />
                      <path
                        d="M8.5 6.8 12.2 10.5 8.5 14.2"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
