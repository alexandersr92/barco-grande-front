import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticle, getArticles, getStrapiMedia } from "@/lib/strapi";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  return {
    title: article?.title ?? "Noticia",
    description: article?.excerpt ?? undefined,
  };
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const imageUrl = getStrapiMedia(article.image);
  const formattedDate = article.date
    ? new Date(`${article.date}T00:00:00`).toLocaleDateString("es-NI", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      <Link
        href="/noticias"
        className="text-sm font-bold uppercase tracking-wide text-primary"
      >
        ← Noticias
      </Link>
      <h1 className="mt-4 text-4xl font-bold tracking-[-1px] text-secondary">
        {article.title}
      </h1>
      {formattedDate && (
        <p className="mt-2 text-sm font-semibold text-muted">{formattedDate}</p>
      )}
      {imageUrl && (
        <div className="relative mt-8 h-96 overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      )}
      <div className="mt-8 space-y-4">
        {(article.content ?? article.excerpt ?? "")
          .split(/\n{2,}/)
          .map((paragraph, i) => (
            <p key={i} className="text-[17px] leading-7 text-foreground">
              {paragraph}
            </p>
          ))}
      </div>
    </article>
  );
}
