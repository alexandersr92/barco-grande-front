# Guía de entrega — Sitio Banco Avanz

Documento de traspaso para el equipo que tomará el proyecto. Cubre cómo
levantar el sitio con **todo el contenido** (las 28 páginas, 37 productos,
canales, noticias y media), cómo se edita, cómo se despliega y los
procedimientos de mantenimiento.

---

## 1. Arquitectura

Monorepo con dos aplicaciones:

| Carpeta     | Stack                                  | Puerto | Repo de deploy |
|-------------|----------------------------------------|--------|----------------|
| `frontend/` | Next.js 16 (App Router) + Tailwind v4  | 3000   | `barco-grande-front` |
| `backend/`  | Strapi v5 (CMS headless)               | 1337   | `barco-backend` |

- **Base de datos**: SQLite en dev (`backend/.tmp/data.db`), Postgres en
  producción (vía variables `DATABASE_*`).
- **Deploy**: Dokploy en un VPS. Cada app tiene su propio repo en GitHub; el
  monorepo publica a ellos con `git subtree push` (ver §6).
- **Todo el contenido es editable desde Strapi** (Content Manager): páginas
  con zona dinámica de secciones, productos, canales, noticias, promociones y
  el single type Global (navegación, footer, tasas de cambio, textos del
  banner de app).

## 2. Levantar el proyecto en local (con todas las páginas)

```bash
git clone <monorepo>
cd avanz
npm install                        # raíz (concurrently)
npm install --prefix backend
npm install --prefix frontend
cp frontend/.env.example frontend/.env.local   # NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
cp backend/.env.example backend/.env           # generar secretos reales (ver §3)
npm run dev                        # Strapi (1337) + Next (3000)
```

Al primer arranque con base vacía, **el seed crea automáticamente todo el
contenido** (ver §4): páginas, productos, canales, noticias, navegación y
media. Solo falta registrar el primer usuario admin en
`http://localhost:1337/admin`.

### Alternativa: importar un snapshot exacto

El seed ya recrea todo, pero si se necesita una copia exacta de un entorno
(por ejemplo, con las ediciones que el cliente hizo en el admin de prod),
hay scripts de export/import (`backend/exports/` está gitignoreado; el
archivo se genera bajo demanda y se pasa por fuera del repo):

```bash
cd backend
npm run export:content      # genera backend/exports/contenido-avanz.tar.gz
                            # (entidades + media + configuración, ~30 MB)
npm run import:content      # ⚠️ BORRA el contenido actual de la base destino
```

Para exportar **desde producción**: correr `npm run export:content` dentro
del contenedor del backend en el VPS y copiar el `.tar.gz`, o usar
`strapi transfer` entre entornos.

## 3. Variables de entorno

### Backend (`backend/.env`)

| Variable | Uso |
|---|---|
| `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY` | Secretos de Strapi. **Obligatorios**; generar valores únicos por entorno (`openssl rand -base64 32`). |
| `CORS_ORIGINS` | Orígenes permitidos, separados por coma. En dev el default ya incluye `http://localhost:3000`. En prod: el dominio del frontend. |
| `DATABASE_CLIENT`, `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DATABASE_SSL` | Postgres en producción. Sin ellas usa SQLite local. |

### Frontend (`frontend/.env.local` en dev, Environment de Dokploy en prod)

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_STRAPI_URL` | URL **pública** del backend (el navegador la usa para las imágenes). **Obligatoria: el build falla si falta** (a propósito, para no apuntar a un backend equivocado). |
| `STRAPI_INTERNAL_URL` | URL interna Docker para el fetch server-side (ej. `http://<contenedor-strapi>:1337`). Evita pasar por el dominio público/TLS. Opcional: sin ella usa la pública. |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (metadata, OpenGraph, sitemap). |

**Nunca** definir `NODE_TLS_REJECT_UNAUTHORIZED` — anula la validación TLS de
todo el proceso.

## 4. Contenido: seed versionado

`backend/src/seed.ts` corre en cada arranque (bootstrap) y aplica migraciones
incrementales (`migrateV3` … `migrateV25`, versión guardada en el store
`plugin::avanz-seed`). Es **idempotente**: re-ejecutar no duplica nada. Con la
base vacía siembra todo desde cero.

Para cambios de contenido "de fábrica" (que deban llegar a prod vía deploy):

1. Subir `SEED_VERSION` en 1.
2. Escribir `migrateV<N>(strapi)` siguiendo el patrón de las existentes
   (buscar por slug antes de crear; `uploadAssets(strapi, [...])` sube archivos
   desde `backend/scripts/assets/`).
3. Registrar el bloque `if (version < N)` en `seed()`.
4. Probarla **dos veces seguidas** en dev (idempotencia) antes de pushear:
   la primera con la versión anterior, la segunda re-ejecutando.

En dev, si el watcher de Strapi estampa la versión sin correr la migración
(pasa al editar seed.ts en caliente):

```bash
sqlite3 backend/.tmp/data.db "UPDATE strapi_core_store_settings SET value='<N-1>' WHERE key='plugin_avanz-seed_version';"
touch backend/src/seed.ts
```

Los cambios que hace el cliente en el admin de prod **no** viven en el seed —
para clonarlos usar export/import (§2).

## 5. Mapa de edición (qué se toca dónde)

Todo en **Content Manager** del admin de Strapi:

| Contenido | Dónde |
|---|---|
| Páginas (28: inicios, categorías por audiencia, zona digital, canales, noticias, promociones, institucionales) | **Página** — cada una con su zona dinámica de secciones (hero, listados, tabs, documentos, etc.) |
| Productos (textos, features, foto, imagen de tarjeta, FAQs, documentos, tabs) | **Producto** — filtrar por `audience` y `category` |
| Canales de atención | **Canal de Atención** |
| Noticias / Promociones | **Noticia** / **Promoción** |
| Navegación por pestaña (Personas/Empresas/Sobre nosotros) | **Audiencia** → `mainNav` |
| Logo, footer, redes, tasas de cambio, URLs de tiendas/e-Banking, textos del banner de app | **Global** |
| Documentos descargables | ítems `documents` en páginas/productos — **sin archivo subido el botón no se muestra**; al subir el PDF aparece solo |

Frontend: `BlockRenderer.tsx` mapea cada componente de sección de Strapi a un
componente React en `frontend/src/components/sections/`. Para una sección
nueva: crear el JSON en `backend/src/components/sections/`, registrarla en la
dynamic zone de `page`, crear el componente React, mapearla en BlockRenderer y
agregar su populate en `getPage()` (`frontend/src/lib/strapi.ts`).

## 6. Deploy

```bash
# desde la raíz del monorepo, con main al día:
git subtree push --prefix=backend back main      # → repo barco-backend
git subtree push --prefix=frontend front main    # → repo barco-grande-front
```

En Dokploy cada servicio construye desde su repo (rama `main`). Verificar que
las variables de §3 estén configuradas **antes** del primer deploy. Orden
recomendado: backend primero (corre las migraciones al arrancar — buscar
"✅ Migración vN completada" en los logs), frontend después. Frontend y
backend deben desplegarse del **mismo commit** del monorepo.

El frontend usa ISR con revalidación de 5 minutos: los cambios en Strapi
aparecen solos en el sitio en ≤5 min, sin redeploy.

## 7. Procedimientos útiles

- **Reset de contraseña del admin** (no hay proveedor de email configurado, el
  "olvidé mi contraseña" no envía correo): en la terminal del contenedor del
  backend (`/bin/sh`, no bash):
  ```bash
  node_modules/.bin/strapi admin:reset-user-password --email=<email> --password="<nueva>"
  ```
  ⚠️ No usar `npx strapi` a secas: descarga un paquete viejo (`strapi@2.x`)
  que no es el del proyecto. Si el login se bloquea por intentos
  ("Too many requests"), esperar unos minutos o reiniciar el contenedor.
- **Typecheck**: `npm run typecheck` en `frontend/` y `backend/`.
- **Permisos públicos de la API**: se configuran por código en
  `backend/src/index.ts` (solo `find`/`findOne` de los content types del
  sitio). Solo lectura; el frontend no usa tokens.

## 8. Seguridad (decisiones tomadas)

- CORS restringido por `CORS_ORIGINS`; sin cabecera `X-Powered-By`.
- Uploads con allowlist explícita (png/jpeg/webp/avif/gif/svg/pdf/doc).
  SVG se permite a propósito: el logo y los íconos del sitio son SVG de la
  media library y solo los admins pueden subir; el frontend los sirve con CSP
  sin scripts y `Content-Disposition: attachment`.
- El optimizador de imágenes solo acepta el host de `NEXT_PUBLIC_STRAPI_URL`,
  y solo permite IPs locales cuando ese host es localhost (dev).
- Sin URLs ni secretos hardcodeados: todo por variables de entorno, con fallo
  explícito de build si faltan.

## 9. Pendientes conocidos (a la fecha de entrega)

- Subir los PDFs reales de "Descargar documentación" (hoy los ítems existen
  sin archivo y por eso no se muestran los botones).
- Imágenes para 2 noticias y promos de varios productos.
- FAQs reales por producto fuera de tarjetas de crédito.
- El dominio del backend en prod (`carnes-strapi-...traefik.me`) es heredado
  del setup inicial del VPS; conviene migrarlo a un dominio propio con
  certificado. Al cambiarlo solo hay que actualizar `NEXT_PUBLIC_STRAPI_URL`
  y `CORS_ORIGINS`.
