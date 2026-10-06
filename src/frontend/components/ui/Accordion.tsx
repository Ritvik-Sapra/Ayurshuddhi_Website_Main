"use client";

import { useId, useState } from "react";
import { cn } from "@/frontend/lib/cn";
import { ChevronTile } from "@/frontend/components/ui/icons";
import type { FaqEntry } from "@/frontend/content/services";

type AccordionProps = {
  items: FaqEntry[];
  className?: string;
};

/**
 * Figma: FAQ/Item. One panel open at a time, first open by default. Panels slide open/closed together (see .faq-panel).
 * Each header is a real button with aria-expanded; panels are labelled regions.
 */
export function Accordion({ items, className }: AccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className={cn("flex flex-col gap-6 lg:gap-8", className)}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const buttonId = `${baseId}-btn-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        const number = String(index + 1).padStart(2, "0");
        return (
          <li
            key={item.question}
            className={cn(
              "faq-item flex flex-col rounded-sm",
              open ? "bg-green p-4 text-cream" : "p-0 text-green",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className={cn(
                  "group/faq relative flex w-full items-center gap-4 text-left text-faq",
                  // 44px+ hit area without moving the Figma layout.
                  "after:absolute after:-inset-y-2 after:inset-x-0 after:content-['']",
                )}
              >
                <span className="shrink-0">{number}.</span>
                <span className="min-w-0 flex-1 text-center transition-transform duration-150 group-hover/faq:translate-x-0.5 motion-reduce:transform-none">
                  {item.question}
                </span>
                <ChevronTile direction={open ? "up" : "down"} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              data-open={open}
              inert={!open}
              className="faq-panel"
            >
              <div>
                <p className="faq-answer mx-auto max-w-[318px] pt-5 text-center text-body">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
