import Image from "next/image";
import Link from "next/link";
import type { StrapiMedia } from "@/lib/strapi";
import { getGlobal, getStrapiMedia } from "@/lib/strapi";

export interface AppBannerProps {
  title: string;
  description?: string;
  image?: StrapiMedia | null;
  /** URLs de tiendas; si se omiten se usan las de Global. */
  appStoreUrl?: string;
  playStoreUrl?: string;
  /** Botón genérico (ej. "Ingresar al e-Banking"). Si hay label, se muestran
   * este botón en lugar de los de tiendas. */
  buttonLabel?: string;
  buttonUrl?: string;
}

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

const buttonCls =
  "inline-flex items-center gap-2.5 bg-secondary px-[30px] py-[15px] text-base leading-[22.4px] text-white transition-colors hover:bg-secondary-dark";

// Banner naranja de página digital (diseño 1499:28414 / 1499:28680): panel
// naranja con título + subtítulo + botones azules a la izquierda, ala Avanz de
// marca de agua y dispositivo (teléfono/laptop) que sobresale por abajo a la
// derecha. Con botón genérico (e-Banking) o botones de tiendas (app).
export default async function AppBanner({
  title,
  description,
  image,
  appStoreUrl,
  playStoreUrl,
  buttonLabel,
  buttonUrl,
}: AppBannerProps) {
  const imageUrl = getStrapiMedia(image);
  // Fallback a las URLs globales para no duplicar las URLs de tiendas.
  const global = !buttonLabel && (!appStoreUrl || !playStoreUrl) ? await getGlobal() : null;
  const apple = appStoreUrl || global?.appStoreUrl;
  const play = playStoreUrl || global?.playStoreUrl;

  return (
    <section className="relative bg-primary text-white">
      <div className="mx-auto flex max-w-[1220px] flex-col items-center gap-8 px-5 py-12 lg:flex-row lg:items-stretch lg:gap-6 lg:py-0">
        {/* Texto */}
        <div className="flex flex-col justify-center lg:min-h-[336px] lg:w-[52%] lg:py-10">
          <h2 className="max-w-[560px] text-[34px] font-medium leading-[1.1] tracking-[-1px] sm:text-[40px] lg:text-[48px]">
            {title}
          </h2>
          {description && (
            <p className="mt-5 max-w-[560px] text-[16px] leading-7 text-white/90">
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-5">
            {buttonLabel && buttonUrl ? (
              <Link
                href={buttonUrl}
                target={buttonUrl.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={buttonCls}
              >
                <MonitorIcon />
                {buttonLabel}
              </Link>
            ) : (
              <>
                {apple && (
                  <Link href={apple} target="_blank" rel="noopener noreferrer" className={buttonCls}>
                    <AppleIcon />
                    App Store
                  </Link>
                )}
                {play && (
                  <Link href={play} target="_blank" rel="noopener noreferrer" className={buttonCls}>
                    <PlayIcon />
                    Play Store
                  </Link>
                )}
              </>
            )}
          </div>
        </div>

        {/* Ala + dispositivo */}
        <div className="relative flex w-full justify-center lg:w-[48%]">
          <Image
            src="/images/avanz-logo-white-outline.svg"
            alt=""
            width={300}
            height={300}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[260px] w-[260px] -translate-x-[62%] -translate-y-1/2 object-contain opacity-90 lg:block"
          />
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              width={typeof image === "object" ? image?.width ?? 513 : 513}
              height={typeof image === "object" ? image?.height ?? 730 : 730}
              priority
              className="relative z-10 h-auto w-[260px] self-end sm:w-[280px] lg:w-[300px] lg:-mb-12"
            />
          )}
        </div>
      </div>
    </section>
  );
}
