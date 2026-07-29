"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/strapi";
import { CircleArrowIcon } from "@/components/icons";

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  if (!faqs || faqs.length === 0) return null;

  return (
    <div>
      {faqs.map((faq) => {
        const isOpen = open === faq.id;
        return (
          <div key={faq.id} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : faq.id)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-lg leading-[24.3px] text-secondary">
                {faq.question}
              </span>
              <CircleArrowIcon
                size={21}
                className={`shrink-0 text-primary transition-transform ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            </button>
            {isOpen && faq.answer && (
              <p className="whitespace-pre-line pb-5 pr-10 text-[17px] leading-7 text-muted">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
