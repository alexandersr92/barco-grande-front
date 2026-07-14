import type { Section } from "@/lib/strapi";
import Hero, { type HeroProps } from "@/components/sections/Hero";
import ChannelsBar, { type ChannelsBarProps } from "@/components/sections/ChannelsBar";
import ProductShowcase, {
  type ProductShowcaseProps,
} from "@/components/sections/ProductShowcase";
import NewsList from "@/components/sections/NewsList";
import PromotionsList from "@/components/sections/PromotionsList";
import AppBanner, { type AppBannerProps } from "@/components/sections/AppBanner";
import InfoCards, { type InfoCard } from "@/components/sections/InfoCards";
import ProductGrid from "@/components/sections/ProductGrid";
import RichText from "@/components/sections/RichText";

export default function BlockRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section) => {
        const key = `${section.__component}-${section.id}`;
        switch (section.__component) {
          case "sections.hero":
            return <Hero key={key} {...(section as unknown as HeroProps)} />;
          case "sections.channels-bar":
            return (
              <ChannelsBar key={key} {...(section as unknown as ChannelsBarProps)} />
            );
          case "sections.product-showcase":
            return (
              <ProductShowcase
                key={key}
                {...(section as unknown as ProductShowcaseProps)}
              />
            );
          case "sections.news-list":
            return (
              <NewsList
                key={key}
                heading={section.heading as string}
                limit={(section.limit as number) ?? 3}
              />
            );
          case "sections.promotions-list":
            return (
              <PromotionsList
                key={key}
                heading={section.heading as string}
                limit={(section.limit as number) ?? 2}
              />
            );
          case "sections.app-banner":
            return <AppBanner key={key} {...(section as unknown as AppBannerProps)} />;
          case "sections.info-cards":
            return (
              <InfoCards
                key={key}
                heading={section.heading as string}
                cards={(section.cards as InfoCard[]) ?? []}
              />
            );
          case "sections.product-grid":
            return (
              <ProductGrid
                key={key}
                heading={section.heading as string}
                category={section.category as string}
                audience={section.audience as string}
              />
            );
          case "sections.rich-text":
            return <RichText key={key} body={section.body as string} />;
          default:
            return null;
        }
      })}
    </>
  );
}
