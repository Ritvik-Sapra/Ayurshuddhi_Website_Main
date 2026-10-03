import Image from "next/image";
import Link from "next/link";
import { footerDestinations, footerPages, type NavLink } from "@/frontend/content/nav";
import { site } from "@/frontend/content/site";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";

function FooterLinks({ links, className }: { links: NavLink[]; className?: string }) {
  return (
    <ul className={`absolute top-16 flex flex-col gap-[25px] ${className ?? ""}`}>
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="link-underline block w-fit whitespace-nowrap text-body text-cream"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Figma: Footer (776px tall at both breakpoints). Two link columns, a photo slot,
 * the full logo and the copyright line, on a solid ink background.
 * TODO(copy): tagline and contact details are in content/site.ts; they are not shown here yet.
 */
export function Footer() {
  return (
    <footer className="relative h-[776px] w-full overflow-hidden bg-ink text-cream">
      <nav aria-label="Footer">
        <FooterLinks links={footerDestinations} className="left-[var(--gutter)]" />
        <FooterLinks links={footerPages} className="right-5 lg:right-auto lg:left-[327px]" />
      </nav>

      <MediaPlaceholder
        label="Footer photograph of the AyurshuddhiWellness clinic"
        decorative
        sizes="217px"
        className="absolute left-5 top-[267px] h-[145px] w-[217px] rounded-sm lg:left-auto lg:right-10 lg:top-[78px]"
      />

      <Image
        src="/brand/ayurshuddhi-logo-full.svg"
        alt={site.name}
        width={230}
        height={223}
        unoptimized
        className="absolute left-5 top-[512px] h-auto w-[190px] lg:left-10 lg:top-[473px] lg:w-[230px]"
      />

      <p className="absolute bottom-7 left-0 right-0 text-center text-[13px] leading-[1.5] text-white lg:bottom-6 lg:left-auto lg:right-14 lg:text-left lg:text-body">
        {site.copyright}
      </p>
    </footer>
  );
}
