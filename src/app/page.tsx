import type { Metadata } from "next";
import { getPage } from "@/lib/strapi";
import BlockRenderer from "@/components/BlockRenderer";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("inicio");
  return {
    title: page?.seo?.metaTitle ?? "Banco Avanz",
    description: page?.seo?.metaDescription ?? undefined,
  };
}

export default async function HomePage() {
  const page = await getPage("inicio");

  if (!page) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-secondary">Banco Avanz</h1>
        <p className="mt-4 text-muted">
          No se encontró la página de inicio en Strapi. Verificá que el backend
          esté corriendo en http://localhost:1337 y que exista una Página con
          slug «inicio».
        </p>
      </div>
    );
  }

  return <BlockRenderer sections={page.sections} />;
}
