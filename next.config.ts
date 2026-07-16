import type { NextConfig } from "next";

// ⚠️ MALA PRÁCTICA DELIBERADA: el backend usa un certificado SSL auto-firmado
// y Node rechazaría la conexión. Desactivamos la validación TLS de todo el
// proceso del servidor Next para que el fetch de datos y la optimización de
// imágenes puedan hablar con el backend. Reemplazar por un cert válido
// (Let's Encrypt con un dominio propio) antes de producción real.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// URL del backend quemada directamente (sin depender de variables de entorno
// en el panel de deploy). En local, .env.local la sobreescribe con localhost.
const FALLBACK_STRAPI_URL =
  "https://carnes-strapi-ca6779-82-180-133-127.traefik.me";
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || FALLBACK_STRAPI_URL;
let strapiHost: URL;
try {
  strapiHost = new URL(strapiUrl);
} catch {
  strapiHost = new URL(FALLBACK_STRAPI_URL);
}

// Las páginas de Personas viven bajo /personas/*. Las URLs viejas sin prefijo
// redirigen ahí para no romper enlaces existentes y mantener la simetría con
// /empresas/*.
const PERSONAS_SLUGS = [
  "cuentas",
  "tarjetas",
  "creditos",
  "seguros",
  "transferencias",
  "servicios",
  "canales-de-atencion",
  "zona-digital",
];

const nextConfig: NextConfig = {
  async redirects() {
    return PERSONAS_SLUGS.map((slug) => ({
      source: `/${slug}`,
      destination: `/personas/${slug}`,
      permanent: false,
    }));
  },
  images: {
    dangerouslyAllowLocalIP: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: strapiHost.protocol.replace(":", "") as "http" | "https",
        hostname: strapiHost.hostname,
        port: strapiHost.port,
        pathname: "/uploads/**",
      },
      // Media Library de Strapi Cloud / proveedores S3 comunes
      {
        protocol: "https",
        hostname: "*.media.strapiapp.com",
      },
    ],
  },
};

export default nextConfig;
