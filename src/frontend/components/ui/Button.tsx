import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/frontend/lib/cn";
import { ArrowTile } from "@/frontend/components/ui/icons";

const base =
  "group/btn relative inline-flex items-center gap-4 rounded-sm bg-green py-1 pl-4 pr-1 text-small text-cream " +
  "transition-[background-color,transform] duration-150 ease-out hover:bg-green-dark active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-60 " +
  // Extends the hit area to 44px without changing the 40px Figma size.
  "after:absolute after:-inset-y-0.5 after:inset-x-0 after:content-['']";

const arrow =
  "transition-transform duration-150 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 motion-reduce:transform-none";

type ButtonProps = ComponentProps<"button"> & { href?: undefined };
type LinkButtonProps = ComponentProps<typeof Link> & { href: string };

/** Figma: Button/Primary. Renders a link when `href` is given, otherwise a button. */
export function Button(props: ButtonProps | LinkButtonProps) {
  if (props.href !== undefined) {
    const { className, children, ...rest } = props as LinkButtonProps;
    return (
      <Link className={cn(base, className)} {...rest}>
        {children}
        <ArrowTile className={arrow} />
      </Link>
    );
  }
  const { className, children, type = "button", ...rest } = props as ButtonProps;
  return (
    <button type={type} className={cn(base, className)} {...rest}>
      {children}
      <ArrowTile className={arrow} />
    </button>
  );
}
