import { LogoChip } from "@/frontend/components/layout/LogoChip";
import { RadialMenu } from "@/frontend/components/layout/RadialMenu";

/**
 * Figma: Nav/Bar. Two floating glass chips (logo left, menu right) that stay in view.
 * The header itself ignores pointer events so only the chips are clickable.
 */
export function NavBar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[var(--nav-height)]">
      <LogoChip />
      <RadialMenu />
    </header>
  );
}
