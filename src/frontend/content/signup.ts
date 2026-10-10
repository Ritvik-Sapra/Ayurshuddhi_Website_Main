export const signUpPage = {
  benefits: {
    eyebrow: "Why join",
    title: "Your wellness, in one place",
    items: [
      "Book and reschedule consultations online",
      "See your upcoming and past visits",
      "Keep your treatment plans and notes together",
      "Book faster with your details saved",
    ],
  },
  form: {
    eyebrow: "User Portal",
    title: "Create your account",
    fields: {
      fullName: { label: "Full Name", placeholder: "Your full name" },
      phone: { label: "Phone", placeholder: "+91 98765 43210" },
      email: { label: "Email", placeholder: "you@example.com" },
      password: { label: "Password", placeholder: "At least 8 characters" },
      confirmPassword: { label: "Confirm Password", placeholder: "Re-enter your password" },
    },
    terms: {
      before: "I agree to the ",
      termsLabel: "Terms of Service",
      termsHref: "/terms",
      between: " and ",
      privacyLabel: "Privacy Policy",
      privacyHref: "/privacy-policy",
      after: ".",
    },
    submit: "Create Account",
    switch: {
      prompt: "Already have an account?",
      label: "Log in",
      href: "/login",
    },
  },
};

export type SignUpPageContent = typeof signUpPage;
