export default function RichText({ body }: { body?: string }) {
  if (!body) return null;

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      {body.split(/\n{2,}/).map((paragraph, i) => (
        <p key={i} className="mb-4 text-[17px] leading-7 text-foreground">
          {paragraph}
        </p>
      ))}
    </section>
  );
}
