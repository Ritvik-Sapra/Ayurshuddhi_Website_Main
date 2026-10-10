import Link from "next/link";
import { Button } from "@/frontend/components/ui/Button";
import { inlineActionClass } from "@/frontend/components/sections/profile/InlineAction";
import { ProfileCard } from "@/frontend/components/sections/profile/ProfileCard";
import type { ProfileCopy, ProfileData } from "@/frontend/content/profile";

type ProfileDetailsCardProps = {
  profile: ProfileData;
  copy: ProfileCopy["details"];
};

/** Figma: Your details. The member's contact details with Edit Details and Log out. */
export function ProfileDetailsCard({ profile, copy }: ProfileDetailsCardProps) {
  const fields = [
    { label: copy.labels.name, value: profile.name },
    { label: copy.labels.email, value: profile.email },
    { label: copy.labels.phone, value: profile.phone },
    { label: copy.labels.memberSince, value: profile.memberSince },
  ];
  return (
    <ProfileCard id="profile-details-heading" heading={copy.heading}>
      <dl className="flex flex-col gap-6">
        {fields.map((field) => (
          <div key={field.label} className="flex flex-col gap-1">
            <dt className="text-small">{field.label}</dt>
            <dd className="wrap-break-word text-body">{field.value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {/* TODO(backend): open the edit-details flow once accounts exist; no destination yet. */}
        <Button>{copy.editLabel}</Button>
        <Link href="/login" className={inlineActionClass}>
          {copy.logOutLabel}
        </Link>
      </div>
    </ProfileCard>
  );
}
