import Image from "next/image";
import type { DocumentLink, StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export interface DocumentGroupProps {
  heading?: string;
  /** Ancla para enlazar desde la barra de píldoras. */
  anchorId?: string;
  intro?: string;
  image?: StrapiMedia | null;
  items?: DocumentLink[];
}

function DownloadIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0 text-primary"
    >
      <path
        d="M13 3.5v12m0 0 4.5-4.5M13 15.5 8.5 11M4.5 19.5h17v3h-17v-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Grupo de documentos descargables: encabezado + intro (+ imagen opcional) a la
// izquierda y la lista de documentos a la derecha. Cada documento puede llevar
// una descripción (diseño 1506:25426, Información Financiera).
export default function DocumentGroup({
  heading,
  anchorId,
  intro,
  image,
  items,
}: DocumentGroupProps) {
  if (!items?.length && !heading) return null;
  const imageUrl = getStrapiMedia(image);

  return (
    <section
      id={anchorId}
      className="mx-auto max-w-[1220px] scroll-mt-32 px-5 py-[50px]"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        {/* Encabezado + intro (columna de 360px en el diseño) */}
        <div className="shrink-0 lg:w-[340px]">
          {heading && (
            <h2 className="text-[32px] leading-[1.28] tracking-[-1px] text-secondary md:text-[42px]">
              {heading}
            </h2>
          )}
          {intro && <p className="mt-5 text-[17px] leading-7 text-muted">{intro}</p>}
          {imageUrl && (
            <Image
              src={imageUrl}
              alt=""
              width={340}
              height={150}
              className="mt-6 h-auto w-full max-w-[340px] object-contain"
            />
          )}
        </div>

        {/* Documentos */}
        <div className="flex-1">
          {items?.map((doc) => {
            const href = getStrapiMedia(doc.file) ?? doc.url ?? "#";
            return (
              <a
                key={doc.id}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-6 border-b border-line py-5"
              >
                <span className="flex-1">
                  <span className="block text-[18px] leading-[24.3px] text-secondary group-hover:text-primary">
                    {doc.label}
                  </span>
                  {doc.description && (
                    <span className="mt-3 block text-[15px] leading-6 text-muted">
                      {doc.description}
                    </span>
                  )}
                </span>
                <DownloadIcon />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
