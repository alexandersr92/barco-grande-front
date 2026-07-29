// Estado de carga global: spinner simple con la paleta del sitio mientras
// se resuelven los fetch de Strapi de la ruta.
export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status">
      <span className="sr-only">Cargando…</span>
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-primary" />
    </div>
  );
}
