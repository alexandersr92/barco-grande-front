import Image from "next/image";
import type { FeatureItem, StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export interface ChecklistMediaProps {
  kicker?: string;
  heading?: string;
  items?: FeatureItem[];
  image?: StrapiMedia | null;
}

function BenefitCheck() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0"
    >
      <circle cx="10" cy="10" r="9" stroke="#ff7500" strokeWidth="1.5" />
      <path
        d="m6 10 2.8 2.8L14 7.5"
        stroke="#ff7500"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Lista de checks + imagen a la derecha (sección "Con un solo clic podés
// realizar" de Zona Digital, diseño 1499:28328).
export default function ChecklistMedia({
  kicker,
  heading,
  items,
  image,
}: ChecklistMediaProps) {
  if (!items?.length) return null;
  const imageUrl = getStrapiMedia(image);

  return (
    <section className="mx-auto flex max-w-[1220px] flex-col items-center gap-10 px-5 pb-[70px] lg:flex-row lg:items-center lg:gap-8">
      <div className="flex-1">
        {kicker && (
          <p className="pb-4 text-sm font-semibold uppercase tracking-[2px] text-primary">
            {kicker}
          </p>
        )}
        {heading && (
          <h2 className="max-w-[556px] pb-8 text-[32px] leading-[1.15] tracking-[-1px] text-secondary md:text-[44px]">
            {heading}
          </h2>
        )}
        <ul className="space-y-[9px]">
          {items.map((b) => (
            <li key={b.id} className="flex items-start gap-[15px]">
              <BenefitCheck />
              <span className="max-w-[520px] text-[16px] leading-7 text-muted">
                {b.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {imageUrl && (
        <div className="w-full max-w-[521px] shrink-0">
          <Image
            src={imageUrl}
            alt={heading ?? ""}
            width={521}
            height={521}
            className="h-auto w-full"
          />
        </div>
      )}
    </section>
  );
}
