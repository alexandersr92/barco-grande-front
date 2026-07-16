export interface DocumentDownloadItem {
  id: number | string;
  label: string;
  href?: string;
}

// Sección "Descargar Documentación": encabezado centrado + lista de archivos
// con ícono de descarga (diseño 1506:51567).
export default function DocumentDownloadList({
  heading = "Descargar Documentación",
  items,
}: {
  heading?: string;
  items: DocumentDownloadItem[];
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1180px] px-8 py-[90px]">
      <h2 className="pb-8 text-center text-[34px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
        {heading}
      </h2>
      <div>
        {items.map((doc) => {
          const href = doc.href ?? "#";
          return (
            <a
              key={doc.id}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 border-b border-line py-6"
            >
              <span className="text-lg leading-[24.3px] text-secondary group-hover:text-primary">
                {doc.label}
              </span>
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                aria-hidden
                className="shrink-0 text-primary"
              >
                <path
                  d="M13 3.5v12m0 0 4.5-4.5M13 15.5 8.5 11M4.5 19.5h17v3h-17v-3Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          );
        })}
      </div>
    </section>
  );
}
