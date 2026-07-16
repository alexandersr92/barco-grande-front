import { redirect } from "next/navigation";

// Ruta antigua sin prefijo de audiencia. El contenido vive ahora bajo
// /personas/transferencias (ver /[audience]/[slug]). next.config.ts ya redirige esta
// URL; este stub es el respaldo.
export default function Page() {
  redirect("/personas/transferencias");
}
