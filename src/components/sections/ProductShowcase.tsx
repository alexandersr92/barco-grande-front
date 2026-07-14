import Image from "next/image";
import type { ButtonItem, FeatureItem, StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";
import { CheckIcon, CtaButton } from "@/components/ui";

export interface ProductShowcaseProps {
  heading: string;
  description?: string;
  features?: FeatureItem[];
  photo?: StrapiMedia | null;
  cardImage?: StrapiMedia | null;
  buttons?: ButtonItem[];
  imageLeft?: boolean;
}

export default function ProductShowcase({
  heading,
  description,
  features,
  photo,
  cardImage,
  buttons,
  imageLeft = true,
}: ProductShowcaseProps) {
  const photoUrl = getStrapiMedia(photo);
  const cardUrl = getStrapiMedia(cardImage);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div
        className={`flex flex-col items-center gap-10 lg:flex-row lg:gap-24 ${
          imageLeft ? "" : "lg:flex-row-reverse"
        }`}
      >
        {/* Imagen con tarjeta superpuesta */}
        <div className="relative w-full max-w-md shrink-0 lg:w-[460px]">
          {photoUrl ? (
            <div className="relative h-[520px] overflow-hidden md:h-[640px]">
              <Image
                src={photoUrl}
                alt={heading}
                fill
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-[420px] rounded-lg bg-surface" />
          )}
          {cardUrl && (
            <div className="absolute inset-y-0 -right-6 flex items-center md:-right-16">
              <Image
                src={cardUrl}
                alt=""
                width={354}
                height={406}
                className="w-56 rotate-[10deg] drop-shadow-2xl md:w-80"
              />
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="flex flex-col gap-5">
          <h2 className="text-4xl font-bold tracking-[-1px] text-secondary md:text-[44px] md:leading-[1.2]">
            {heading}
          </h2>
          {description && (
            <p className="max-w-xl text-[17px] font-bold leading-7 text-muted">
              {description}
            </p>
          )}
          {features && features.length > 0 && (
            <ul className="mt-2 space-y-3">
              {features.map((f) => (
                <li key={f.id} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="max-w-lg text-[17px] font-bold leading-7 text-muted">
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {buttons && buttons.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-5">
              {buttons.map((b) => (
                <CtaButton key={b.id} button={b} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
