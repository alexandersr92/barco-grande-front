const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

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
  const url = `${getStrapiURL(`/api${path}`)}${query ? `?${query}` : ""}`;

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 },
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

export async function getPage(slug: string): Promise<Page | null> {
  const res = await fetchAPI<{ data: Page[] }>("/pages", {
    "filters[slug][$eq]": slug,
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
    "populate[sections][on][sections.section-heading][fields][0]": "title",
    "populate[sections][on][sections.section-heading][fields][1]": "kicker",
    "populate[sections][on][sections.section-heading][fields][2]": "subtitle",
    "populate[sections][on][sections.section-heading][fields][3]": "align",
    "populate[sections][on][sections.rich-text][fields][0]": "body",
  });
  return res.data[0] ?? null;
}

export async function getProducts(
  filters: { category?: string; audience?: string } = {},
): Promise<Product[]> {
  const params: Record<string, string> = {
    sort: "order:asc",
    "pagination[pageSize]": "100",
    "populate[photo]": "true",
    "populate[cardImage]": "true",
  };
  if (filters.category) params["filters[category][$eq]"] = filters.category;
  if (filters.audience) params["filters[audience][$eq]"] = filters.audience;
  const res = await fetchAPI<{ data: Product[] }>("/products", params);
  return res.data;
}

export async function getProduct(slug: string): Promise<Product | null> {
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
}

export async function getArticles(limit = 100): Promise<Article[]> {
  const res = await fetchAPI<{ data: Article[] }>("/articles", {
    sort: "date:desc",
    "pagination[pageSize]": String(limit),
    "populate[image]": "true",
  });
  return res.data;
}

export async function getArticle(slug: string): Promise<Article | null> {
  const res = await fetchAPI<{ data: Article[] }>("/articles", {
    "filters[slug][$eq]": slug,
    populate: "*",
  });
  return res.data[0] ?? null;
}

export async function getPromotions(limit = 100): Promise<Promotion[]> {
  const res = await fetchAPI<{ data: Promotion[] }>("/promotions", {
    "pagination[pageSize]": String(limit),
    "populate[image]": "true",
  });
  return res.data;
}
