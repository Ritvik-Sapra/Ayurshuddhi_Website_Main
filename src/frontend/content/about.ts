export type Testimonial = { name: string; quote: string; rating: number };

/** Photo slots for the about and practitioner galleries. `src` is optional until a photo is set. */
export type GalleryImage = { label: string; src?: string };

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
  7: {
    label: "The practitioner receiving a bouquet of red roses from a visitor",
    src: `${GALLERY_BASE}7.JPG`,
  },
  8: { label: "A guest and the practitioner writing notes at a desk", src: `${GALLERY_BASE}8.JPG` },
  9: {
    label: "The practitioner seated on a sofa working on a laptop",
    src: `${GALLERY_BASE}9.JPG`,
  },
  10: {
    label: "The practitioner consulting a mother and her young son",
    src: `${GALLERY_BASE}10.jpeg`,
  },
  11: { label: "The practitioner showing a laptop to a patient", src: `${GALLERY_BASE}11.jpeg` },
  12: { label: "The practitioner with two guests in a radio studio", src: `${GALLERY_BASE}12.JPG` },
};

/** Photos in the order the gallery frames list them: three desktop columns of four, top to bottom. */
const galleryDesktopOrder = [2, 11, 4, 7, 8, 9, 5, 10, 3, 1, 6, 12];
/** Six of the twelve, in the order of the mobile scroll stack. */
const galleryMobileOrder = [12, 3, 2, 5, 11, 8];

export const about = {
  story: {
    headline: "Wisdom Passed Down. Wellness Made Personal.",
    intro:
      "AyurshuddhiWellness was founded on the belief that classical Ayurvedic practice, delivered with care and precision, can transform modern wellbeing.",
    imageLabel: "The AyurshuddhiWellness clinic surrounded by greenery",
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
    headingDesktop: "Our Practitioner",
    headingMobile: "Meet Our Practitioner",
    bio: "Acharya Abbhiraath Singh — Nadi Vaidya & Ayurvedacharya. Trained under Himalayan Gurus in pulse diagnosis, with a Master's in Yogic Science and over a decade treating root causes across body, mind and spirit.",
    photos: [
      { label: "Acharya Abbhiraath Singh reading a patient's pulse" },
      { label: "Herbal medicines being prepared in the clinic" },
      { label: "Acharya Abbhiraath Singh leading a yoga session" },
      { label: "A patient consultation in progress" },
    ] satisfies GalleryImage[],
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
    },
    {
      name: "Rajesh Verma",
      quote:
        "The Panchakarma programme was unhurried and deeply thoughtful. Every step was explained, and I left feeling lighter, calmer and far more in tune with my body.",
      rating: 5,
    },
    {
      name: "Anjali Mehta",
      quote:
        "What I valued most was being listened to. The plan was built around me, my diet, my sleep and my stress, and not handed over as a generic prescription.",
      rating: 5,
    },
  ] satisfies Testimonial[],
};

export type About = typeof about;
