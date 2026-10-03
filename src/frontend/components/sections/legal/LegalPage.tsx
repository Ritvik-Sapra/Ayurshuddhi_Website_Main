import type { LegalDocument } from "@/frontend/content/legal";

/** Figma: Legal (Privacy / Terms). Title and last-updated date on the left, sections on the right (desktop). */
export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <section className="bg-green pb-20 pt-[144px] text-cream lg:pb-[120px] lg:pt-[196px]">
      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:pl-10 lg:pr-[55px]">
        <header className="flex flex-col gap-3 px-5 lg:gap-6 lg:px-0">
          <h1 className="text-h1">{document.title}</h1>
          <div className="flex flex-col gap-2">
            <p className="text-card text-accent-soft">Last Updated</p>
            <time dateTime={document.lastUpdated.iso} className="text-body">
              {document.lastUpdated.text}
            </time>
          </div>
        </header>

        <div className="flex flex-col gap-8 px-5 lg:mt-[197px] lg:w-[544px] lg:shrink-0 lg:gap-10 lg:px-0">
          {document.sections.map((section) => (
            <section key={section.title} className="flex flex-col gap-4 lg:gap-5">
              <h2 className="text-h4 text-white">{section.title}</h2>
              <p className="text-body">{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
