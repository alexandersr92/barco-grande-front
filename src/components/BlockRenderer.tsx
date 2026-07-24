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
import RichText, { type RichTextProps } from "@/components/sections/RichText";
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
import MissionVision, {
  type MissionVisionProps,
} from "@/components/sections/MissionVision";
import ValuesGrid, { type ValuesGridProps } from "@/components/sections/ValuesGrid";
import Leaders, { type LeadersProps } from "@/components/sections/Leaders";
import CardGrid, { type CardGridProps } from "@/components/sections/CardGrid";
import DocumentGroup, {
  type DocumentGroupProps,
} from "@/components/sections/DocumentGroup";
import PillNav, { type PillNavProps } from "@/components/sections/PillNav";
import IconBlock, { type IconBlockProps } from "@/components/sections/IconBlock";
import IconColumns, {
  type IconColumnsProps,
} from "@/components/sections/IconColumns";
import QuoteBanner, {
  type QuoteBannerProps,
} from "@/components/sections/QuoteBanner";
import SplitText, { type SplitTextProps } from "@/components/sections/SplitText";
import MediaText, { type MediaTextProps } from "@/components/sections/MediaText";
import RoleGrid, { type RoleGridProps } from "@/components/sections/RoleGrid";
import PhotoCta, { type PhotoCtaProps } from "@/components/sections/PhotoCta";

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
            return <RichText key={key} {...(section as unknown as RichTextProps)} />;
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
          case "sections.mission-vision":
            return (
              <MissionVision key={key} {...(section as unknown as MissionVisionProps)} />
            );
          case "sections.values-grid":
            return <ValuesGrid key={key} {...(section as unknown as ValuesGridProps)} />;
          case "sections.leaders":
            return <Leaders key={key} {...(section as unknown as LeadersProps)} />;
          case "sections.card-grid":
            return <CardGrid key={key} {...(section as unknown as CardGridProps)} />;
          case "sections.document-group":
            return (
              <DocumentGroup key={key} {...(section as unknown as DocumentGroupProps)} />
            );
          case "sections.pill-nav":
            return <PillNav key={key} {...(section as unknown as PillNavProps)} />;
          case "sections.icon-block":
            return <IconBlock key={key} {...(section as unknown as IconBlockProps)} />;
          case "sections.icon-columns":
            return (
              <IconColumns key={key} {...(section as unknown as IconColumnsProps)} />
            );
          case "sections.quote-banner":
            return (
              <QuoteBanner key={key} {...(section as unknown as QuoteBannerProps)} />
            );
          case "sections.split-text":
            return <SplitText key={key} {...(section as unknown as SplitTextProps)} />;
          case "sections.media-text":
            return <MediaText key={key} {...(section as unknown as MediaTextProps)} />;
          case "sections.role-grid":
            return <RoleGrid key={key} {...(section as unknown as RoleGridProps)} />;
          case "sections.photo-cta":
            return <PhotoCta key={key} {...(section as unknown as PhotoCtaProps)} />;
          default:
            return null;
        }
      })}
    </>
  );
}
