import type { MetadataRoute } from "next";
import { getArticles, getAudiences, getPage, getProducts } from "@/lib/strapi";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Sitemap generado desde Strapi: audiencias con sus páginas, productos y
// noticias. Se regenera con el mismo revalidate del sitio.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];
  const add = (path: string) => urls.push({ url: `${SITE_URL}${path}` });

  const audiences = await getAudiences();
  for (const aud of audiences) {
    add(`/${aud.slug}`);
    for (const item of aud.mainNav ?? []) {
      for (const link of [item, ...(item.links ?? [])]) {
        if (link.url?.startsWith("/") && !urls.some((u) => u.url.endsWith(link.url!))) {
          add(link.url);
        }
      }
    }
  }

  const products = await getProducts();
  for (const p of products) add(`/productos/${p.slug}`);

  const articles = await getArticles();
  for (const a of articles) add(`/noticias/${a.slug}`);

  for (const slug of ["noticias", "promociones"]) {
    if (!urls.some((u) => u.url.endsWith(`/${slug}`))) {
      const page = await getPage(slug);
      if (page) add(`/${slug}`);
    }
  }

  return urls;
}
