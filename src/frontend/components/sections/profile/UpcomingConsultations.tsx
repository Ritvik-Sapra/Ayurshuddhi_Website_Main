import { BookingRow } from "@/frontend/components/cards/BookingRow";
import { Button } from "@/frontend/components/ui/Button";
import { InlineActionButton } from "@/frontend/components/sections/profile/InlineAction";
import { ProfileCard } from "@/frontend/components/sections/profile/ProfileCard";
import { StatusPill } from "@/frontend/components/sections/profile/StatusPill";
import type { ProfileCopy, UpcomingBooking } from "@/frontend/content/profile";

type UpcomingConsultationsProps = {
  bookings: readonly UpcomingBooking[];
  copy: ProfileCopy["upcoming"];
  statusLabels: ProfileCopy["statusLabels"];
};

/** Figma: Upcoming consultations. Booking rows with status and Reschedule, then Book a Consultation. */
export function UpcomingConsultations({
  bookings,
  copy,
  statusLabels,
}: UpcomingConsultationsProps) {
  return (
    <ProfileCard id="profile-upcoming-heading" heading={copy.heading}>
      {bookings.length > 0 ? (
        <ul className="flex flex-col gap-6">
          {bookings.map((booking) => (
            <BookingRow
              key={booking.id}
              title={booking.title}
              meta={`${booking.date} · ${booking.time} · ${booking.location}`}
              actions={
                <>
                  <StatusPill label={statusLabels[booking.status]} />
                  {/* TODO(backend): open the reschedule flow for this booking; no destination yet. */}
                  <InlineActionButton
                    aria-label={`${copy.rescheduleLabel} ${booking.title}, ${booking.date}`}
                  >
                    {copy.rescheduleLabel}
                  </InlineActionButton>
                </>
              }
            />
          ))}
        </ul>
      ) : (
        <p className="text-body">{copy.emptyMessage}</p>
      )}
      <Button href="/ayurveda#book" className="self-start">
        {copy.bookLabel}
      </Button>
    </ProfileCard>
  );
}
