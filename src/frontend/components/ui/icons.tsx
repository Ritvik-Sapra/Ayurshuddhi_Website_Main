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

/** Figma: Icon/Arrow Tile (32, accent) and Icon/Arrow Tile Green (40, green). "cream" is a 32 tile with a green arrow. */
export function ArrowTile({
  tone = "accent",
  className,
  ...props
}: IconProps & { tone?: "accent" | "green" | "cream" }) {
  const size = tone === "green" ? 40 : 32;
  const offset = tone === "green" ? 4 : 0;
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
        className={{ accent: "fill-accent", green: "fill-green", cream: "fill-cream" }[tone]}
      />
      <path
        d={`M${9 + offset} ${23 + offset}L${23 + offset} ${9 + offset}M${23 + offset} ${19.5 + offset}V${9 + offset}H${12.5 + offset}`}
        className={tone === "cream" ? "stroke-green" : "stroke-cream"}
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

/** Figma: Check (20, peach ring with a tick), used for the benefit lists. */
export function CheckCircleIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={20}
      height={20}
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path
        d="M10 19.25C15.1086 19.25 19.25 15.1086 19.25 10C19.25 4.89137 15.1086 0.75 10 0.75C4.89137 0.75 0.75 4.89137 0.75 10C0.75 15.1086 4.89137 19.25 10 19.25Z"
        className="stroke-accent-soft"
        strokeWidth={1.2}
      />
      <path
        d="M6 10.2L8.6 12.8L14 7.5"
        className="stroke-accent-soft"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const lineIcon = {
  viewBox: "0 0 28 28",
  width: 28,
  height: 28,
  fill: "none",
  "aria-hidden": true,
} as const;
const lineStroke = {
  className: "stroke-green",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Figma: Practitioner > Credential icon (mountains): training under Himalayan Gurus. */
export function MountainIcon({ className, ...props }: IconProps) {
  return (
    <svg {...lineIcon} className={cn("shrink-0", className)} {...props}>
      <path d="M3 22L10.5 9L15 16.5L18 12L25 22H3Z" {...lineStroke} />
    </svg>
  );
}

/** Figma: Practitioner > Credential icon (scroll): the Master's degree. */
export function ScrollIcon({ className, ...props }: IconProps) {
  return (
    <svg {...lineIcon} className={cn("shrink-0", className)} {...props}>
      <path d="M8 4H20C21.1 4 22 4.9 22 6V19.5C22 21.4 20.4 23 18.5 23H8" {...lineStroke} />
      <path d="M8 4C6.3 4 5 5.3 5 7V21C5 22.1 5.9 23 7 23C8.1 23 9 22.1 9 21V7" {...lineStroke} />
      <path d="M12 9H18M12 13H18" {...lineStroke} />
    </svg>
  );
}

/** Figma: Practitioner > Credential icon (leaf): a decade treating root causes. */
export function LeafIcon({ className, ...props }: IconProps) {
  return (
    <svg {...lineIcon} className={cn("shrink-0", className)} {...props}>
      <path d="M5 23C5 12 11 5 24 4C24 17 17 23 5 23Z" {...lineStroke} />
      <path d="M5 23L16 12" {...lineStroke} />
    </svg>
  );
}
