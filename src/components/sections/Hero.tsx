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

// Hero del diseño: foto a sangre completa con panel naranja translúcido a la izquierda.
export default function Hero({ kicker, title, subtitle, image, buttons }: HeroProps) {
  const imageUrl = getStrapiMedia(image);

  return (
    <section className="relative min-h-[520px] overflow-hidden bg-surface lg:h-[768px]">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div className="relative flex h-full min-h-[520px] items-stretch">
        <div className="relative flex w-full items-center justify-center bg-[rgba(255,117,0,0.85)] px-8 py-20 md:w-[41%] md:px-12 lg:py-0">
          {/* Ala decorativa */}
          <div className="pointer-events-none absolute -right-[88px] top-0 hidden lg:block">
            <Image
              src="/icons/hero-wing.svg"
              alt=""
              width={174}
              height={174}
              className="h-[174px] w-[174px]"
            />
          </div>
          <div className="w-full max-w-[350px]">
            {kicker && (
              <p className="pb-[30px] text-sm uppercase leading-[22.4px] tracking-[1px] text-white/80">
                {kicker}
              </p>
            )}
            <h1 className="pb-[30px] text-[42px] font-medium leading-[1.15] tracking-[-1px] text-white lg:text-[56px]">
              {title}
            </h1>
            {subtitle && (
              <p className="whitespace-pre-line text-[22px] leading-[28.6px] text-white/80">
                {subtitle}
              </p>
            )}
            {buttons && buttons.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {buttons.map((b) => (
                  <CtaButton key={b.id} button={b} />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="hidden flex-1 md:block" />
      </div>
    </section>
  );
}
