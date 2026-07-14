import Image from "next/image";
import Link from "next/link";
import { getArticles, getStrapiMedia } from "@/lib/strapi";
import { ArrowIcon } from "@/components/ui";

function formatDate(date?: string): string {
  if (!date) return "";
  return new Date(`${date}T00:00:00`).toLocaleDateString("es-NI", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsList({
  heading,
  limit = 3,
}: {
  heading?: string;
  limit?: number;
}) {
  const articles = await getArticles(limit);
  if (articles.length === 0) return null;

  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-10 text-center text-4xl font-bold tracking-[-1px] text-secondary">
          {heading ?? "Noticias Avanz"}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article) => {
            const imageUrl = getStrapiMedia(article.image);
            return (
              <article
                key={article.documentId}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {imageUrl && (
                  <div className="relative h-52 w-full">
                    <Image
                      src={imageUrl}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <span className="text-sm font-semibold text-primary">
                    {formatDate(article.date)}
                  </span>
                  <h3 className="text-xl font-bold text-secondary">
                    {article.title}
                  </h3>
                  <p className="flex-1 text-[15px] leading-6 text-muted">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/noticias/${article.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-secondary hover:text-primary"
                  >
                    Leer más
                    <ArrowIcon />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
