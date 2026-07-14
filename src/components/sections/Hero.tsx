import Image from "next/image";
import type { ButtonItem, StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";
import { CtaButton } from "@/components/ui";

export interface HeroProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  image?: StrapiMedia | null;
  buttons?: ButtonItem[];
}

export default function Hero({ kicker, title, subtitle, image, buttons }: HeroProps) {
  const imageUrl = getStrapiMedia(image);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-secondary-dark to-secondary text-white">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          className="object-cover opacity-30"
        />
      )}
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-5 px-4 py-24 md:py-32">
        {kicker && (
          <span className="text-sm font-bold uppercase tracking-[3px] text-orange-300">
            {kicker}
          </span>
        )}
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl text-lg font-semibold text-white/85 md:text-xl">
            {subtitle}
          </p>
        )}
        {buttons && buttons.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {buttons.map((b) => (
              <CtaButton key={b.id} button={b} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
