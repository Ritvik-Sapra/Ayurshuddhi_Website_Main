import type { Metadata } from "next";
import { getServices } from "@/frontend/content";
import { ServiceCard } from "@/frontend/components/cards/ServiceCard";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Nine practices drawn from Ayurveda and naturopathy: Panchakarma, pulse and tongue diagnosis, leech therapy, Agni Karma, yoga and stress management.",
  alternates: { canonical: "/services" },
};

/** Services overview (no Figma screen): a grid of ServiceCards. Only Ayurveda and Panchakarma have pages so far. */
export default async function ServicesPage() {
  const services = await getServices();
  return (
    <section className="bg-green px-5 pb-16 pt-[160px] text-cream lg:px-10 lg:pb-[120px] lg:pt-[228px]">
      <div className="mx-auto flex max-w-[860px] flex-col items-center gap-5 text-center lg:gap-6">
        <h1 className="text-balance text-title">Care for every layer of you.</h1>
        <p className="max-w-[463px] text-body">
          Nine practices drawn from Ayurveda and naturopathy — chosen to meet you where you are.
        </p>
      </div>

      <ul className="mx-auto mt-12 grid max-w-[1360px] grid-cols-1 gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
        {services.map((service) => (
          <li key={service.title} className="flex">
            <ServiceCard
              title={service.title}
              summary={service.summary}
              href={service.href}
              imageLabel={service.imageLabel}
              className="w-full"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
