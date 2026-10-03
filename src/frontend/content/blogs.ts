export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  /** Short summary used for meta descriptions. */
  excerpt: string;
  imageLabel: string;
  /** Only published posts have an article page; the rest show a "Coming soon" badge. */
  published: boolean;
  /** Shown on the article page: display text (Figma) plus ISO date for <time>. */
  date?: { text: string; iso: string };
  updated?: { text: string; iso: string };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "dinacharya-daily-routine",
    category: "Daily Rituals",
    title: "The Morning Ritual: How Dinacharya Transforms Your Day",
    excerpt:
      "How the Ayurvedic daily routine (Dinacharya) sets the rhythm for a balanced body, mind and digestion.",
    imageLabel: "A calm morning scene with warm water, a tongue scraper and a sunrise window",
    published: true,
    date: { text: "05/02/2025", iso: "2025-02-05" },
    updated: { text: "12 Aug 2025", iso: "2025-08-12" },
  },
  {
    slug: "ritucharya-seasonal-living",
    category: "Seasonal Rituals",
    title: "Ritucharya: Living in Step with the Seasons",
    excerpt: "Adjusting diet, routine and therapies to each of the six Ayurvedic seasons.",
    imageLabel: "A wooden table with seasonal fruits, herbs and flowers",
    published: false,
  },
  {
    slug: "ashwagandha-strength-calm",
    category: "Herbal Spotlight",
    title: "Ashwagandha: The Herb of Strength and Calm",
    excerpt: "What ashwagandha is traditionally used for, and how it is prescribed.",
    imageLabel: "Ashwagandha roots and powder in a small ceramic bowl",
    published: false,
  },
  {
    slug: "pranayama-everyday-calm",
    category: "Mindful Living",
    title: "Pranayama for Everyday Calm",
    excerpt: "Simple breathing practices to steady the mind through a busy day.",
    imageLabel: "A person practising alternate-nostril breathing on a yoga mat",
    published: false,
  },
  {
    slug: "panchakarma-what-to-expect",
    category: "Detox & Renewal",
    title: "Panchakarma: What to Expect",
    excerpt: "A step-by-step look at the preparation, therapies and recovery of Panchakarma.",
    imageLabel: "Warm medicated oil being poured in a treatment room",
    published: false,
  },
];

export const blogsIntro = {
  title: "Rooted in Tradition. Written for the Curious.",
  subtitle:
    "Explore ancient Ayurvedic wisdom through modern stories — seasonal rituals, herbal spotlights, and guides to mindful living.",
};

/** Placeholder body for the Dinacharya article (Figma copy). */
export const dinacharyaArticle = {
  standfirst:
    // TODO(copy): replace with the real article text.
    "Placeholder standfirst: how the Ayurvedic daily routine (Dinacharya) sets the rhythm for a balanced body, mind and digestion.",
  blocks: [
    {
      type: "image" as const,
      label: "Sunrise light over a quiet room with a glass of warm water",
      ratio: "533 / 355",
    },
    {
      type: "text" as const,
      text: "Placeholder paragraph. What Dinacharya is and why Ayurveda places the daily routine at the heart of health.",
    },
    {
      type: "text" as const,
      text: "Placeholder paragraph. Rising before sunrise (Brahma Muhurta) and the first rituals — tongue scraping, oil pulling and warm water.",
    },
    {
      type: "image" as const,
      label: "A person doing gentle morning yoga on a mat",
      ratio: "533 / 298",
    },
    {
      type: "text" as const,
      text: "Placeholder paragraph. Abhyanga self-massage, gentle movement and pranayama to wake the body and steady the mind.",
    },
    {
      type: "text" as const,
      text: "Placeholder paragraph. Eating in rhythm with Agni — when to take the main meal and how to wind down in the evening.",
    },
    {
      type: "text" as const,
      text: "Placeholder paragraph. A closing thought: start small, stay consistent, and book a consultation for a routine tailored to your Prakriti.",
    },
  ],
};
