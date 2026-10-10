type ProfileHeroProps = {
  eyebrow: string;
  welcome: string;
  name: string;
  intro: string;
};

/** Figma: Profile hero. Heading band on the shared dark green backdrop; the nav chips float over its top. */
export function ProfileHero({ eyebrow, welcome, name, intro }: ProfileHeroProps) {
  return (
    <section className="relative px-6 pb-16 pt-38 text-center text-cream lg:pb-24 lg:pt-60">
      <div className="mx-auto flex flex-col items-center gap-4 lg:gap-6">
        <p className="text-body text-accent-soft lg:text-body-l">{eyebrow}</p>
        <h1 className="text-balance wrap-break-word text-h3 lg:max-w-155 lg:text-h1">
          {welcome} {name}
        </h1>
        <p className="max-w-80 text-small lg:max-w-115 lg:text-body">{intro}</p>
      </div>
    </section>
  );
}
