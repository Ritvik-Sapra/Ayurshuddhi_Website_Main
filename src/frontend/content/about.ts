export type Testimonial = { name: string; quote: string; rating: number };

/** Photo slots for the about gallery. TODO(media): add `src` once real photos are in /public/media. */
export type GalleryImage = { label: string; src?: string };

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
  gallery: [
    { label: "Clinic entrance with a wooden sign" },
    { label: "Herbal jars lined up on a shelf" },
    { label: "A treatment room with warm lighting" },
    { label: "Fresh medicinal plants in the garden" },
    { label: "Oil being warmed for a therapy" },
    { label: "A consultation table with a pulse chart" },
    { label: "Yoga mats laid out at sunrise" },
    { label: "Tea and herbs in the waiting area" },
    { label: "Sunlight across the meditation hall" },
    { label: "Hands grinding herbs with a mortar and pestle" },
  ] satisfies GalleryImage[],
  testimonials: [
    // TODO(copy): replace with real client names and reviews.
    {
      name: "Client Name",
      quote:
        "Client testimonial goes here — two to four lines about their experience with AyurshuddhiWellness.",
      rating: 5,
    },
    {
      name: "Client Name",
      quote:
        "Client testimonial goes here — two to four lines about their experience with AyurshuddhiWellness.",
      rating: 5,
    },
    {
      name: "Client Name",
      quote:
        "Client testimonial goes here — two to four lines about their experience with AyurshuddhiWellness.",
      rating: 5,
    },
  ] satisfies Testimonial[],
};

export type About = typeof about;
