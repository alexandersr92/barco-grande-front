export interface CategoryFilterNavItem {
  id: string;
  label: string;
  href: string;
}

// Barra de anclas debajo del hero de categoría, listando cada producto como
// una píldora que hace scroll a su sección (diseño 1507:28902).
export default function CategoryFilterNav({
  items,
}: {
  items: CategoryFilterNavItem[];
}) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="bg-surface w-full" >
      <div className="flex flex-wrap items-center justify-center gap-2.5 px-5 py-2.5 ">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="border border-line bg-white px-[31px] py-[16px] text-base leading-[22.4px] text-muted transition-colors hover:border-primary hover:text-primary"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
