import Image from "next/image";
import Link from "next/link";
import type { ButtonItem, StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";
import { CtaButton } from "@/components/ui";

export interface HeroProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  /** Media de Strapi o ruta local (/images/...). */
  image?: StrapiMedia | string | null;
  buttons?: ButtonItem[];
  /** Color del panel translúcido: naranja (default) o azul petróleo. */
  variant?: "primary" | "secondary";
  /** Compat con sections.hero de Strapi: equivale a layout="compact". */
  compact?: boolean;
  /**
   * Presentación:
   * - home: hero alto del inicio (default).
   * - compact: banner de 680px con panel anclado abajo (Sobre nosotros).
   * - banner: banner de categoría de 380/420px con CTA blanca (ex CategoryHero).
   * - plain: franja teal con solo título/subtítulo, sin foto (ex PageHero).
   */
  layout?: "home" | "compact" | "banner" | "plain";
}

// Hero único del sitio: foto a sangre completa con panel translúcido a la
// izquierda, en sus cuatro presentaciones (home, compact, banner y plain).
export default function Hero({
  kicker,
  title,
  subtitle,
  image,
  buttons,
  variant = "primary",
  compact = false,
  layout,
}: HeroProps) {
  const mode = layout ?? (compact ? "compact" : "home");
  const imageUrl = typeof image === "string" ? image : getStrapiMedia(image);

  // Franja teal simple (noticias, promociones, fallback de páginas sin hero).
  if (mode === "plain") {
    return (
      <section className="bg-gradient-to-r from-secondary-dark to-secondary text-white">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-lg font-semibold text-white/85">
              {subtitle}
            </p>
          )}
        </div>
      </section>
    );
  }

  // Banner de categoría (Cuentas, Tarjetas, Canales…): 380/420px, panel del
  // 48% con CTA blanca y logo Avanz de marca de agua (diseño 1507:30283).
  if (mode === "banner") {
    const panelBg =
      variant === "secondary"
        ? "bg-[rgba(0,95,134,0.92)]"
        : "bg-[rgba(255,117,0,0.92)]";
    const cta = buttons?.[0];
    return (
      <section className="relative h-[380px] overflow-hidden lg:h-[420px]">
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
        <div className="relative flex h-full">
          <div
            className={`relative flex h-full w-full items-center ${panelBg} px-6 sm:px-10 md:w-[48%] lg:w-[48%] lg:px-[7%]`}
          >
            <div className="max-w-[480px]">
              <h1 className="text-[36px] leading-[1.15] tracking-[-1px] text-white sm:text-[44px] lg:text-[56px] lg:leading-[64px]">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-4 text-[17px] leading-7 text-white">{subtitle}</p>
              )}
              {cta && (
                <Link
                  href={cta.url}
                  className="mt-8 inline-block bg-white px-[30px] py-[15px] text-base leading-[22.4px] text-secondary transition-colors hover:bg-secondary hover:text-white"
                >
                  {cta.label}
                </Link>
              )}
            </div>

            {/* Ala/logo Avanz como marca de agua, pegada al borde derecho del panel */}
            <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[150px] w-[150px] -translate-y-1/2 translate-x-1/3 opacity-90 md:block">
              <Image
                src="/images/avanz-logo-white-outline.svg"
                alt=""
                fill
                sizes="150px"
                className="object-contain"
              />
            </div>
          </div>
          <div className="hidden flex-1 md:block" />
        </div>
      </section>
    );
  }

  const panelBg =
    variant === "secondary"
      ? "bg-[rgba(0,95,134,0.92)]"
      : "bg-[rgba(255,117,0,0.85)]";

  // Variante compacta (Sobre Nosotros): la foto ocupa todo el banner y el
  // panel de color es una caja de 380px anclada abajo a la izquierda, con el
  // logo Avanz cruzando su borde derecho (diseño 1506:25108 y hermanos).
  if (mode === "compact") {
    return (
      <section className="relative min-h-[420px] overflow-hidden bg-surface lg:h-[680px]">
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
        <div
          className={`relative flex w-full items-center justify-center ${panelBg} px-8 py-20 md:w-[41%] md:px-12 lg:py-0`}
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
