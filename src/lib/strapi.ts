// `||` (no `??`) para que un string vacío —como el que a veces inyecta el
// entorno de deploy— también caiga al default. En local, .env.local fija
// http://localhost:1337, así que el default de producción no afecta el dev.
// URL PÚBLICA: la que ve el navegador (para construir URLs de imágenes/media).
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://carnes-strapi-ca6779-82-180-133-127.traefik.me";

// URL INTERNA para el fetch server-side. En el VPS, el contenedor del frontend
// habla con el del backend por la red interna de Docker (HTTP, sin pasar por
// el dominio público → evita problemas de hairpin/SSL). Si no se define,
// usa la pública.
const STRAPI_API_URL = process.env.STRAPI_INTERNAL_URL || STRAPI_URL;

// Para URLs de media (las carga el navegador): siempre pública.
export function getStrapiURL(path = ""): string {
  return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(media?: StrapiMedia | null): string | null {
  if (!media?.url) return null;
  return media.url.startsWith("http") ? media.url : getStrapiURL(media.url);
}

export async function fetchAPI<T = unknown>(
  path: string,
  params: Record<string, string> = {},
): Promise<T> {
  const query = new URLSearchParams(params).toString();
  // El fetch de datos usa la URL interna (server-side).
  const url = `${STRAPI_API_URL}/api${path}${query ? `?${query}` : ""}`;

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 },
    // Corta rápido si Strapi no responde (p. ej. build sin backend accesible),
    // para no colgar el build hasta el timeout de Next.
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    throw new Error(`Error consultando Strapi (${res.status}): ${url}`);
  }
  return res.json() as Promise<T>;
}

// ——— Tipos ———

export interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

export interface LinkItem {
  id: number;
  label: string;
  url: string;
}

export interface ButtonItem extends LinkItem {
  variant?: "primary" | "outline" | "link";
}

export interface FeatureItem {
  id: number;
  text: string;
}

export interface NavItem {
  id: number;
  label: string;
  url?: string;
  links?: LinkItem[];
}

export interface FooterColumn {
  id: number;
  title: string;
  links: LinkItem[];
}

export interface SocialLink {
  id: number;
  name?: string;
  url: string;
  icon?: StrapiMedia | null;
}

export interface GlobalData {
  siteName: string;
  logo?: StrapiMedia | null;
  topNav: LinkItem[];
  audienceNav: LinkItem[];
  mainNav: NavItem[];
  socialLinks: SocialLink[];
  ebankingUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  usdBuy?: number;
  usdSell?: number;
  footerColumns: FooterColumn[];
  address?: string;
  phone?: string;
  copyright?: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer?: string;
}

export interface DocumentLink {
  id: number;
  label: string;
  description?: string;
  url?: string;
  file?: StrapiMedia | null;
}

export interface IconFeature {
  id: number;
  title: string;
  description?: string;
  icon?: StrapiMedia | null;
}

export interface RewardPlan {
  id: number;
  title: string;
  ctaLabel?: string;
  ctaUrl?: string;
  programText?: string;
  bonusText?: string;
  icon?: StrapiMedia | null;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  category: "cuenta" | "tarjeta" | "credito" | "seguro" | "transferencia" | "servicio";
  audience: "personas" | "empresas";
  shortDescription?: string;
  description?: string;
  introHeading?: string;
  benefitsIntro?: string;
  tabsHeading?: string;
  heroTheme?: "light" | "dark";
  heroGradient?: string;
  featuresHeading?: string;
  featureBoxes?: IconFeature[];
  rewardPlans?: RewardPlan[];
  redeemIntro?: string;
  redeemItems?: FeatureItem[];
  features?: FeatureItem[];
  benefits?: FeatureItem[];
  requirements?: FeatureItem[];
  conditions?: FeatureItem[];
  faqs?: FaqItem[];
  documents?: DocumentLink[];
  photo?: StrapiMedia | null;
  cardImage?: StrapiMedia | null;
  promoImage?: StrapiMedia | null;
  order?: number;
}

// Cada pestaña principal del sitio (Personas / Empresas / Sobre nosotros).
// Define su propio menú y agrupa sus páginas bajo /[slug]/...
export interface Audience {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  mainNav: NavItem[];
  order?: number;
}

export interface Channel {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  buttonIcon?: "none" | "phone";
  features?: FeatureItem[];
  image?: StrapiMedia | null;
  order?: number;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  date?: string;
  category?: string;
  excerpt?: string;
  content?: string;
  image?: StrapiMedia | null;
}

export interface Promotion {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  image?: StrapiMedia | null;
}

export interface Section {
  __component: string;
  id: number;
  [key: string]: unknown;
}

export interface Page {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  audience?: Pick<Audience, "name" | "slug"> | null;
  sections: Section[];
  seo?: { metaTitle?: string; metaDescription?: string } | null;
}

// ——— Consultas ———

export async function getGlobal(): Promise<GlobalData | null> {
  try {
    const res = await fetchAPI<{ data: GlobalData }>("/global", {
      "populate[logo]": "true",
      "populate[topNav]": "true",
      "populate[audienceNav]": "true",
      "populate[mainNav][populate]": "links",
      "populate[socialLinks][populate]": "icon",
      "populate[footerColumns][populate]": "links",
    });
    return res.data;
  } catch {
    return null;
  }
}

// Los getters devuelven vacío si Strapi no está disponible (p. ej. build en
// Vercel sin backend configurado) en lugar de romper el build.
// Una página se identifica por su audiencia + slug: /personas/cuentas y
// /empresas/cuentas comparten slug pero son páginas distintas. Sin `audience`
// devuelve la primera coincidencia por slug (páginas globales).
export async function getPage(
  slug: string,
  audience?: string,
): Promise<Page | null> {
  try {
    const res = await fetchAPI<{ data: Page[] }>("/pages", {
    "filters[slug][$eq]": slug,
    ...(audience ? { "filters[audience][slug][$eq]": audience } : {}),
    "populate[audience][fields][0]": "name",
    "populate[audience][fields][1]": "slug",
    "populate[seo]": "true",
    // La zona dinámica requiere populate por componente (sintaxis `on` de Strapi v5)
    // para alcanzar media anidada en componentes repetibles.
    "populate[sections][on][sections.hero][populate]": "*",
    "populate[sections][on][sections.product-showcase][populate]": "*",
    "populate[sections][on][sections.product-grid][populate]": "*",
    "populate[sections][on][sections.product-links][populate][items][populate]": "icon",
    "populate[sections][on][sections.channels-converter][populate]": "*",
    "populate[sections][on][sections.feature-banner][populate]": "*",
    "populate[sections][on][sections.info-cards][populate][cards][populate]": "image",
    "populate[sections][on][sections.news-list][populate]": "*",
    "populate[sections][on][sections.promotions-list][populate]": "*",
    "populate[sections][on][sections.app-banner][populate]": "*",
    "populate[sections][on][sections.channels-bar][populate]": "*",
    "populate[sections][on][sections.mission-vision][populate]": "*",
    "populate[sections][on][sections.values-grid][populate][items][populate]": "icon",
    "populate[sections][on][sections.values-grid][populate][centerImage]": "true",
    "populate[sections][on][sections.leaders][populate][leaders][populate]": "photo",
    "populate[sections][on][sections.card-grid][populate][cards][populate]": "image",
    "populate[sections][on][sections.document-group][populate][items][populate]": "file",
    "populate[sections][on][sections.document-group][populate][image]": "true",
    "populate[sections][on][sections.pill-nav][populate]": "items",
    "populate[sections][on][sections.icon-block][populate]": "icon",
    "populate[sections][on][sections.icon-columns][populate][items][populate]": "icon",
    "populate[sections][on][sections.quote-banner][populate]": "image",
    "populate[sections][on][sections.split-text][populate]": "*",
    "populate[sections][on][sections.media-text][populate]": "images",
    "populate[sections][on][sections.role-grid][populate]": "items",
    "populate[sections][on][sections.section-heading][fields][0]": "title",
    "populate[sections][on][sections.section-heading][fields][1]": "kicker",
    "populate[sections][on][sections.section-heading][fields][2]": "subtitle",
    "populate[sections][on][sections.section-heading][fields][3]": "align",
    "populate[sections][on][sections.section-heading][fields][4]": "background",
    "populate[sections][on][sections.section-heading][fields][5]": "maxWidth",
      "populate[sections][on][sections.rich-text][fields][0]": "body",
      "populate[sections][on][sections.rich-text][fields][1]": "align",
      "populate[sections][on][sections.rich-text][fields][2]": "maxWidth",
    });
    return res.data[0] ?? null;
  } catch {
    return null;
  }
}

export async function getProducts(
  filters: { category?: string; audience?: string } = {},
): Promise<Product[]> {
  const params: Record<string, string> = {
    sort: "order:asc",
    "pagination[pageSize]": "100",
    "populate[photo]": "true",
    "populate[cardImage]": "true",
    "populate[features]": "true",
  };
  if (filters.category) params["filters[category][$eq]"] = filters.category;
  if (filters.audience) params["filters[audience][$eq]"] = filters.audience;
  try {
    const res = await fetchAPI<{ data: Product[] }>("/products", params);
    return res.data;
  } catch {
    return [];
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetchAPI<{ data: Product[] }>("/products", {
      "filters[slug][$eq]": slug,
      "populate[photo]": "true",
      "populate[cardImage]": "true",
      "populate[promoImage]": "true",
      "populate[features]": "true",
      "populate[benefits]": "true",
      "populate[requirements]": "true",
      "populate[conditions]": "true",
      "populate[faqs]": "true",
      "populate[documents][populate]": "file",
      "populate[featureBoxes][populate]": "icon",
      "populate[rewardPlans][populate]": "icon",
      "populate[redeemItems]": "true",
      "populate[seo]": "true",
    });
    return res.data[0] ?? null;
  } catch {
    return null;
  }
}

export async function getAudiences(): Promise<Audience[]> {
  try {
    const res = await fetchAPI<{ data: Audience[] }>("/audiences", {
      sort: "order:asc",
      "populate[mainNav][populate]": "links",
    });
    return res.data;
  } catch {
    return [];
  }
}

export async function getChannels(): Promise<Channel[]> {
  try {
    const res = await fetchAPI<{ data: Channel[] }>("/channels", {
      sort: "order:asc",
      "pagination[pageSize]": "100",
      "populate[image]": "true",
      "populate[features]": "true",
    });
    return res.data;
  } catch {
    return [];
  }
}

export async function getArticles(limit = 100): Promise<Article[]> {
  try {
    const res = await fetchAPI<{ data: Article[] }>("/articles", {
      sort: "date:desc",
      "pagination[pageSize]": String(limit),
      "populate[image]": "true",
    });
    return res.data;
  } catch {
    return [];
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const res = await fetchAPI<{ data: Article[] }>("/articles", {
      "filters[slug][$eq]": slug,
      populate: "*",
    });
    return res.data[0] ?? null;
  } catch {
    return null;
  }
}

export async function getPromotions(limit = 100): Promise<Promotion[]> {
  try {
    const res = await fetchAPI<{ data: Promotion[] }>("/promotions", {
      "pagination[pageSize]": String(limit),
      "populate[image]": "true",
    });
    return res.data;
  } catch {
    return [];
  }
}
