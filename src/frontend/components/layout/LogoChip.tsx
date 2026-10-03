import Image from "next/image";
import Link from "next/link";
import { cn } from "@/frontend/lib/cn";
import { site } from "@/frontend/content/site";

/** Figma: Nav/Logo. A 72x48 glass chip holding the cropped 40x40 emblem. Links to the home page. */
export function LogoChip({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn(
        "nav-chip pointer-events-auto absolute left-[var(--nav-inset)] top-7",
        className,
      )}
    >
      <span className="relative block size-10 overflow-hidden">
        <Image
          src="/brand/ayurshuddhi-logo-emblem.svg"
          alt=""
          width={54}
          height={52}
          loading="eager"
          unoptimized
          className="absolute -left-[5.69px] -top-[0.13px] h-[52.19px] w-[53.75px] max-w-none"
        />
      </span>
    </Link>
  );
}
