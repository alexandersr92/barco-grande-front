import type { LinkItem } from "@/lib/strapi";

export interface PillNavProps {
  items?: LinkItem[];
}

// Barra de píldoras bajo el hero (diseños de Sobre nosotros). Los enlaces
// pueden ser anclas (#seccion) o rutas; se definen desde Strapi.
export default function PillNav({ items }: PillNavProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="w-full bg-surface">
      <div className="flex flex-wrap items-center justify-center gap-2.5 px-5 py-2.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.url}
            className="border border-line bg-white px-[31px] py-[16px] text-base leading-[22.4px] text-muted transition-colors hover:border-primary hover:text-primary"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
