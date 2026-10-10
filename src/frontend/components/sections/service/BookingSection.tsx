import { BookingForm } from "@/frontend/components/forms/BookingForm";
import { Reveal } from "@/frontend/components/ui/Reveal";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";
import { ScrollToHash } from "@/frontend/components/ui/ScrollToHash";
import type { ServiceSlug } from "@/shared/constants";

type BookingSectionProps = {
  service: ServiceSlug;
  imageLabel: string;
  imageSrc?: string;
};

/** Figma: Booking. A frosted olive panel with the booking form over a full-bleed photo slot. */
export function BookingSection({ service, imageLabel, imageSrc }: BookingSectionProps) {
  return (
    <section
      id="book"
      aria-labelledby="book-heading"
      className="relative min-h-[824px] px-5 pb-6 pt-12 lg:min-h-[900px] lg:px-8 lg:pb-[136px] lg:pt-40"
    >
      <ScrollToHash id="book" />
      <MediaPlaceholder label={imageLabel} src={imageSrc} decorative className="absolute inset-0" />
      <Reveal className="relative flex w-full flex-col gap-4 rounded-sm bg-panel px-4 py-6 backdrop-blur-[6px] lg:w-[736px] lg:max-w-full lg:gap-6 lg:px-8 lg:py-10">
        <h2 id="book-heading" className="text-h5 text-cream lg:text-h2">
          Book a Consultation
        </h2>
        <p className="max-w-[495px] text-body text-cream">
          Share your name, contact details, preferred date and the service you&rsquo;re interested
          in, and we&rsquo;ll get back to you to schedule your consultation.
        </p>
        <BookingForm defaultService={service} className="lg:mt-0" />
      </Reveal>
    </section>
  );
}
