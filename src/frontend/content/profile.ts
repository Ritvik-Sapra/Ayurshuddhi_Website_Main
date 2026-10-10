export const profilePage = {
  eyebrow: "User Portal",
  welcome: "Welcome back,",
  intro: "Your consultations, treatment plans and details, all in one place.",
  details: {
    heading: "Your details",
    labels: {
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      memberSince: "Member since",
    },
    editLabel: "Edit Details",
    logOutLabel: "Log out",
  },
  upcoming: {
    heading: "Upcoming consultations",
    rescheduleLabel: "Reschedule",
    bookLabel: "Book a Consultation",
    // TODO(copy): shown when there are no upcoming bookings
    emptyMessage: "You have no upcoming consultations.",
  },
  past: {
    heading: "Past visits",
    completedLabel: "Completed",
    viewNotesLabel: "View notes",
    // TODO(copy): shown when there are no past visits
    emptyMessage: "Your completed visits will appear here.",
  },
  statusLabels: {
    confirmed: "Confirmed",
    pending: "Pending",
  },
} as const;

export type ProfileCopy = typeof profilePage;

export type BookingStatus = keyof typeof profilePage.statusLabels;

export type UpcomingBooking = {
  id: string;
  title: string;
  /** Display-ready, e.g. "15 Oct 2026". */
  date: string;
  /** Display-ready, e.g. "11:00 AM". */
  time: string;
  location: string;
  status: BookingStatus;
};

export type PastVisit = {
  id: string;
  title: string;
  /** Display-ready, e.g. "12 Sep 2026". */
  date: string;
};

export type ProfileData = {
  name: string;
  email: string;
  phone: string;
  /** Display-ready month and year, e.g. "June 2025". */
  memberSince: string;
  upcoming: readonly UpcomingBooking[];
  past: readonly PastVisit[];
};

/**
 * PLACEHOLDER DATA. Not a real user: there is no sign-in or account backend yet, so the profile
 * page renders this fixed record. Values are made up for layout and review purposes only.
 * TODO(backend): replace with the signed-in member's record (profile + bookings) from the
 * backend once auth exists, and redirect to /login when there is no session.
 */
export const mockProfile: ProfileData = {
  name: "Priya Sharma",
  email: "priya.sharma@example.com",
  phone: "+91 98765 43210",
  memberSince: "June 2025",
  upcoming: [
    {
      id: "upcoming-1",
      title: "Ayurveda Consultation",
      date: "15 Oct 2026",
      time: "11:00 AM",
      location: "In clinic",
      status: "confirmed",
    },
    {
      id: "upcoming-2",
      title: "Panchakarma — Session 1",
      date: "28 Oct 2026",
      time: "4:30 PM",
      location: "In clinic",
      status: "pending",
    },
  ],
  past: [
    {
      id: "past-1",
      title: "Pulse Diagnosis (Nadi Pariksha)",
      date: "12 Sep 2026",
    },
    {
      id: "past-2",
      title: "Ayurveda Consultation",
      date: "21 Aug 2026",
    },
  ],
};
