import type { ServiceSlug } from "@/shared/constants";

export type FaqEntry = { question: string; answer: string };
export type Pin = { x: number; y: number };

/** Card shown on /services and on the home hero. `href` is set only when a detail page exists. */
export type ServiceSummary = {
  title: string;
  summary: string;
  href?: `/${ServiceSlug}`;
  imageLabel: string;
};

export type ServiceDetail = {
  slug: ServiceSlug;
  title: string;
  metaDescription: string;
  /** Two intro paragraphs shown side by side on desktop. */
  intro: [string, string];
  heroImageLabel: string;
  /** Decorative map pins, in px on the 390x844 (mobile) and 1440x900 (desktop) Figma frames. */
  pins: { mobile: Pin[]; desktop: Pin[] };
  /** TODO(media): licensed intro strip video, e.g. "/media/ayurveda-intro.mp4". */
  videoSrc?: string;
  faq: FaqEntry[];
};

// TODO(copy): replace with the real answers.
const PLACEHOLDER_ANSWER =
  "Placeholder answer. Two or three short lines that address the question directly.";

const pins = {
  mobile: [
    { x: 62, y: 190 },
    { x: 222, y: 520 },
    { x: 46, y: 700 },
    { x: 118, y: 770 },
  ],
  desktop: [
    { x: 298, y: 146 },
    { x: 212, y: 551 },
    { x: 469, y: 731 },
    { x: 853, y: 425 },
    { x: 1120, y: 300 },
  ],
} satisfies ServiceDetail["pins"];

export const serviceDetails: Record<ServiceSlug, ServiceDetail> = {
  ayurveda: {
    slug: "ayurveda",
    title: "Ayurveda",
    metaDescription:
      "Personalised herbal formulations, diet and daily rhythm prescribed to your own constitution. Book an Ayurveda consultation in Greater Noida.",
    intro: [
      "Ayurveda is the science of life — among the oldest systems of holistic healing still practised today. We apply classical principles refined over millennia, treating the individual rather than a single diagnosis.",
      "Personalised herbal formulations, diet, and daily rhythm, prescribed to your own constitution. Book a consultation and we will tell you whether Ayurveda is the right place to begin.",
    ],
    heroImageLabel: "Ayurvedic herbs and healing ingredients arranged in a calm clinic setting",
    pins,
    faq: [
      {
        question: "Personalised Consultation",
        answer:
          "We assess your constitution and current imbalances through pulse reading, tongue analysis and facial indicators before recommending any treatment.",
      },
      { question: "Customised Treatment Plans", answer: PLACEHOLDER_ANSWER },
      { question: "Specialised Therapies", answer: PLACEHOLDER_ANSWER },
      { question: "Seasonal Detoxification", answer: PLACEHOLDER_ANSWER },
      { question: "Preventative Care", answer: PLACEHOLDER_ANSWER },
    ],
  },
  panchakarma: {
    slug: "panchakarma",
    title: "Panchakarma",
    metaDescription:
      "Classical five-fold purification that clears accumulated toxins and renews the tissues. Book a Panchakarma consultation in Greater Noida.",
    intro: [
      "Panchakarma — \"five actions\" in Sanskrit — is Ayurveda's foremost protocol for cleansing and renewal, clearing deep-seated toxins from the tissues and reawakening the body's own healing.",
      "Classical five-fold purification that clears accumulated toxins and renews the tissues. Book a consultation and we will tell you whether Panchakarma is the right place to begin.",
    ],
    heroImageLabel: "A Panchakarma therapy room with warm oils and a treatment table",
    pins,
    faq: [
      {
        question: "Personalised Assessment",
        answer:
          "A constitutional evaluation of your body and imbalances, followed by a Panchakarma programme customised to you.",
      },
      { question: "Preparatory Therapies (Purvakarma)", answer: PLACEHOLDER_ANSWER },
      { question: "Five Cleansing Procedures", answer: PLACEHOLDER_ANSWER },
      { question: "Rejuvenation (Rasayana)", answer: PLACEHOLDER_ANSWER },
      { question: "Post-Therapy Guidance", answer: PLACEHOLDER_ANSWER },
    ],
  },
};

export const serviceSlugs = Object.keys(serviceDetails) as ServiceSlug[];

/** The nine practices listed on /services. */
export const services: ServiceSummary[] = [
  {
    title: "Ayurveda",
    summary:
      "Personalised herbal formulations, diet, and daily rhythm, prescribed to your own constitution.",
    href: "/ayurveda",
    imageLabel: "Ayurvedic herbs and healing ingredients",
  },
  {
    title: "Naturopathy",
    summary: "Healing drawn from the elements — water, earth, sunlight, and unhurried rest.",
    imageLabel: "Sunlight through a green garden, suggesting natural healing",
  },
  {
    title: "Panchakarma",
    summary:
      "Classical five-fold purification that clears accumulated toxins and renews the tissues.",
    href: "/panchakarma",
    imageLabel: "A Panchakarma therapy room with warm oils",
  },
  {
    title: "Pulse Diagnosis (Nadi Pariksha)",
    summary: "Reading the pulse to trace imbalance in the doshas long before symptoms surface.",
    imageLabel: "A practitioner reading a patient's pulse at the wrist",
  },
  {
    title: "Tongue Diagnosis",
    summary: "The tongue reveals digestion, accumulation, and the state of your inner terrain.",
    imageLabel: "A practitioner examining a patient's tongue during a consultation",
  },
  {
    title: "Rakht Mokshan and Leech Therapy",
    summary: "Gentle bloodletting, an age-old remedy for skin conditions and stagnant circulation.",
    imageLabel: "Medicinal leech therapy in a clean clinical setting",
  },
  {
    title: "Agni Karma",
    summary: "Precise thermal cautery from classical surgery, used to quiet persistent joint pain.",
    imageLabel: "Agni Karma thermal therapy applied to a knee joint",
  },
  {
    title: "Yoga, Pranayama, and Meditation",
    summary: "Movement, breath, and stillness practised together to steady body and mind.",
    imageLabel: "A person meditating in lotus pose at sunrise",
  },
  {
    title: "Depression and Stress Management",
    summary: "Sattvic routine, herbs, and breathwork to restore calm and lift the spirit.",
    imageLabel: "A calm person breathing deeply beside a window",
  },
];
