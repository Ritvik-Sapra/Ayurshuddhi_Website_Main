import type { Metadata } from "next";
import { getProfilePage } from "@/frontend/content";
import { mockProfile } from "@/frontend/content/profile";
import { ProfileContent } from "@/frontend/components/sections/profile/ProfileContent";
import { ProfileHero } from "@/frontend/components/sections/profile/ProfileHero";
import { MenuBotanicals } from "@/frontend/components/ui/MenuBotanicals";

export const metadata: Metadata = {
  title: "Your Profile",
  description:
    "Your AyurshuddhiWellness portal: upcoming consultations, past visits and your details in one place.",
  alternates: { canonical: "/profile" },
  robots: { index: false, follow: true },
};

/** Profile page (Figma: Profile, desktop and mobile). UI only: renders placeholder data until accounts exist. */
export default async function ProfilePage() {
  const profilePage = await getProfilePage();
  // TODO(backend): load the signed-in member here instead of `mockProfile`.
  const profile = mockProfile;
  return (
    <div className="relative isolate bg-green-dark">
      <MenuBotanicals />
      <ProfileHero
        eyebrow={profilePage.eyebrow}
        welcome={profilePage.welcome}
        name={profile.name}
        intro={profilePage.intro}
      />
      <ProfileContent profile={profile} copy={profilePage} />
    </div>
  );
}
