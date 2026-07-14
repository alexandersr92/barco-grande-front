import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-xl font-semibold text-secondary">
        No encontramos la página que buscás.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-primary px-7 py-3.5 font-bold text-white hover:bg-primary-dark"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
