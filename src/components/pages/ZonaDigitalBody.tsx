import Image from "next/image";
import DigitalBanner from "@/components/DigitalBanner";
import DigitalTutorials from "@/components/DigitalTutorials";
import DocumentDownloadList from "@/components/DocumentDownloadList";

// Íconos de las 3 columnas de valor
const FEATURES = [
  {
    icon: "/icons/zona-facil.png",
    title: "Fácil de usar",
    description: "Controla tus ingresos, gastos y ahorros al instante.",
  },
  {
    icon: "/icons/zona-online.png",
    title: "100% online",
    description: "Realiza tus operaciones desde donde estés.",
  },
  {
    icon: "/icons/zona-seguridad.png",
    title: "Máxima seguridad",
    description: "Haz tus transacciones con total confianza",
  },
];

// Lista "Con un solo clic podés realizar"
const BENEFITS = [
  "Pagos de servicio, tarjetas de crédito y préstamos.",
  "T-Envío, envio de efectivo a través de un código.",
  "T-Envio business",
  "Envío de tus transferencias.",
  "Agregar tus beneficiarios.",
  "Realizar solicitudes en línea de cuentas, préstamos, tarjetas de crédito, suscripción AvanzTrans.",
  "Solicitar tu mesa de cambio preferencial.",
  "Canjeo de tus programas de lealtad de tu tarjeta de crédito, reporte de tarjetas perdidas, robadas o daño de plástico, bloqueo y desbloqueo temporal y cambio de límites de adicionales.",
];

// Pestañas de tutoriales (solo "Primeros pasos" tiene contenido en el diseño)
const TUTORIAL_TABS = [
  {
    id: "primeros-pasos",
    label: "Primeros pasos",
    cards: [
      {
        id: "inicia-sesion",
        title: "Inicia sesión por primera vez",
        description:
          "Accede a tu cuenta bancaria de manera sencilla y rápida con nuestra aplicación. Inicia sesión en segundos para gestionar tus finanzas con facilidad. Tu acceso rápido a un mundo de servicios financieros al alcance de tus dedos. ¡Descarga la app y comienza hoy mismo!",
        image: "/images/zona-tutorial-1.png",
      },
      {
        id: "personaliza",
        title: "Personaliza tu experiencia",
        description:
          "Con Avanz App, la personalización está en tus manos. Desde cambiar tu foto de perfil hasta gestionar tus transacciones favoritas, adaptá la app a tu estilo. ¡Tu experiencia bancaria, a tu manera!",
        image: "/images/zona-tutorial-2.png",
      },
    ],
  },
  { id: "usuarios-contrasenas", label: "Usuarios y contraseñas", cards: [] },
  { id: "transferencias", label: "Transferencias", cards: [] },
  { id: "pagos", label: "Pagos", cards: [] },
  { id: "consultas-finanzas", label: "Consultas y finanzas", cards: [] },
];

// Documentación descargable
const DOCUMENTS = [
  { id: 1, label: "Preguntas Frecuentes - Servicios Financieros", href: "#" },
  { id: 2, label: "Contrato de Servicios en Linea (E-banking)", href: "#" },
  { id: 3, label: "Guía de usuario de e-Banking.", href: "#" },
  { id: 4, label: "Tarifas de Servicios", href: "#" },
  { id: 5, label: "Guia de Usuario Avanz Móvil.", href: "#" },
];

function BenefitCheck() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0"
    >
      <circle cx="10" cy="10" r="9" stroke="#ff7500" strokeWidth="1.5" />
      <path
        d="m6 10 2.8 2.8L14 7.5"
        stroke="#ff7500"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Contenido de Zona Digital (diseño 1499:28328). Mismo para todas las
// audiencias; se muestra bajo /[audience]/zona-digital.
export default function ZonaDigitalBody() {
  return (
    <>
      {/* Hero naranja: Tu banco fácil y digital */}
      <DigitalBanner
        title="Tu banco fácil y digital"
        subtitle="Con Avanz App hacemos tu vida más fácil, por eso, ponemos el banco en tus manos para que podás realizar tus transacciones sin complicaciones desde donde estés."
        buttons={[
          { label: "App Store", href: "https://apps.apple.com", icon: "apple", external: true },
          { label: "Play Store", href: "https://play.google.com", icon: "play", external: true },
        ]}
        image={{
          src: "/images/zona-hero-phone.png",
          alt: "App Avanz Móvil",
          width: 513,
          height: 730,
        }}
      />

      {/* 3 columnas de valor con íconos */}
      <section className="mx-auto max-w-[1220px] px-5 py-[80px]">
        <div className="grid gap-y-12 md:grid-cols-3 md:divide-x md:divide-line">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center gap-5 px-12 text-center"
            >
              <div className="relative h-[120px] w-[120px]">
                <Image
                  src={f.icon}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>
              <h3 className="text-[24px] leading-[1.3] tracking-[-0.5px] text-secondary md:text-[26px]">
                {f.title}
              </h3>
              <p className="max-w-[300px] text-[16px] leading-7 text-muted">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Beneficios: Con un solo clic podés realizar */}
      <section className="mx-auto flex max-w-[1220px] flex-col items-center gap-10 px-5 pb-[70px] lg:flex-row lg:items-center lg:gap-8">
        <div className="flex-1">
          <p className="pb-4 text-sm font-semibold uppercase tracking-[2px] text-primary">
            Beneficios
          </p>
          <h2 className="max-w-[556px] pb-8 text-[32px] leading-[1.15] tracking-[-1px] text-secondary md:text-[44px]">
            Con un solo clic podés realizar
          </h2>
          <ul className="space-y-[9px]">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-[15px]">
                <BenefitCheck />
                <span className="max-w-[520px] text-[16px] leading-7 text-muted">
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full max-w-[521px] shrink-0">
          <Image
            src="/images/zona-benefits-app.png"
            alt="Descarga la app Avanz Móvil"
            width={521}
            height={521}
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* Tutoriales */}
      <DigitalTutorials tabs={TUTORIAL_TABS} />

      {/* Banner e-Banking */}
      <DigitalBanner
        title="e-Banking"
        subtitle="A través del e-Banking podés realizar consultas de saldo, imprimir estados de cuenta, efectuar movimientos entre cuentas propias y transferir dinero a cuentas de otros bancos nacionales o internacionales."
        buttons={[
          {
            label: "Ingresar al e-Banking",
            href: "https://ebanking.avanzbanc.com",
            icon: "ebanking",
            external: true,
          },
        ]}
        image={{
          src: "/images/zona-ebanking.png",
          alt: "e-Banking Avanz",
          width: 513,
          height: 611,
        }}
      />

      {/* Descargar Documentación */}
      <DocumentDownloadList items={DOCUMENTS} />
    </>
  );
}
