import { Fragment, type CSSProperties } from "react";

/**
 * Splits a line of text into words that can each rise out of their own mask (see `.mask-word`
 * in motion.css). Plain inline text to screen readers and without CSS; `--word` is the word's
 * index, for staggering.
 */
export function MaskedWords({ text }: { text: string }) {
  return text.split(" ").map((word, index) => (
    <Fragment key={index}>
      {index > 0 ? " " : null}
      <span className="mask-word">
        <span className="mask-word__inner" style={{ "--word": index } as CSSProperties}>
          {word}
        </span>
      </span>
    </Fragment>
  ));
}
