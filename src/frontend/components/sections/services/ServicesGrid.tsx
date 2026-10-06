import type { ServiceSummary } from "@/frontend/content/services";
import { ServiceCard } from "@/frontend/components/cards/ServiceCard";

/**
 * The 3x3 (2-up on tablet, stacked on mobile) grid of service cards. Rows share one height
 * (auto-rows-fr). Each item reveals as it scrolls into view: ServicesStage marks it
 * `data-revealed` and sets its stagger delay before hydration, hence suppressHydrationWarning.
 */
export function ServicesGrid({ services }: { services: ServiceSummary[] }) {
  return (
    <ul
      data-reveal-list
      className="mx-auto mt-12 grid max-w-[1360px] auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8"
    >
      {services.map((service) => (
        <li key={service.title} data-reveal className="flex" suppressHydrationWarning>
          <ServiceCard
            title={service.title}
            summary={service.summary}
            href={service.href}
            imageLabel={service.imageLabel}
            imageSrc={service.imageSrc}
            className="h-full w-full"
          />
        </li>
      ))}
    </ul>
  );
}
