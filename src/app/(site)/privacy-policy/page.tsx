import type { Metadata } from "next";
import { getLegalDocument } from "@/frontend/content";
import { privacyPolicy } from "@/frontend/content/legal";
import { LegalPage } from "@/frontend/components/sections/legal/LegalPage";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  alternates: { canonical: "/privacy-policy" },
};

export default async function PrivacyPolicyPage() {
  return <LegalPage document={await getLegalDocument("privacy")} />;
}
