import Image from "next/image";
import Link from "next/link";
import { getArticles, getStrapiMedia } from "@/lib/strapi";

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
  showAllButton = true,
}: {
  heading?: string;
  limit?: number;
  showAllButton?: boolean;
}) {
  const articles = await getArticles(limit);
  if (articles.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1220px] px-5 py-[60px]">
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 pb-10">
        <h2 className="text-[34px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
          {heading ?? "Noticias Avanz"}
        </h2>
        {showAllButton && (
          <Link
            href="/noticias"
            className="border border-primary px-6 py-3 text-base text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Leer más noticias
          </Link>
        )}
      </div>
      <div className="grid gap-6 px-5 md:grid-cols-3">
        {articles.map((article) => {
          const imageUrl = getStrapiMedia(article.image);
          return (
            <article key={article.documentId} className="flex flex-col bg-surface">
              <div className="flex min-h-[142px] flex-col gap-2 p-5">
                <span className="text-sm leading-[22.4px] text-muted">
                  {formatDate(article.date)}
                </span>
                <h3 className="text-lg font-semibold leading-6 text-secondary">
                  <Link href={`/noticias/${article.slug}`} className="hover:text-primary">
                    {article.title}
                  </Link>
                </h3>
              </div>
              <Link
                href={`/noticias/${article.slug}`}
                className="relative block h-[247px] w-full overflow-hidden bg-white"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 376px"
                    className="object-cover"
                  />
                ) : (
                  <span className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary-dark" />
                )}
              </Link>
              <div className="flex items-center justify-between px-6 py-5">
                <Link
                  href={`/noticias/${article.slug}`}
                  className="text-base leading-[22.4px] text-muted hover:text-primary"
                >
                  Leer más
                </Link>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 21 21"
                  fill="none"
                  aria-hidden
                  className="text-primary"
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
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
