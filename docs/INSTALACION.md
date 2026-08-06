# Instalación del sitio Banco Avanz

Guía paso a paso para instalar el proyecto desde cero, con **todo el
contenido** (28 páginas, 37 productos, canales, noticias, media) y **sin
usuarios de Strapi** — el primer admin lo crea quien instala.

> Complemento: [ENTREGA.md](./ENTREGA.md) documenta la arquitectura, el mapa
> de edición de contenido, el seed versionado y los procedimientos de
> mantenimiento.

## Requisitos

- Node.js 22+ y npm
- (Producción) Docker + un panel tipo Dokploy, y Postgres

---

## 1. Instalación local (desarrollo)

```bash
# 1. Obtener el código (repo o carpeta avanz/ del paquete de entrega)
cd avanz

# 2. Dependencias
npm install
npm install --prefix backend
npm install --prefix frontend

# 3. Variables de entorno
cp frontend/.env.example frontend/.env.local
#    → dejar NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
cp backend/.env.example backend/.env
#    → reemplazar cada "tobemodified" por un secreto real:
#      openssl rand -base64 32   (uno distinto por variable)

# 4. Arrancar todo (Strapi en :1337 + Next en :3000)
npm run dev
```

### Contenido y primer usuario

- Al primer arranque con base vacía, el **seed** crea automáticamente todo el
  contenido del sitio (páginas, productos, canales, noticias, navegación,
  imágenes). No hay que importar nada.
- Entrar a `http://localhost:1337/admin` → Strapi pide **registrar el primer
  usuario administrador** (no existe ninguno: los usuarios no viajan con el
  proyecto ni con los exports).
- Sitio: `http://localhost:3000`.

### Alternativa: restaurar un snapshot exacto

Si el paquete incluye `contenido-avanz.tar.gz` (export completo de contenido
+ media, **sin usuarios ni tokens** — Strapi nunca los exporta):

```bash
cd backend
mkdir -p exports && cp /ruta/al/contenido-avanz.tar.gz exports/
npm run import:content    # ⚠️ borra el contenido actual de la base destino
```

Útil para clonar el estado de producción (con las ediciones del cliente) en
vez del contenido "de fábrica" del seed.

---

## 2. Instalación en producción (Dokploy o similar)

Cada app se despliega como servicio Docker independiente (los `Dockerfile` y
`docker-compose.yml` ya están en `frontend/` y `backend/`). Ambos servicios
deben compartir la red interna de Docker.

### 2.1 Backend (Strapi + Postgres)

Variables de entorno del servicio:

```
APP_KEYS=<4 valores separados por coma>
API_TOKEN_SALT=<secreto>
ADMIN_JWT_SECRET=<secreto>
TRANSFER_TOKEN_SALT=<secreto>
JWT_SECRET=<secreto>
ENCRYPTION_KEY=<secreto>
CORS_ORIGINS=https://<dominio-del-frontend>
DATABASE_CLIENT=postgres
DATABASE_HOST=<host del Postgres>
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=<usuario>
DATABASE_PASSWORD=<contraseña>
DATABASE_SSL=false
```

Al arrancar, el seed crea el contenido y en los logs se ve
`✅ Migración vN completada`. Después: entrar a `https://<dominio-backend>/admin`
y **registrar el primer admin**.

### 2.2 Frontend (Next.js)

Variables de entorno del servicio (las tres se usan **también en build** —
el compose ya las pasa como build args):

```
NEXT_PUBLIC_STRAPI_URL=https://<dominio-backend>
STRAPI_INTERNAL_URL=http://<nombre-del-contenedor-strapi>:1337
NEXT_PUBLIC_SITE_URL=https://<dominio-del-sitio>
```

- `NEXT_PUBLIC_STRAPI_URL` es obligatoria: **el build falla con un mensaje
  claro si falta** (a propósito).
- `STRAPI_INTERNAL_URL`: hostname del contenedor de Strapi en la red interna.
  Verificar desde la terminal del contenedor del frontend:
  `wget -qO- http://<hostname>:1337/api/global` → debe devolver JSON.
- La media (`/uploads/*`) se sirve por el dominio del sitio y se proxya
  internamente a Strapi — el dominio del backend no necesita estar expuesto
  al público más que para el panel de administración.
- **Nunca** definir `NODE_TLS_REJECT_UNAUTHORIZED`.

Orden de deploy: backend primero, frontend después, siempre del mismo commit.

### 2.3 Verificación post-deploy

1. Logs del backend: migraciones completadas, sin errores.
2. `https://<sitio>/personas`, `/personas/cuentas`, `/personas/zona-digital`,
   `/empresas/tarjetas` → 200 con imágenes.
3. `https://<sitio>/sitemap.xml` y `/robots.txt` → 200.
4. Admin de Strapi accesible y con el contenido en Content Manager.

---

## 3. Después de instalar

- **Favicon**: subirlo en Content Manager → Global → `favicon` (PNG/ICO/SVG).
  Sin archivo se usa el favicon por defecto del proyecto.
- **Documentos descargables**: cada ítem de "Descargar documentación" (en
  páginas y productos) tiene campo de archivo; al subir el PDF el botón
  aparece en el sitio. Sin archivo, el ítem no se muestra.
- **Textos, fotos, tabs, banners**: todo se edita en Content Manager (ver el
  mapa completo en ENTREGA.md §5).
- Los cambios aparecen en el sitio en ≤5 minutos (caché ISR), sin redeploy.

## 4. Estructura del paquete de entrega

```
avanz-entrega/
├── avanz/                      # código fuente completo (monorepo)
├── contenido-avanz.tar.gz      # export de contenido + media (sin usuarios)
├── INSTALACION.md              # esta guía
└── ENTREGA.md                  # arquitectura y mantenimiento
```
