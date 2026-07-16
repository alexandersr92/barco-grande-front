// Config de las páginas de listado de productos. Viven bajo /[audience]/<slug>
// (p. ej. /personas/cuentas y /empresas/cuentas): misma plantilla, y el
// contenido —los productos— se filtra por categoría + audiencia desde Strapi,
// así cada audiencia ve los suyos.
export interface CategoryPageConfig {
  category: "cuenta" | "tarjeta" | "credito" | "seguro" | "transferencia" | "servicio";
  title: string;
  subtitle: string;
  backgroundImage: string;
  emphasized?: boolean;
  tall?: boolean;
  alternate?: boolean;
  documents?: { id: number; label: string; href: string }[];
}

export const CATEGORY_PAGES: Record<string, CategoryPageConfig> = {
  cuentas: {
    category: "cuenta",
    title: "Cuentas",
    subtitle: "Asegura tu dinero, ahorra y recibe beneficios.",
    backgroundImage: "/images/category-hero-family.jpg",
  },
  tarjetas: {
    category: "tarjeta",
    title: "Tarjetas",
    subtitle:
      "¡Obtén una tarjeta de débito o crédito a tu medida! Vos podés personalizarla.",
    backgroundImage: "/images/category-hero-cards.jpg",
    emphasized: true,
    tall: true,
    alternate: false,
    documents: [
      { id: 1, label: "Coberturas y sumas aseguradas", href: "#" },
      { id: 2, label: "Tabla de costos de tarjetas de crédito", href: "#" },
      { id: 3, label: "Información 3D Secure by Visa", href: "#" },
    ],
  },
  creditos: {
    category: "credito",
    title: "Créditos",
    subtitle: "Financiamiento a tu medida para alcanzar tus metas.",
    backgroundImage: "/images/category-hero-family.jpg",
  },
  seguros: {
    category: "seguro",
    title: "Seguros",
    subtitle: "Protegé lo que más te importa con nuestros seguros.",
    backgroundImage: "/images/category-hero-family.jpg",
  },
  transferencias: {
    category: "transferencia",
    title: "Transferencias",
    subtitle: "Enviá y recibí dinero de forma rápida y segura.",
    backgroundImage: "/images/category-hero-family.jpg",
  },
  servicios: {
    category: "servicio",
    title: "Otros Servicios",
    subtitle: "Servicios pensados para hacerte la vida más fácil.",
    backgroundImage: "/images/category-hero-family.jpg",
  },
};
