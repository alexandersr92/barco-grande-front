"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/strapi";

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
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                aria-hidden
                className={`shrink-0 text-primary transition-transform ${
                  isOpen ? "rotate-90" : ""
                }`}
              >
                <circle cx="10.5" cy="10.5" r="9.5" stroke="currentColor" strokeWidth="1.4" />
                <path
                  d="M8.5 6.8 12.2 10.5 8.5 14.2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isOpen && faq.answer && (
              <p className="pb-5 pr-10 text-[17px] leading-7 text-muted">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
