import type { ReactNode } from "react";

/** Re-mounts on every navigation, so each page plays the same short enter animation as the site pages. */
export default function AccountTemplate({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
