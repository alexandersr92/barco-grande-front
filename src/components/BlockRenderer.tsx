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
import SectionHeading, {
  type SectionHeadingProps,
} from "@/components/sections/SectionHeading";
import ProductLinks, { type QuickLinkItem } from "@/components/sections/ProductLinks";
import ChannelsConverter, {
  type ChannelsConverterProps,
} from "@/components/sections/ChannelsConverter";
import FeatureBanner, {
  type FeatureBannerProps,
} from "@/components/sections/FeatureBanner";

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
          case "sections.section-heading":
            return (
              <SectionHeading key={key} {...(section as unknown as SectionHeadingProps)} />
            );
          case "sections.product-links":
            return (
              <ProductLinks key={key} items={(section.items as QuickLinkItem[]) ?? []} />
            );
          case "sections.channels-converter":
            return (
              <ChannelsConverter
                key={key}
                {...(section as unknown as ChannelsConverterProps)}
              />
            );
          case "sections.feature-banner":
            return (
              <FeatureBanner key={key} {...(section as unknown as FeatureBannerProps)} />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
