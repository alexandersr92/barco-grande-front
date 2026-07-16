import Image from "next/image";
import Link from "next/link";
import type { Channel } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

function CheckMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="mt-1 shrink-0 text-primary"
    >
      <path
        d="M2.5 9.5 7 14 15.5 4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M3.5 9h9M9 4.5 13.5 9 9 13.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z" />
    </svg>
  );
}

// Listado de canales de atención (diseño 1506:31438): filas de 3 columnas
// —imagen de color, título + descripción + botón, y lista "Caracteristicas"—
// separadas por una línea horizontal. El id de cada fila (slug) sirve de ancla
// para las píldoras del filtro superior.
export default function ChannelListing({ channels }: { channels: Channel[] }) {
  if (!channels || channels.length === 0) return null;

  return (
    <div className="mx-auto max-w-[1220px] px-5">
      {channels.map((ch) => {
        const imageUrl = getStrapiMedia(ch.image);
        const isPhone = ch.buttonIcon === "phone";
        return (
          <div
            key={ch.id}
            id={ch.slug}
            className="grid scroll-mt-32 grid-cols-1 items-center gap-8 border-b border-line py-14 last:border-b-0 lg:grid-cols-3 lg:gap-5"
          >
            {/* Imagen de color */}
            <div className="relative aspect-[386/450] w-full overflow-hidden">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={ch.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 386px"
                  className="object-cover"
                />
              )}
            </div>

            {/* Título + descripción + botón */}
            <div className="flex flex-col">
              <h2 className="text-[32px] leading-[1.1] tracking-[-1px] text-secondary lg:text-[40px]">
                {ch.name}
              </h2>
              {ch.description && (
                <p className="mt-6 max-w-[420px] text-[17px] leading-7 text-muted">
                  {ch.description}
                </p>
              )}
              {ch.buttonLabel && (
                <Link
                  href={ch.buttonUrl || "#"}
                  className="mt-8 inline-flex w-fit items-center gap-2.5 bg-primary px-[30px] py-[15px] text-base leading-[22.4px] text-white transition-colors hover:bg-primary-dark"
                >
                  {isPhone && <PhoneIcon />}
                  {ch.buttonLabel}
                  {!isPhone && <ArrowRight />}
                </Link>
              )}
            </div>

            {/* Características */}
            <div className="flex flex-col">
              <h3 className="text-[20px] leading-[1.3] tracking-[-0.5px] text-secondary lg:text-[22px]">
                Caracteristicas
              </h3>
              {ch.features && ch.features.length > 0 && (
                <ul className="mt-6 space-y-5">
                  {ch.features.map((f) => (
                    <li key={f.id} className="flex items-start gap-3">
                      <CheckMark />
                      <span className="text-[17px] leading-7 text-muted">
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
