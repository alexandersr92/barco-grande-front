import Image from "next/image";
import Link from "next/link";

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.4 12.9c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2.1-1.5 2.7-.4 6.6 1.1 8.8.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.8.7 1.1 0 1.9-1.1 2.6-2.1.8-1.2 1.1-2.3 1.2-2.4-.1 0-2.3-.9-2.3-3.5zM14.3 6.3c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 3.5v17c0 .5.5.8 1 .6l14.5-8.1c.5-.3.5-1 0-1.3L5 3.6c-.5-.3-1 0-1 .5z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <path d="M8 20h8M12 16v4" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = { apple: AppleIcon, play: PlayIcon, ebanking: MonitorIcon } as const;

export interface BannerButton {
  label: string;
  href: string;
  icon?: keyof typeof ICONS;
  external?: boolean;
}

export interface DigitalBannerProps {
  title: string;
  subtitle?: string;
  buttons?: BannerButton[];
  image: { src: string; alt: string; width: number; height: number };
  /** Clases extra para afinar tamaño/posición de la imagen por banner. */
  imageClassName?: string;
}

// Banner naranja de página digital (diseño 1499:28414 / 1499:28680): panel
// naranja con título + subtítulo + botones azules a la izquierda, ala Avanz de
// marca de agua y dispositivo (teléfono/laptop) que sobresale por abajo a la
// derecha. Reutilizado por el hero "Tu banco fácil y digital" y por "e-Banking".
export default function DigitalBanner({
  title,
  subtitle,
  buttons = [],
  image,
  imageClassName = "",
}: DigitalBannerProps) {
  return (
    <section className="relative bg-primary text-white">
      <div className="mx-auto flex max-w-[1220px] flex-col items-center gap-8 px-5 py-12 lg:flex-row lg:items-stretch lg:gap-6 lg:py-0">
        {/* Texto */}
        <div className="flex flex-col justify-center lg:min-h-[336px] lg:w-[52%] lg:py-10">
          <h2 className="max-w-[560px] text-[34px] font-medium leading-[1.1] tracking-[-1px] sm:text-[40px] lg:text-[48px]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-5 max-w-[560px] text-[16px] leading-7 text-white/90">
              {subtitle}
            </p>
          )}
          {buttons.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-5">
              {buttons.map((b) => {
                const Icon = b.icon ? ICONS[b.icon] : null;
                return (
                  <Link
                    key={b.label}
                    href={b.href}
                    target={b.external ? "_blank" : undefined}
                    rel={b.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2.5 bg-secondary px-[30px] py-[15px] text-base leading-[22.4px] text-white transition-colors hover:bg-secondary-dark"
                  >
                    {Icon && <Icon />}
                    {b.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Ala + dispositivo */}
        <div className="relative flex w-full justify-center lg:w-[48%]">
          {/* Ala Avanz como marca de agua, detrás del dispositivo */}
          <Image
            src="/images/avanz-logo-white-outline.svg"
            alt=""
            width={300}
            height={300}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[260px] w-[260px] -translate-x-[62%] -translate-y-1/2 object-contain opacity-90 lg:block"
          />
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            className={`relative z-10 h-auto w-[260px] self-end sm:w-[280px] lg:w-[300px] lg:-mb-12 ${imageClassName}`}
          />
        </div>
      </div>
    </section>
  );
}
