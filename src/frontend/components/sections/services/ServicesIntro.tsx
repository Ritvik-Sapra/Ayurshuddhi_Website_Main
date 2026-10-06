import { MaskedWords } from "@/frontend/components/ui/MaskedWords";

type ServicesIntroProps = {
  title: string;
  lede: string;
};

/**
 * /services heading. The words rise out of their masks and the lede fades up on the first visit
 * (motion.css, "/services entrance"); a soft warm glow breathes slowly behind them.
 */
export function ServicesIntro({ title, lede }: ServicesIntroProps) {
  return (
    <div className="relative mx-auto flex max-w-[860px] flex-col items-center gap-5 text-center lg:gap-6">
      <div aria-hidden="true" className="svc-glow" />
      <h1 className="svc-title text-balance text-title">
        <MaskedWords text={title} />
      </h1>
      <p className="svc-lede max-w-[463px] text-body">{lede}</p>
    </div>
  );
}
