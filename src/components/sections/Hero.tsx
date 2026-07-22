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
  /** Color del panel translúcido: naranja (default) o azul petróleo. */
  variant?: "primary" | "secondary";
  /** Banner más bajo (680px del diseño) en vez del hero alto del home. */
  compact?: boolean;
}

// Hero del diseño: foto a sangre completa con panel translúcido a la izquierda.
export default function Hero({
  kicker,
  title,
  subtitle,
  image,
  buttons,
  variant = "primary",
  compact = false,
}: HeroProps) {
  const imageUrl = getStrapiMedia(image);
  const panelBg =
    variant === "secondary"
      ? "bg-[rgba(0,95,134,0.92)]"
      : "bg-[rgba(255,117,0,0.85)]";
  const heightCls = compact
    ? "min-h-[420px] lg:h-[680px]"
    : "min-h-[520px] lg:h-[768px]";
  const innerMinH = compact ? "min-h-[420px]" : "min-h-[520px]";

  // Variante compacta (Sobre Nosotros): la foto ocupa todo el banner y el
  // panel de color es una caja de 380px anclada abajo a la izquierda, con el
  // logo Avanz cruzando su borde derecho (diseño 1506:25108 y hermanos).
  if (compact) {
    return (
      <section className={`relative overflow-hidden bg-surface ${heightCls}`}>
        {imageUrl && (
          <Image src={imageUrl} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="relative flex h-full min-h-[420px] items-end">
          <div
            className={`relative flex w-full items-center ${panelBg} px-8 py-12 md:w-[48%] md:px-[110px] lg:h-[380px] lg:py-0`}
          >
            <div className="max-w-[630px]">
              {kicker && (
                <p className="pb-4 text-sm uppercase leading-[22.4px] tracking-[1px] text-white/80">
                  {kicker}
                </p>
              )}
              <h1 className="pb-4 text-[34px] leading-[1.15] tracking-[-1px] text-white lg:text-[44px] lg:leading-[52.8px]">
                {title}
              </h1>
              {subtitle && (
                <p className="text-[17px] leading-7 text-white">{subtitle}</p>
              )}
              {buttons && buttons.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-4">
                  {buttons.map((b) => (
                    <CtaButton key={b.id} button={b} />
                  ))}
                </div>
              )}
            </div>
            {/* Logo Avanz cruzando el borde derecho del panel */}
            <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[150px] w-[150px] -translate-y-1/2 translate-x-1/2 md:block">
              <Image
                src="/images/avanz-logo-white-outline.svg"
                alt=""
                fill
                sizes="150px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative overflow-hidden bg-surface ${heightCls}`}>
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
      {/* En la variante compacta el panel no ocupa todo el alto: mide 380px y
          se ancla abajo, como en los diseños de Sobre nosotros. */}
      <div
        className={`relative flex h-full ${innerMinH} ${
          compact ? "items-end" : "items-stretch"
        }`}
      >
        <div
          className={`relative flex w-full items-center justify-center ${panelBg} px-8 py-20 md:w-[41%] md:px-12 lg:py-0 ${
            compact ? "lg:h-[380px]" : ""
          }`}
        >
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
