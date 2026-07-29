import Image from "next/image";
import type { DocumentLink, StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";
import { DownloadIcon } from "@/components/icons";

export interface DocumentGroupProps {
  heading?: string;
  /** Ancla para enlazar desde la barra de píldoras. */
  anchorId?: string;
  intro?: string;
  image?: StrapiMedia | null;
  items?: DocumentLink[];
  /**
   * centered: encabezado centrado + lista a lo ancho ("Descargar
   * Documentación" de las páginas de categoría). Default: dos columnas
   * (encabezado/intro a la izquierda, documentos a la derecha).
   */
  centered?: boolean;
}

// Lista única de documentos descargables del sitio. Un ítem sin archivo y sin
// URL no se muestra (el cliente sube el PDF en Strapi y aparece solo).
export default function DocumentGroup({
  heading,
  anchorId,
  intro,
  image,
  items,
  centered = false,
}: DocumentGroupProps) {
  const visible = (items ?? []).filter(
    (doc) => getStrapiMedia(doc.file) || doc.url,
  );
  if (!visible.length && !heading) return null;
  if (!visible.length && centered) return null;
  const imageUrl = getStrapiMedia(image);

  const list = visible.map((doc) => {
    const href = getStrapiMedia(doc.file) ?? doc.url ?? "#";
    return (
      <a
        key={doc.id}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className={
          centered
            ? "group flex items-center justify-between gap-4 border-b border-line py-6"
            : "group flex items-start justify-between gap-6 border-b border-line py-5"
        }
      >
        <span className="flex-1">
          <span
            className={`block leading-[24.3px] text-secondary group-hover:text-primary ${
              centered ? "text-lg" : "text-[18px]"
            }`}
          >
            {doc.label}
          </span>
          {doc.description && (
            <span className="mt-3 block text-[15px] leading-6 text-muted">
              {doc.description}
            </span>
          )}
        </span>
        <DownloadIcon className={centered ? "shrink-0 text-primary" : "mt-0.5 shrink-0 text-primary"} />
      </a>
    );
  });

  if (centered) {
    return (
      <section id={anchorId} className="mx-auto max-w-[1180px] scroll-mt-32 px-8 py-[90px]">
        <h2 className="pb-8 text-center text-[34px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
          {heading ?? "Descargar Documentación"}
        </h2>
        <div>{list}</div>
      </section>
    );
  }

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
        <div className="flex-1">{list}</div>
      </div>
    </section>
  );
}
