export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-gradient-to-r from-secondary-dark to-secondary text-white">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg font-semibold text-white/85">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
