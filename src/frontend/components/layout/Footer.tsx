import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { footer, type FooterGroup } from "@/frontend/content/footer";
import { site } from "@/frontend/content/site";
import { cn } from "@/frontend/lib/cn";
import { cormorant, inter } from "@/frontend/lib/fonts";
import { ChipsYieldFallback } from "@/frontend/components/layout/ChipsYieldFallback";

/**
 * A footer link. The link box is the 44×44px tap target; the hover underline (motion.css
 * "Footer links") is drawn under the text only. Site paths use next/link, tel: and mailto: an <a>.
 */
function FooterLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const classes = cn(
    "footer-link inline-flex min-h-11 min-w-11 items-center hover:text-cream focus-visible:text-cream",
    className,
  );
  const text = <span className="footer-link__text">{children}</span>;
  return href.startsWith("/") ? (
    <Link href={href} className={classes}>
      {text}
    </Link>
  ) : (
    <a href={href} className={classes}>
      {text}
    </a>
  );
}

/** Link text: 16px on the narrowest phones so two groups fit side by side, 17px from sm up. */
const LINK_TEXT = "text-body text-cream/80 sm:text-footer-link";

function GroupHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-2 text-eyebrow uppercase tracking-label text-footer-heading">{children}</h2>
  );
}

function LinkGroup({ heading, links }: FooterGroup) {
  return (
    <div className="grow md:grow-0">
      <GroupHeading>{heading}</GroupHeading>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink href={link.href} className={LINK_TEXT}>
              {link.label}
            </FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VisitGroup() {
  // "A-228 Sector 36" on the first line, "Greater Noida, UP 201310" on the second.
  const [street, ...locality] = site.address.line.split(", ");
  return (
    <div className="basis-full md:basis-auto">
      <GroupHeading>{footer.contactHeading}</GroupHeading>
      <address className="flex flex-col items-start not-italic">
        <p className={cn("py-2", LINK_TEXT)}>
          {street}
          <br />
          {locality.join(", ")}
        </p>
        <FooterLink href={site.phoneHref} className={LINK_TEXT}>
          {site.phone}
        </FooterLink>
        <FooterLink href={`mailto:${site.email}`} className={cn(LINK_TEXT, "wrap-anywhere")}>
          {site.email}
        </FooterLink>
      </address>
    </div>
  );
}

/** The stacked logo: drop mark, wordmark, and "WELLNESS" in wide-tracked capitals. */
function StackedLogo() {
  return (
    <div className="flex flex-col items-center text-center">
      <Image
        src="/brand/ayurshuddhi-mark-cream.svg"
        alt=""
        width={120}
        height={120}
        unoptimized
        className="size-16 md:size-22"
      />
      <p className="footer-wordmark mt-2 text-wordmark">{site.shortName}</p>
      <p className="footer-wordmark-sub mt-2 text-eyebrow uppercase tracking-wordmark text-cream/80 md:mt-3">
        {footer.wordmarkSub}
      </p>
    </div>
  );
}

/**
 * Site footer. Top to bottom: the hills photo (3:1, 320px to 640px tall), where the fixed nav
 * chips sit; the link groups with the stacked logo; and the copyright and legal links.
 * Side edges follow --nav-inset, so they line up with the outer edges of the two nav chips.
 * Once the content below the photo would reach the chips, they ride up with the photo
 * (motion.css "Nav chips yield to the footer").
 */
export function Footer() {
  return (
    <footer className={cn(cormorant.variable, inter.variable, "site-footer bg-footer text-cream")}>
      <div className="footer-band @container relative aspect-3/1 min-h-80 w-full">
        <Image
          src={footer.imageSrc}
          alt=""
          fill
          loading="lazy"
          sizes="(max-width: 640px) 640px, 100vw"
          className="footer-photo object-cover"
        />
      </div>

      <div className="footer-body px-(--nav-inset)">
        {/* The logo sits right of the links when both fit on one row, otherwise below them. */}
        <div className="flex flex-col items-start gap-14 pt-6 pb-16 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-16 md:pt-8 md:pb-20">
          <nav
            aria-label="Footer"
            className="flex w-full flex-wrap gap-x-5 gap-y-10 md:w-auto md:gap-x-16 lg:gap-x-24"
          >
            {footer.groups.map((group) => (
              <LinkGroup key={group.heading} {...group} />
            ))}
            <VisitGroup />
          </nav>
          <StackedLogo />
        </div>

        <div className="flex flex-col gap-1 border-t border-cream/15 pt-5 pb-6 md:flex-row md:items-center md:justify-between md:gap-8 md:py-4">
          <p className="text-small text-footer-meta">
            {footer.copyright(new Date().getFullYear())}
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6">
              {footer.legal.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} className="text-small text-footer-meta">
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <ChipsYieldFallback />
    </footer>
  );
}
