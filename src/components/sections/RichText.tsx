import type { ReactNode } from "react";

export interface RichTextProps {
  body?: string;
  align?: "left" | "center";
  /** Ancho máximo del contenido en px (por defecto 896). */
  maxWidth?: number;
}

// Convierte el markdown en línea que se escribe desde el CMS. Por ahora solo
// **negrita**, que es lo único que usan los textos del diseño.
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="font-bold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

export default function RichText({ body, align = "left", maxWidth }: RichTextProps) {
  if (!body) return null;

  const paragraphs = body.split(/\n{2,}/).filter((p) => p.trim().length > 0);

  return (
    <section className="px-4 py-16">
      <div
        className={`mx-auto ${align === "center" ? "text-center" : ""}`}
        style={{ maxWidth: `${maxWidth ?? 896}px` }}
      >
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="mb-6 text-[17px] leading-7 text-muted last:mb-0">
            {renderInline(paragraph.trim())}
          </p>
        ))}
      </div>
    </section>
  );
}
