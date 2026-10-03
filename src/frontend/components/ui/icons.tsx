import type { SVGProps } from "react";
import { cn } from "@/frontend/lib/cn";

type IconProps = SVGProps<SVGSVGElement>;

/** Figma: Media/Placeholder > Image Icon (64x52). */
export function ImageIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 52"
      width={64}
      height={52}
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0 opacity-55", className)}
      {...props}
    >
      <path
        d="M56 2H8C4.68629 2 2 4.68629 2 8V44C2 47.3137 4.68629 50 8 50H56C59.3137 50 62 47.3137 62 44V8C62 4.68629 59.3137 2 56 2Z"
        className="stroke-cream"
        strokeWidth={2.5}
      />
      <path
        d="M45 21C47.7614 21 50 18.7614 50 16C50 13.2386 47.7614 11 45 11C42.2386 11 40 13.2386 40 16C40 18.7614 42.2386 21 45 21Z"
        className="fill-cream"
      />
      <path d="M4.5 47.5L22 26L33 38L41 30L59.5 47.5H4.5Z" className="fill-cream" />
    </svg>
  );
}

/** Figma: Icon/Arrow Tile (32, accent) and Icon/Arrow Tile Green (40, green). */
export function ArrowTile({
  tone = "accent",
  className,
  ...props
}: IconProps & { tone?: "accent" | "green" }) {
  const size = tone === "accent" ? 32 : 40;
  const offset = tone === "accent" ? 0 : 4;
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <rect
        width={size}
        height={size}
        rx={4}
        className={tone === "accent" ? "fill-accent" : "fill-green"}
      />
      <path
        d={`M${9 + offset} ${23 + offset}L${23 + offset} ${9 + offset}M${23 + offset} ${19.5 + offset}V${9 + offset}H${12.5 + offset}`}
        className="stroke-cream"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma: Icon/Chevron Tile. Closed = filled green tile with a down chevron, open = outlined tile with an up chevron. */
export function ChevronTile({
  direction,
  className,
  ...props
}: IconProps & { direction: "down" | "up" }) {
  return (
    <svg
      viewBox="0 0 36 28"
      width={36}
      height={28}
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      {direction === "down" ? (
        <rect width={36} height={28} rx={4} className="fill-green" />
      ) : (
        <rect x={0.5} y={0.5} width={35} height={27} rx={3.5} className="stroke-cream" />
      )}
      <path
        d={direction === "down" ? "M10 10L18 18L26 10" : "M10 18L18 10L26 18"}
        className="stroke-cream"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma: Nav/Menu Button, Closed state. */
export function MenuLinesIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 72 48"
      width={72}
      height={48}
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M31 15H46M26 24H46M36 33H46"
        className="stroke-cream"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma: Nav/Menu Button, Open state. */
export function CloseIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 72 48"
      width={72}
      height={48}
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M27 15L45 33M45 15L27 33"
        className="stroke-cream"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
