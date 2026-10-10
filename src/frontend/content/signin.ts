export const signInPage = {
  eyebrow: "User Portal",
  title: "Welcome back",
  intro: "Log in to see your upcoming consultations and manage your bookings.",
  form: {
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    forgotLabel: "Forgot password?",
    /** No reset page yet, so this points at the shared placeholder. */
    forgotHref: "/maintenance",
    submitLabel: "Log In",
    submittingLabel: "Logging in…",
  },
  switchPrompt: {
    prompt: "New to Ayurshuddhi?",
    href: "/signup",
    label: "Create an account",
  },
};

export type SignInFormCopy = typeof signInPage.form;
