import { BookingRow } from "@/frontend/components/cards/BookingRow";
import { InlineActionButton } from "@/frontend/components/sections/profile/InlineAction";
import { ProfileCard } from "@/frontend/components/sections/profile/ProfileCard";
import type { PastVisit, ProfileCopy } from "@/frontend/content/profile";

type PastVisitsProps = {
  visits: readonly PastVisit[];
  copy: ProfileCopy["past"];
};

/** Figma: Past visits. Completed visits with a View notes action. */
export function PastVisits({ visits, copy }: PastVisitsProps) {
  return (
    <ProfileCard id="profile-past-heading" heading={copy.heading}>
      {visits.length > 0 ? (
        <ul className="flex flex-col gap-6">
          {visits.map((visit) => (
            <BookingRow
              key={visit.id}
              title={visit.title}
              meta={`${visit.date} · ${copy.completedLabel}`}
              actions={
                /* TODO(backend): open the visit notes once they exist; no destination yet. */
                <InlineActionButton
                  aria-label={`${copy.viewNotesLabel}: ${visit.title}, ${visit.date}`}
                >
                  {copy.viewNotesLabel}
                </InlineActionButton>
              }
            />
          ))}
        </ul>
      ) : (
        <p className="text-body">{copy.emptyMessage}</p>
      )}
    </ProfileCard>
  );
}
