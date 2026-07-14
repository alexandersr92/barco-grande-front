import type { Metadata } from "next";
import NewsList from "@/components/sections/NewsList";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Noticias",
  description: "Noticias de Banco Avanz.",
};

export default function NoticiasPage() {
  return (
    <>
      <PageHero title="Noticias Avanz" />
      <NewsList heading="Últimas noticias" limit={100} />
    </>
  );
}
