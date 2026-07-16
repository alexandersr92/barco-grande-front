import { redirect } from "next/navigation";

// La raíz redirige a la audiencia por defecto. Cada audiencia vive bajo su
// propio prefijo (/personas, /empresas, /sobre-nosotros) y define su menú y
// sus páginas desde Strapi.
export default function RootPage() {
  redirect("/personas");
}
