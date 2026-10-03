import type { Metadata } from "next";
import { getLegalDocument } from "@/frontend/content";
import { termsOfService } from "@/frontend/content/legal";
import { LegalPage } from "@/frontend/components/sections/legal/LegalPage";

export const metadata: Metadata = {
  title: termsOfService.title,
  description: termsOfService.description,
  alternates: { canonical: "/terms" },
};

export default async function TermsPage() {
  return <LegalPage document={await getLegalDocument("terms")} />;
}
