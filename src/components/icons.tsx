// Íconos SVG compartidos entre secciones (antes duplicados literalmente en
// varios componentes). Mantener acá los que se usan en más de un archivo.

/** Flecha de descarga con bandeja (listas de documentos). */
export function DownloadIcon({ className = "shrink-0 text-primary" }: { className?: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden
      className={className}
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

/** Chevron dentro de un círculo (links "Conocé más", noticias, accesos). */
export function CircleArrowIcon({
  size = 18,
  className = "text-primary",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 21"
      fill="none"
      aria-hidden
      className={className}
    >
      <circle cx="10.5" cy="10.5" r="9.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8.5 6.8 12.2 10.5 8.5 14.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
