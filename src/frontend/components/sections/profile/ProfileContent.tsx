import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";
import { PastVisits } from "@/frontend/components/sections/profile/PastVisits";
import { ProfileDetailsCard } from "@/frontend/components/sections/profile/ProfileDetailsCard";
import { UpcomingConsultations } from "@/frontend/components/sections/profile/UpcomingConsultations";
import type { ProfileCopy, ProfileData } from "@/frontend/content/profile";

type ProfileContentProps = {
  profile: ProfileData;
  copy: ProfileCopy;
};

/**
 * Figma: Profile content. The background image slot with the cards over it: stacked on mobile
 * (details, upcoming, past), details on the left and bookings on the right from `lg`.
 */
export function ProfileContent({ profile, copy }: ProfileContentProps) {
  return (
    <section className="relative">
      <MediaPlaceholder label={copy.photoLabel} decorative className="absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1440px] gap-6 px-6 py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:items-start lg:gap-12 lg:py-30 xl:grid-cols-[32.5rem_minmax(0,1fr)]">
        <ProfileDetailsCard profile={profile} copy={copy.details} />
        <div className="flex flex-col gap-6 lg:gap-12">
          <UpcomingConsultations
            bookings={profile.upcoming}
            copy={copy.upcoming}
            statusLabels={copy.statusLabels}
          />
          <PastVisits visits={profile.past} copy={copy.past} />
        </div>
      </div>
    </section>
  );
}
