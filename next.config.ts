import type { NextConfig } from "next";

// Host del Strapi desplegado (p. ej. https://mi-strapi.up.railway.app),
// tomado de la misma variable que usa el cliente de datos.
// `||` (no `??`) para que un string vacío también caiga al default, y try/catch
// para que una URL inválida nunca rompa el build.
const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
let strapiHost: URL;
try {
  strapiHost = new URL(strapiUrl);
} catch {
  strapiHost = new URL("http://localhost:1337");
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
