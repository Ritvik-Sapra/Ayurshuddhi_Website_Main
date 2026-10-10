import { isServiceSlug } from "@/shared/constants";
import { about } from "@/frontend/content/about";
import { blogPosts } from "@/frontend/content/blogs";
import { contactPage } from "@/frontend/content/contact";
import { privacyPolicy, termsOfService } from "@/frontend/content/legal";
import { profilePage } from "@/frontend/content/profile";
import { serviceDetails, services } from "@/frontend/content/services";
import { signInPage } from "@/frontend/content/signin";
import { signUpPage } from "@/frontend/content/signup";

/**
 * Async content getters. Pages read content through these so a CMS or database can replace
 * the typed data files later without touching the pages. In development, set
 * SKELETON_DEMO_DELAY_MS (see .env.example) to slow them down and preview loading skeletons.
 */
// Vercel deployment 10 October 2026
export async function simulateLatency() {
  const ms = Number(process.env.SKELETON_DEMO_DELAY_MS);
  if (process.env.NODE_ENV === "development" && ms > 0) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export async function getServiceDetail(slug: string) {
  await simulateLatency();
  return isServiceSlug(slug) ? serviceDetails[slug] : undefined;
}

export async function getServices() {
  await simulateLatency();
  return services;
}

export async function getBlogPosts() {
  await simulateLatency();
  return blogPosts;
}

export async function getBlogPost(slug: string) {
  await simulateLatency();
  return blogPosts.find((post) => post.slug === slug && post.published);
}

export async function getAbout() {
  await simulateLatency();
  return about;
}

export async function getContactPage() {
  await simulateLatency();
  return contactPage;
}

export async function getLegalDocument(kind: "privacy" | "terms") {
  await simulateLatency();
  return kind === "privacy" ? privacyPolicy : termsOfService;
}

export async function getSignInPage() {
  await simulateLatency();
  return signInPage;
}

export async function getSignUpPage() {
  await simulateLatency();
  return signUpPage;
}

export async function getProfilePage() {
  await simulateLatency();
  return profilePage;
}
