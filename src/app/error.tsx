"use client";

// Error boundary global: evita la pantalla de error genérica de Next si un
// Server Component lanza (p. ej. backend inaccesible) y permite reintentar.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("[app] error boundary:", error);
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center gap-6 px-5 text-center">
      <h1 className="text-[34px] leading-[1.2] tracking-[-1px] text-secondary">
        Algo salió mal
      </h1>
      <p className="text-[17px] leading-7 text-muted">
        No pudimos cargar esta página. Intentá de nuevo en unos segundos.
      </p>
      <button
        onClick={reset}
        className="bg-primary px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-primary-dark"
      >
        Reintentar
      </button>
    </div>
  );
}
