import { cn } from "@/frontend/lib/cn";

/** Fan-shaped ginkgo leaf with its veins, drawn upright from its stem at (0, 0). */
function GinkgoLeaf({ className }: { className?: string }) {
  const veins = Array.from({ length: 11 }, (_, i) => -50 + i * 10);
  return (
    <svg
      viewBox="-70 -130 140 140"
      fill="none"
      aria-hidden="true"
      className={cn("stroke-cream", className)}
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0 L0 -26" />
      <path d="M0 -26 C-34 -52 -60 -80 -52 -112 Q-26 -124 0 -104 Q26 -124 52 -112 C60 -80 34 -52 0 -26Z" />
      {veins.map((x) => (
        <path key={x} d={`M0 -26 Q${x * 0.45} -66 ${x * 0.95} ${-108 + Math.abs(x) * 0.35}`} />
      ))}
    </svg>
  );
}

/** A bamboo stalk with nodes and a few leaves. */
function Bamboo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 520"
      fill="none"
      aria-hidden="true"
      className={cn("stroke-cream", className)}
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M52 0V520M68 0V520" />
      {[70, 190, 310, 430].map((y) => (
        <path key={y} d={`M50 ${y}Q60 ${y + 5} 70 ${y}`} />
      ))}
      {[
        { x: 68, y: 120, d: "M68 120Q96 112 116 88Q90 90 68 120Z" },
        { x: 68, y: 250, d: "M68 250Q98 246 118 222Q92 222 68 250Z" },
        { x: 52, y: 180, d: "M52 180Q26 176 6 152Q32 152 52 180Z" },
        { x: 52, y: 370, d: "M52 370Q24 366 4 342Q30 342 52 370Z" },
      ].map((leaf) => (
        <path key={leaf.d} d={leaf.d} />
      ))}
    </svg>
  );
}

/** Four-point sparkle. */
function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("fill-cream/20", className)}>
      <path d="M20 0C21.5 12 28 18.5 40 20C28 21.5 21.5 28 20 40C18.5 28 12 21.5 0 20C12 18.5 18.5 12 20 0Z" />
    </svg>
  );
}

/**
 * Decorative line art behind the menu links: ginkgo leaves, bamboo and a sparkle. Purely
 * ornamental, so it is aria-hidden and ignores the pointer.
 */
export function MenuBotanicals() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <GinkgoLeaf className="absolute -bottom-6 -left-4 w-56 -rotate-12 opacity-20 lg:w-80" />
      <GinkgoLeaf className="absolute bottom-24 left-24 hidden w-36 rotate-12 opacity-20 lg:block" />
      <GinkgoLeaf className="absolute -top-8 right-1/4 w-40 rotate-180 opacity-15 lg:w-60" />
      <Bamboo className="absolute -bottom-10 right-2 h-3/4 opacity-20" />
      <Bamboo className="absolute -bottom-10 right-16 hidden h-1/2 opacity-15 lg:block" />
      <Sparkle className="absolute bottom-12 right-8 size-8 lg:right-10 lg:size-10" />
    </div>
  );
}
