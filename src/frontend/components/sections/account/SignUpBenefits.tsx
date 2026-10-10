import { GlassCard } from "@/frontend/components/ui/GlassCard";
import { CheckCircleIcon } from "@/frontend/components/ui/icons";
import type { SignUpPageContent } from "@/frontend/content/signup";
import { cn } from "@/frontend/lib/cn";

type SignUpBenefitsProps = {
  content: SignUpPageContent["benefits"];
  /** Layout classes from the page (width, order). */
  className?: string;
};

/** Figma: Sign Up > "Why create an account" card. Eyebrow, heading and four check-icon benefits. */
export function SignUpBenefits({ content, className }: SignUpBenefitsProps) {
  return (
    <GlassCard
      as="aside"
      aria-labelledby="signup-benefits-title"
      className={cn("flex flex-col gap-6 px-6 py-10", className)}
    >
      <p className="text-body text-accent-soft lg:text-body-l">{content.eyebrow}</p>
      <h2 id="signup-benefits-title" className="text-h4 leading-11 text-cream xl:text-h2 xl:leading-14">
        {content.title}
      </h2>
      <ul className="flex flex-col gap-6">
        {content.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-body leading-snug text-cream">
            <CheckCircleIcon />
            <span className="min-w-0 flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
