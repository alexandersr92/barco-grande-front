import Image from "next/image";
import Link from "next/link";

export interface CategoryHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Color del panel translúcido: naranja (default) o azul petróleo (canales). */
  variant?: "primary" | "secondary";
}

// Hero de páginas de categoría (Cuentas, Tarjetas, etc.): foto de fondo con
// panel translúcido a la izquierda y ala/logo Avanz como marca de agua a la
// derecha, según diseño Figma (nodo 1507:30283). El panel es naranja por
// defecto; la variante "secondary" (canales de atención) usa azul petróleo.
export default function CategoryHero({
  title,
  subtitle,
  backgroundImage,
  ctaLabel,
  ctaHref,
  variant = "primary",
}: CategoryHeroProps) {
  const panelBg =
    variant === "secondary"
      ? "bg-[rgba(0,95,134,0.92)]"
      : "bg-[rgba(255,117,0,0.92)]";
  return (
    <section className="relative h-[380px] overflow-hidden lg:h-[420px]">
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

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
            {ctaLabel && ctaHref && (
              <Link
                href={ctaHref}
                className="mt-8 inline-block bg-white px-[30px] py-[15px] text-base leading-[22.4px] text-secondary transition-colors hover:bg-secondary hover:text-white"
              >
                {ctaLabel}
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
