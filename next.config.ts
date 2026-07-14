import type { NextConfig } from "next";

// Host del Strapi desplegado (p. ej. https://mi-strapi.up.railway.app),
// tomado de la misma variable que usa el cliente de datos.
// `||` (no `??`) para que un string vacío también caiga al default, y try/catch
// para que una URL inválida nunca rompa el build.
const FALLBACK_STRAPI_URL =
  "https://carnes-strapi-ca6779-82-180-133-127.traefik.me";
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || FALLBACK_STRAPI_URL;
let strapiHost: URL;
try {
  strapiHost = new URL(strapiUrl);
} catch {
  strapiHost = new URL(FALLBACK_STRAPI_URL);
}

const nextConfig: NextConfig = {
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
