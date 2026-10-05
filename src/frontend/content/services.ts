import type { ServiceSlug } from "@/shared/constants";

export type FaqEntry = { question: string; answer: string };

/** Card shown on /services and on the home hero. `href` links to its detail page. */
export type ServiceSummary = {
  title: string;
  summary: string;
  href: `/${ServiceSlug}`;
  imageLabel: string;
  imageSrc?: string;
};

export type ServiceDetail = {
  slug: ServiceSlug;
  title: string;
  metaDescription: string;
  /** Two intro paragraphs shown side by side on desktop. */
  intro: [string, string];
  /** TODO(media): licensed intro strip video, e.g. "/media/ayurveda-intro.mp4". */
  videoSrc?: string;
  faq: FaqEntry[];
};

/** Photo behind the booking form on every service page. */
export const bookingImageSrc =
  "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/images/service-page-images/ayurveda-2.jpg";

// TODO(copy): replace with the real answers.
const PLACEHOLDER_ANSWER =
  "Placeholder answer. Two or three short lines that address the question directly.";

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
  naturopathy: {
    slug: "naturopathy",
    title: "Naturopathy",
    metaDescription:
      "Healing drawn from the elements: water, earth, sunlight and unhurried rest. Book a naturopathy consultation in Greater Noida.",
    // TODO(copy): draft copy, to be reviewed by the clinic.
    intro: [
      "Naturopathy trusts the body's own capacity to heal when it is given the right conditions. We use water, earth, sunlight, fresh food and rest to remove what burdens the body and support what restores it.",
      "Gentle, drug-free care built around your routine, diet and environment. Book a consultation and we will tell you whether naturopathy is the right place to begin.",
    ],
    faq: [
      {
        question: "Hydrotherapy",
        answer:
          "Water treatments such as hip baths, wraps and steam are used to improve circulation, ease muscle tension and support the body's natural detoxification.",
      },
      {
        question: "Mud Therapy",
        answer:
          "Medicinal clay packs applied to the abdomen, spine or joints to cool inflammation and draw out heat and toxins.",
      },
      {
        question: "Diet and Fasting",
        answer:
          "Seasonal, whole-food plans and supervised short fasts that rest the digestive system and let it reset.",
      },
      {
        question: "Sunlight and Fresh Air",
        answer:
          "Guided time in morning light and open air to support sleep, mood and vitamin D levels.",
      },
      {
        question: "Lifestyle Guidance",
        answer:
          "Practical changes to sleep, movement and daily rhythm that keep the benefits going after treatment.",
      },
    ],
  },
  "pulse-diagnosis": {
    slug: "pulse-diagnosis",
    title: "Pulse Diagnosis (Nadi Pariksha)",
    metaDescription:
      "Nadi Pariksha reads the pulse to trace dosha imbalance long before symptoms surface. Book a pulse diagnosis in Greater Noida.",
    // TODO(copy): draft copy, to be reviewed by the clinic.
    intro: [
      "Nadi Pariksha is the classical Ayurvedic art of reading the pulse at the wrist. The quality, rhythm and force of the pulse reflect the state of the three doshas and the condition of the deeper tissues.",
      "It can reveal imbalance well before symptoms appear. Book a consultation and we will tell you what your pulse says and how to respond.",
    ],
    faq: [
      {
        question: "What is Nadi Pariksha?",
        answer:
          "A diagnostic method in which the practitioner reads the pulse at three positions on the wrist to assess Vata, Pitta and Kapha and the state of the tissues.",
      },
      {
        question: "How should I prepare?",
        answer:
          "Come in the morning on an empty stomach if possible, rested and calm. Avoid heavy meals, strenuous exercise and caffeine beforehand.",
      },
      {
        question: "Does it hurt?",
        answer: "No. It is a quiet, non-invasive reading that takes only a few minutes.",
      },
      {
        question: "What will I learn?",
        answer:
          "Your constitution, your current dominant imbalance and early signs in digestion, sleep and stress that you may not have noticed.",
      },
      {
        question: "What happens next?",
        answer:
          "We outline diet, herbs and routine to bring the doshas back into balance, and suggest further therapies where they help.",
      },
    ],
  },
  "tongue-diagnosis": {
    slug: "tongue-diagnosis",
    title: "Tongue Diagnosis",
    metaDescription:
      "The tongue reveals digestion, accumulation and the state of your inner terrain. Book a tongue diagnosis in Greater Noida.",
    // TODO(copy): draft copy, to be reviewed by the clinic.
    intro: [
      "In Ayurveda the tongue is a map of the digestive tract and the body's inner terrain. Its colour, coating, shape and moisture show how well you digest and how much ama (toxic residue) has accumulated.",
      "A simple, painless examination that guides treatment. Book a consultation and we will tell you what your tongue shows and where to begin.",
    ],
    faq: [
      {
        question: "What does the tongue show?",
        answer:
          "Digestive strength, the presence of ama, dosha imbalance and the condition of specific organs, read from its colour, coating, cracks and edges.",
      },
      {
        question: "How should I prepare?",
        answer:
          "Come before brushing your teeth or scraping your tongue in the morning, and avoid strongly coloured foods and drinks beforehand.",
      },
      {
        question: "Is it a standalone treatment?",
        answer:
          "It is a diagnostic aid. We combine it with pulse reading and your history to build a complete picture.",
      },
      {
        question: "How often should it be checked?",
        answer:
          "Usually at each follow-up, as changes in the tongue are a good sign of how treatment is working.",
      },
      {
        question: "Can it detect problems early?",
        answer:
          "It often shows digestive and metabolic imbalance before symptoms become noticeable.",
      },
    ],
  },
  "rakht-mokshan-leech-therapy": {
    slug: "rakht-mokshan-leech-therapy",
    title: "Rakht Mokshan and Leech Therapy",
    metaDescription:
      "Gentle classical bloodletting for skin conditions and stagnant circulation. Book a Rakht Mokshan or leech therapy session in Greater Noida.",
    // TODO(copy): draft copy, to be reviewed by the clinic.
    intro: [
      "Rakht Mokshan is the classical Ayurvedic practice of releasing impure or stagnant blood. Leech therapy (Jalaukavacharana) is its gentlest form, and has long been used for skin conditions, inflammation and poor circulation.",
      "Performed with sterile, single-use medicinal leeches in a clean clinical setting. Book a consultation and we will tell you whether it suits you.",
    ],
    faq: [
      {
        question: "What conditions does it help?",
        answer:
          "Chronic skin conditions, localised inflammation, varicose veins and joint pain are among those where it is traditionally used.",
      },
      {
        question: "Is it safe and hygienic?",
        answer:
          "Yes. Each medicinal leech is used only once, on one patient, in a sterile setting.",
      },
      {
        question: "Does it hurt?",
        answer:
          "Most people feel a mild pinch at the start, followed by a gentle tingling. Sessions are generally well tolerated.",
      },
      {
        question: "Who should not have it?",
        answer:
          "People with bleeding disorders, those on blood thinners, pregnant women and those with severe anaemia should not. We screen everyone first.",
      },
      {
        question: "What aftercare is needed?",
        answer:
          "Keep the area clean and covered, and avoid strenuous activity for the rest of the day. Slight oozing afterwards is normal.",
      },
    ],
  },
  "agni-karma": {
    slug: "agni-karma",
    title: "Agni Karma",
    metaDescription:
      "Precise thermal cautery from classical surgery to quiet persistent joint pain. Book an Agni Karma consultation in Greater Noida.",
    // TODO(copy): draft copy, to be reviewed by the clinic.
    intro: [
      "Agni Karma is a classical Ayurvedic therapy that applies controlled, precise heat to specific points on the body. Described by Sushruta, it is used to relieve pain that has not eased with other methods.",
      "It is especially useful for stubborn joint, muscle and tendon pain. Book a consultation and we will tell you whether it is the right place to begin.",
    ],
    faq: [
      {
        question: "What is Agni Karma?",
        answer:
          "A therapy that uses heat at carefully chosen points to relieve pain and stiffness, particularly in Vata and Kapha conditions.",
      },
      {
        question: "What conditions is it used for?",
        answer:
          "Knee and joint pain, sciatica, heel pain, tennis elbow, frozen shoulder and similar chronic musculoskeletal problems.",
      },
      {
        question: "Is it painful?",
        answer:
          "The application is brief and precise. Most people describe a short sensation of warmth, and we use soothing herbal pastes afterwards.",
      },
      {
        question: "How many sessions are needed?",
        answer:
          "Many people feel relief after one to three sessions, depending on the condition. We will advise after your assessment.",
      },
      {
        question: "Are there any precautions?",
        answer:
          "It is not suitable for everyone, including those with certain skin conditions or uncontrolled diabetes. We assess you first.",
      },
    ],
  },
  "yoga-pranayama-meditation": {
    slug: "yoga-pranayama-meditation",
    title: "Yoga, Pranayama, and Meditation",
    metaDescription:
      "Movement, breath and stillness practised together to steady body and mind. Book a yoga and meditation consultation in Greater Noida.",
    // TODO(copy): draft copy, to be reviewed by the clinic.
    intro: [
      "Yoga, pranayama and meditation are the sister practices of Ayurveda. Posture strengthens and loosens the body, breath work regulates the nervous system, and meditation steadies the mind.",
      "We teach them as one practice, fitted to your constitution and condition. Book a consultation and we will tell you where to begin.",
    ],
    faq: [
      {
        question: "Do I need to be flexible?",
        answer:
          "Not at all. Every practice is adapted to your body, age and any health conditions.",
      },
      {
        question: "What is pranayama?",
        answer:
          "Controlled breathing techniques that calm or energise the mind, improve lung capacity and balance the doshas.",
      },
      {
        question: "How is meditation taught?",
        answer:
          "We start with short, simple practices and build slowly, so it feels natural rather than forced.",
      },
      {
        question: "Is it personalised?",
        answer:
          "Yes. Sequences and breath work are chosen for your constitution and the imbalance we are working with.",
      },
      {
        question: "Can it support other treatment?",
        answer:
          "It works well alongside Ayurveda and Panchakarma, and helps keep their benefits over the long term.",
      },
    ],
  },
  "depression-stress-management": {
    slug: "depression-stress-management",
    title: "Depression and Stress Management",
    metaDescription:
      "Sattvic routine, herbs and breathwork to restore calm and lift the spirit. Book a stress and mood consultation in Greater Noida.",
    // TODO(copy): draft copy, to be reviewed by the clinic.
    intro: [
      "In Ayurveda, low mood and chronic stress are seen as imbalances of mind and body together, often rooted in poor sleep, digestion and an overloaded routine. We treat the whole picture, not only the symptoms.",
      "Care combines a sattvic routine, calming herbs, breathwork and supportive therapies. Book a consultation and we will tell you where to begin.",
    ],
    faq: [
      {
        question: "How does Ayurveda approach depression?",
        answer:
          "By restoring balance to the mind and body through routine, diet, herbs, breathwork and therapies such as Shirodhara, tailored to you.",
      },
      {
        question: "Will this replace my medication?",
        answer:
          "No. Please continue any prescribed medication and speak with your doctor before making changes. Our care can work alongside it.",
      },
      {
        question: "How soon will I feel a difference?",
        answer:
          "Sleep and energy often start to improve within a few weeks. Deeper change takes steady practice over a few months.",
      },
      {
        question: "What does a sattvic routine involve?",
        answer:
          "Regular sleep and meals, fresh whole foods, time outdoors, gentle movement and quiet time to wind down.",
      },
      {
        question: "Is it confidential?",
        answer: "Yes. Your consultation and your records are kept private.",
      },
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
    imageSrc:
      "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/images/AdobeStock_709380423.jpeg",
  },
  {
    title: "Naturopathy",
    summary: "Healing drawn from the elements — water, earth, sunlight, and unhurried rest.",
    href: "/naturopathy",
    imageLabel: "Sunlight through a green garden, suggesting natural healing",
    imageSrc:
      "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/images/service-page-images/naturopathy.jpg",
  },
  {
    title: "Panchakarma",
    summary:
      "Classical five-fold purification that clears accumulated toxins and renews the tissues.",
    href: "/panchakarma",
    imageLabel: "A Panchakarma therapy room with warm oils",
    imageSrc:
      "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/images/service-page-images/panchakarma.jpg",
  },
  {
    title: "Pulse Diagnosis (Nadi Pariksha)",
    summary: "Reading the pulse to trace imbalance in the doshas long before symptoms surface.",
    href: "/pulse-diagnosis",
    imageLabel: "A practitioner reading a patient's pulse at the wrist",
    imageSrc:
      "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/images/service-page-images/pulse-diagnosis.jpg",
  },
  {
    title: "Tongue Diagnosis",
    summary: "The tongue reveals digestion, accumulation, and the state of your inner terrain.",
    href: "/tongue-diagnosis",
    imageLabel: "A practitioner examining a patient's tongue during a consultation",
    imageSrc:
      "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/images/service-page-images/tongue-diagnosis.jpg",
  },
  {
    title: "Rakht Mokshan and Leech Therapy",
    summary: "Gentle bloodletting, an age-old remedy for skin conditions and stagnant circulation.",
    href: "/rakht-mokshan-leech-therapy",
    imageLabel: "Medicinal leech therapy in a clean clinical setting",
    imageSrc:
      "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/images/service-page-images/rakth-mokshan.jpg",
  },
  {
    title: "Agni Karma",
    summary: "Precise thermal cautery from classical surgery, used to quiet persistent joint pain.",
    href: "/agni-karma",
    imageLabel: "Agni Karma thermal therapy applied to a knee joint",
    imageSrc:
      "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/images/service-page-images/agni_karma.JPG",
  },
  {
    title: "Yoga, Pranayama, and Meditation",
    summary: "Movement, breath, and stillness practised together to steady body and mind.",
    href: "/yoga-pranayama-meditation",
    imageLabel: "A person meditating in lotus pose at sunrise",
    imageSrc:
      "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/images/service-page-images/yoga.jpg",
  },
  {
    title: "Depression and Stress Management",
    summary: "Sattvic routine, herbs, and breathwork to restore calm and lift the spirit.",
    href: "/depression-stress-management",
    imageLabel: "A calm person breathing deeply beside a window",
    imageSrc:
      "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/images/service-page-images/Depression_Stress_Management.JPG",
  },
];
