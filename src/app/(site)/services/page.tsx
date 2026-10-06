import type { Metadata } from "next";
import { getServices } from "@/frontend/content";
import { ServicesGrid } from "@/frontend/components/sections/services/ServicesGrid";
import { ServicesIntro } from "@/frontend/components/sections/services/ServicesIntro";
import { ServicesStage } from "@/frontend/components/sections/services/ServicesStage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Nine practices drawn from Ayurveda and naturopathy: Panchakarma, pulse and tongue diagnosis, leech therapy, Agni Karma, yoga and stress management.",
  alternates: { canonical: "/services" },
};

/** Services overview (no Figma screen): a heading and a grid of ServiceCards, one per service page. */
export default async function ServicesPage() {
  const services = await getServices();
  return (
    <ServicesStage className="relative isolate overflow-clip bg-green px-5 pb-16 pt-[160px] text-cream lg:px-10 lg:pb-[120px] lg:pt-[228px]">
      <ServicesIntro
        title="Care for every layer of you."
        lede="Nine practices drawn from Ayurveda and naturopathy — chosen to meet you where you are."
      />
      <ServicesGrid services={services} />
    </ServicesStage>
  );
}
