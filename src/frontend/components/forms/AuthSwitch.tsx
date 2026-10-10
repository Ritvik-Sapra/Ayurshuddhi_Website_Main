import Link from "next/link";

type AuthSwitchProps = {
  prompt: string;
  href: string;
  label: string;
};

/** Hairline divider, then a line that sends people to the other account form ("New to Ayurshuddhi? Create an account"). */
export function AuthSwitch({ prompt, href, label }: AuthSwitchProps) {
  return (
    <>
      <hr className="border-t border-card-border" />
      <p className="text-small text-cream">
        {prompt}{" "}
        <Link href={href} className="underline underline-offset-2">
          {label}
        </Link>
      </p>
    </>
  );
}
