import type { Metadata } from "next";
import { AuthSwitch } from "@/frontend/components/forms/AuthSwitch";
import { SignInForm } from "@/frontend/components/forms/SignInForm";
import { AccountShell } from "@/frontend/components/layout/AccountShell";
import { GlassCard } from "@/frontend/components/ui/GlassCard";
import { getSignInPage } from "@/frontend/content";

export const metadata: Metadata = {
  title: "Log In",
  description:
    "Log in to your AyurshuddhiWellness account to see your upcoming consultations and manage your bookings.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

/** Sign In (Figma: Sign In, desktop 218:1639 / mobile 219:1581): one glass card centred over the photo. */
export default async function LoginPage() {
  const page = await getSignInPage();
  return (
    <AccountShell className="items-center px-6 py-16 lg:py-40">
      <GlassCard
        as="section"
        aria-labelledby="signin-heading"
        className="flex w-full max-w-120 flex-col gap-6 px-6 py-10 text-cream"
      >
        <p className="text-body text-accent-soft lg:text-body-l">{page.eyebrow}</p>
        <h1 id="signin-heading" className="text-h4 lg:text-h2">
          {page.title}
        </h1>
        <p className="text-body">{page.intro}</p>
        <SignInForm copy={page.form} />
        <AuthSwitch
          prompt={page.switchPrompt.prompt}
          href={page.switchPrompt.href}
          label={page.switchPrompt.label}
        />
      </GlassCard>
    </AccountShell>
  );
}
