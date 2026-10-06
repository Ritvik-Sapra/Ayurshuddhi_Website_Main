import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceDetail } from "@/frontend/content";
import { bookingImageSrc, serviceSlugs } from "@/frontend/content/services";
import { BookingSection } from "@/frontend/components/sections/service/BookingSection";
import { ServiceFaq } from "@/frontend/components/sections/service/ServiceFaq";
import { ServiceIntro } from "@/frontend/components/sections/service/ServiceIntro";

// Only the services in content/services.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((service) => ({ service }));
}

export async function generateMetadata({ params }: PageProps<"/[service]">): Promise<Metadata> {
  const { service } = await params;
  const detail = await getServiceDetail(service);
  if (!detail) return {};
  return {
    title: detail.title,
    description: detail.metaDescription,
    alternates: { canonical: `/${detail.slug}` },
  };
}

/** Figma: Service (Ayurveda / Panchakarma). One template driven by content/services.ts. */
export default async function ServicePage({ params }: PageProps<"/[service]">) {
  const { service } = await params;
  const detail = await getServiceDetail(service);
  if (!detail) notFound();

  return (
    <>
      <ServiceIntro
        title={detail.title}
        intro={detail.intro}
        videoSrc={detail.videoSrc}
        videoLabel={`${detail.title} therapy in progress`}
      />
      <ServiceFaq items={detail.faq} />
      <BookingSection
        service={detail.slug}
        imageLabel={`${detail.title} consultation room`}
        imageSrc={bookingImageSrc}
      />
    </>
  );
}
