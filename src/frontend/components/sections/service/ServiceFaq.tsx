import type { FaqEntry } from "@/frontend/content/services";
import { Reveal } from "@/frontend/components/ui/Reveal";
import { Accordion } from "@/frontend/components/ui/Accordion";

/** Figma: FAQ. "How We Work With You." accordion; one item open at a time. */
export function ServiceFaq({ items }: { items: FaqEntry[] }) {
  return (
    <section
      aria-labelledby="how-we-work"
      className="flex flex-col gap-10 bg-white px-5 pb-16 pt-12 lg:gap-20 lg:px-10 lg:pb-[120px] lg:pt-20"
    >
      <Reveal>
        <h2 id="how-we-work" className="text-h1 text-green">
          How We Work With You.
        </h2>
      </Reveal>
      <Accordion items={items} />
    </section>
  );
}
