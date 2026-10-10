import type { Metadata } from "next";
import { AuthSwitch } from "@/frontend/components/forms/AuthSwitch";
import { SignUpForm } from "@/frontend/components/forms/SignUpForm";
import { AccountShell } from "@/frontend/components/layout/AccountShell";
import { SignUpBenefits } from "@/frontend/components/sections/account/SignUpBenefits";
import { GlassCard } from "@/frontend/components/ui/GlassCard";
import { getSignUpPage } from "@/frontend/content";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your AyurshuddhiWellness account to book and manage consultations, see your visits and keep your treatment plans in one place.",
  alternates: { canonical: "/signup" },
  robots: { index: false, follow: true },
};

/**
 * Sign Up (Figma: Sign Up, desktop and mobile). Form first in the reading order; on desktop the
 * benefits card sits to its left. UI only: no real account is created yet.
 */
export default async function SignUpPage() {
  const { photoLabel, benefits, form } = await getSignUpPage();
  return (
    <AccountShell
      imageLabel={photoLabel}
      className="gap-6 px-6 lg:flex-row lg:items-start lg:gap-6 lg:px-6 xl:gap-12"
    >
      <GlassCard
        as="section"
        aria-labelledby="signup-title"
        className="flex flex-col gap-6 px-6 py-10 lg:min-w-0 lg:flex-1"
      >
        <p className="text-body text-accent-soft lg:text-body-l">{form.eyebrow}</p>
        <h1 id="signup-title" className="text-h4 leading-11 text-cream xl:text-h2 xl:leading-14">
          {form.title}
        </h1>
        <SignUpForm content={form} />
        <AuthSwitch prompt={form.switch.prompt} href={form.switch.href} label={form.switch.label} />
      </GlassCard>

      <SignUpBenefits
        content={benefits}
        className="lg:order-first lg:w-80 lg:shrink-0 xl:w-130"
      />
    </AccountShell>
  );
}
