import type { Metadata } from "next";
import { getContactPage } from "@/frontend/content";
import { site } from "@/frontend/content/site";
import { ContactForm } from "@/frontend/components/forms/ContactForm";
import { Reveal } from "@/frontend/components/ui/Reveal";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AyurshuddhiWellness in Greater Noida: ask about therapies, book a consultation or send us a message. Open Monday to Sunday.",
  alternates: { canonical: "/contact" },
};

/** Contact page (no Figma screen): intro, clinic details and a message form in the booking-panel style. */
export default async function ContactPage() {
  const contactPage = await getContactPage();
  return (
    <>
      <section className="bg-green px-5 pb-12 pt-[160px] text-center text-cream lg:pb-16 lg:pt-[228px]">
        <div className="mx-auto flex max-w-[860px] flex-col items-center gap-5 lg:gap-6">
          <p className="text-body-l text-accent-soft">{contactPage.eyebrow}</p>
          <h1 className="text-balance text-title">{contactPage.title}</h1>
          <p className="max-w-[463px] text-body">{contactPage.intro}</p>
        </div>
      </section>

      <section className="relative px-5 pb-16 pt-12 lg:px-8 lg:pb-[120px] lg:pt-[120px]">
        <MediaPlaceholder label={contactPage.photoLabel} decorative className="absolute inset-0" />
        <div className="relative mx-auto flex max-w-[1376px] flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <Reveal className="flex flex-col gap-8 rounded-sm bg-panel px-4 py-6 text-cream backdrop-blur-[6px] lg:w-[520px] lg:shrink-0 lg:px-8 lg:py-10">
            <h2 className="text-h5 lg:text-h2">Visit or call us</h2>
            <address className="flex flex-col gap-6 not-italic">
              <div className="flex flex-col gap-1">
                <p className="text-card text-accent-soft">Address</p>
                <p className="text-body">{site.address.line}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-card text-accent-soft">Phone</p>
                <a href={site.phoneHref} className="link-underline w-fit text-body">
                  {site.phone}
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-card text-accent-soft">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline w-fit break-all text-body"
                >
                  {site.email}
                </a>
              </div>
            </address>
            <div className="flex flex-col gap-1">
              <p className="text-card text-accent-soft">Hours</p>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-body">
                {site.hours.map((row) => (
                  <div key={row.label} className="contents">
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal className="flex flex-1 flex-col gap-4 rounded-sm bg-panel px-4 py-6 backdrop-blur-[6px] lg:gap-6 lg:px-8 lg:py-10">
            <h2 className="text-h5 text-cream lg:text-h2">Send us a message</h2>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
