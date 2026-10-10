export type Testimonial = { name: string; quote: string; rating: number; tag: string };

/** Photo slots for the about and practitioner galleries. `src` is optional until a photo is set. */
export type GalleryImage = { label: string; src?: string };

/** A credential line under the practitioner's bio; `icon` picks the line icon. */
export type PractitionerCredential = { icon: "mountain" | "scroll" | "leaf"; text: string };

/** A captioned photo in the practitioner photo strip. */
export type PractitionerPhoto = { label: string; caption: string; src: string };

const GALLERY_BASE =
  "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/images/about_us-page-images/about_us%20";

/** The twelve gallery photos on the R2 bucket, by number. */
const galleryPhotos: Record<number, GalleryImage> = {
  1: {
    label: "The practitioner in consultation with an elderly woman",
    src: `${GALLERY_BASE}1.jpeg`,
  },
  2: {
    label: "The practitioner treating a patient lying on a massage table",
    src: `${GALLERY_BASE}2.jpeg`,
  },
  3: { label: "The practitioner reading a patient's pulse", src: `${GALLERY_BASE}3.jpeg` },
  4: {
    label: "The practitioner checking a woman's pulse with a family member beside her",
    src: `${GALLERY_BASE}4.jpeg`,
  },
  5: { label: "The practitioner taking notes during a consultation", src: `${GALLERY_BASE}5.jpeg` },
  6: {
    label: "The practitioner treating a patient on a massage table in the clinic",
    src: `${GALLERY_BASE}6.jpeg`,
  },
  10: {
    label: "The practitioner consulting a mother and her young son",
    src: `${GALLERY_BASE}10.jpeg`,
  },
  11: { label: "The practitioner showing a laptop to a patient", src: `${GALLERY_BASE}11.jpeg` },
  13: {
    label: "The practitioner in consultation with a woman in a white shawl",
    src: `${GALLERY_BASE}13.jpeg`,
  },
  14: {
    label: "The practitioner taking notes while an elderly woman looks on",
    src: `${GALLERY_BASE}14.jpeg`,
  },
  15: {
    label: "The practitioner holding a patient's wrist to read her pulse",
    src: `${GALLERY_BASE}15.jpeg`,
  },
  16: {
    label: "The practitioner writing notes beside an elderly woman in a headscarf",
    src: `${GALLERY_BASE}16.jpeg`,
  },
};

/** Photos in the order the gallery frames list them: three desktop columns of four, top to bottom. */
const galleryDesktopOrder = [2, 11, 4, 13, 14, 15, 5, 10, 3, 1, 6, 16];
/** Six of the twelve, in the order of the mobile scroll stack. */
const galleryMobileOrder = [16, 3, 2, 5, 11, 14];

export const about = {
  story: {
    headline: "Wisdom Passed Down. Wellness Made Personal.",
    intro:
      "AyurshuddhiWellness was founded on the belief that classical Ayurvedic practice, delivered with care and precision, can transform modern wellbeing.",
    eyebrow: "Our story",
    imageLabel: "Herbs and a clay bowl on a weathered bench in a sunlit garden",
    imageSrc:
      "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/images/about_us-page-images/about-intro-garden.webp",
    blocks: [
      {
        title: "The Root Cause",
        text: "Every disease has a reason. We find it before we treat it.",
      },
      { title: "We Listen to Your Body", text: "Symptoms are the body's last resort." },
      {
        title: "A Personalised Treatment Plan",
        text: 'There is no "one-size-fits-all" in wellness.',
      },
    ],
  },
  practitioner: {
    eyebrow: "Our Practitioner",
    name: "Acharya Abbhiraath Singh",
    title: "Nadi Vaidya & Ayurvedacharya",
    bio: "Trained under Himalayan Gurus in pulse diagnosis, with a Master's in Yogic Science and over a decade treating root causes across body, mind and spirit.",
    credentials: [
      { icon: "mountain", text: "Trained under Himalayan Gurus" },
      { icon: "scroll", text: "Master's in Yogic Science" },
      { icon: "leaf", text: "Over a decade treating root causes" },
    ] satisfies PractitionerCredential[],
    portrait: {
      label: "The practitioner seated on a sofa working on a laptop",
      src: `${GALLERY_BASE}9.JPG`,
    },
    strip: [
      {
        label: "The practitioner receiving a bouquet of red roses from a visitor",
        caption: "Radio interview",
        src: `${GALLERY_BASE}7.JPG`,
      },
      {
        label: "A guest and the practitioner writing notes at a desk",
        caption: "Community event",
        src: `${GALLERY_BASE}8.JPG`,
      },
      {
        label: "The practitioner with two guests in a radio studio",
        caption: "With a mentor",
        src: `${GALLERY_BASE}12.JPG`,
      },
    ] satisfies PractitionerPhoto[],
  },
  gallery: {
    desktop: galleryDesktopOrder.map((n) => galleryPhotos[n]),
    mobile: galleryMobileOrder.map((n) => galleryPhotos[n]),
  },
  testimonials: [
    // TODO(copy): sample names and reviews. Replace with real, consented client testimonials before launch.
    {
      name: "Priya Sharma",
      quote:
        "I had struggled with digestion and low energy for years. After my pulse reading, Acharya ji explained exactly why, and within two months my routine and my health felt completely different.",
      rating: 5,
      tag: "Pulse Diagnosis",
    },
    {
      name: "Rajesh Verma",
      quote:
        "The Panchakarma programme was unhurried and deeply thoughtful. Every step was explained, and I left feeling lighter, calmer and far more in tune with my body.",
      rating: 5,
      tag: "Panchakarma",
    },
    {
      name: "Anjali Mehta",
      quote:
        "What I valued most was being listened to. The plan was built around me, my diet, my sleep and my stress, and not handed over as a generic prescription.",
      rating: 5,
      tag: "Personalised Plan",
    },
    {
      name: "Neha Kapoor",
      quote:
        "The yoga and pranayama sessions gave me tools I use every morning. My sleep has settled, my mind is quieter, and I finally understand how my daily habits shape how I feel.",
      rating: 5,
      tag: "Yoga & Meditation",
    },
    {
      name: "Sandeep Arora",
      quote:
        "I came in overwhelmed and worn down. The care, the patience and the simple, practical guidance helped me manage stress without ever feeling rushed or judged.",
      rating: 5,
      tag: "Stress Management",
    },
  ] satisfies Testimonial[],
  testimonialsIntro: { eyebrow: "Stories of healing", title: "In their words" },
};

export type About = typeof about;
