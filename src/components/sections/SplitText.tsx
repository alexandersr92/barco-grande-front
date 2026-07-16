export interface SplitTextProps {
  kicker?: string;
  heading?: string;
  body?: string;
  /** Barra decorativa corta arriba. */
  divider?: boolean;
}

// Título grande a la izquierda y párrafo a la derecha (intro del diseño
// 1506:27127). El párrafo es más grande que el cuerpo estándar (22px).
export default function SplitText({ kicker, heading, body, divider }: SplitTextProps) {
  if (!heading && !body) return null;

  return (
    <section className="mx-auto max-w-[1220px] px-5 py-[90px]">
      {divider && <div className="mb-9 h-px w-[200px] bg-muted-light" />}
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-5">
        <div className="lg:w-1/2">
          {kicker && (
            <p className="pb-3 text-sm uppercase tracking-[1px] text-muted-light">
              {kicker}
            </p>
          )}
          {heading && (
            <h2 className="max-w-[520px] text-[32px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
              {heading}
            </h2>
          )}
        </div>
        {body && (
          <div className="lg:w-1/2 lg:pl-16">
            <p className="max-w-[490px] text-[18px] leading-[1.3] text-muted md:text-[22px] md:leading-[28.6px]">
              {body}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
