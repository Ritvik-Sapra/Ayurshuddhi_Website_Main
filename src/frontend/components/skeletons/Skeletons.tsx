import type { ReactNode } from "react";

/*
 * Plain HTML + CSS loading skeletons. All layout and animation lives in styles/skeleton.css;
 * these components only output markup. Each mirrors the real page's sections and heights.
 */

function Shell({ tone, children }: { tone: string; children: ReactNode }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className={tone}>
      <span className="sr-only">Loading…</span>
      <div aria-hidden="true">{children}</div>
    </div>
  );
}

function Blocks({ count, className = "sk" }: { count: number; className?: string }) {
  return Array.from({ length: count }, (_, index) => <div key={index} className={className} />);
}

export function HomeSkeleton() {
  return (
    <Shell tone="sk-on-dark sk-bg-dark">
      <div className="sk-home">
        <div className="sk-home__lines">
          <div className="sk sk-w-80" />
          <div className="sk" />
          <div className="sk sk-w-60" />
        </div>
        <div className="sk sk-home__card" />
      </div>
    </Shell>
  );
}

export function ServiceSkeleton() {
  return (
    <>
      <Shell tone="sk-on-dark sk-bg-ph">
        <div className="sk sk-svc-hero" style={{ borderRadius: 0 }} />
      </Shell>
      <div className="sk-on-light sk-bg-cream" aria-hidden="true">
        <div className="sk-svc-intro">
          <div className="sk sk--title" />
          <div className="sk-svc-intro__cols">
            <div className="sk sk--text" style={{ height: "7.5rem" }} />
            <div className="sk sk--text" style={{ height: "7.5rem" }} />
          </div>
          <div className="sk sk-svc-intro__strip" />
        </div>
      </div>
      <div className="sk-on-light sk-bg-white" aria-hidden="true">
        <div className="sk-svc-faq">
          <div className="sk sk--title" />
          <div className="sk-svc-faq__rows">
            <Blocks count={5} />
          </div>
        </div>
      </div>
      <div className="sk-on-dark sk-bg-ph" aria-hidden="true">
        <div className="sk-svc-book">
          <div className="sk sk-svc-book__panel" />
        </div>
      </div>
    </>
  );
}

/** Green header with a card list: blogs (carousel on desktop) and services (grid). */
export function ListPageSkeleton({ cards = false }: { cards?: boolean }) {
  return (
    <Shell tone="sk-on-green sk-bg-green">
      <div className="sk-head">
        <div className="sk sk--title" />
        <div className="sk sk--text sk-w-60" />
      </div>
      <div className={cards ? "sk-list sk-list--cards" : "sk-list"}>
        <Blocks count={cards ? 9 : 5} />
      </div>
    </Shell>
  );
}

export function AboutSkeleton() {
  return (
    <>
      <Shell tone="sk-on-dark sk-bg-dark">
        <div className="sk-about-gallery">
          <Blocks count={3} />
        </div>
      </Shell>
      <div className="sk-on-green sk-bg-green" aria-hidden="true">
        <div className="sk-about-panel">
          <div className="sk sk--heading" />
          <div className="sk sk--text" />
          <div className="sk sk--text" />
          <div className="sk sk--heading" />
          <div className="sk sk--text-short" />
        </div>
      </div>
      <div className="sk-on-light sk-bg-white" aria-hidden="true">
        <div className="sk-about-photos">
          <div className="sk sk--media" />
          <div className="sk sk--title" />
          <div className="sk sk--text" style={{ maxWidth: 340 }} />
        </div>
      </div>
    </>
  );
}

export function ArticleSkeleton() {
  return (
    <Shell tone="sk-on-green sk-bg-green">
      <div className="sk-article">
        <div className="sk sk--heading" />
        <div className="sk sk--text" />
        <div className="sk sk--media" />
        <div className="sk sk--text" />
        <div className="sk sk--text" />
        <div className="sk sk--text-short" />
      </div>
    </Shell>
  );
}

export function LegalSkeleton() {
  return (
    <Shell tone="sk-on-green sk-bg-green">
      <div className="sk-legal">
        <div className="sk-block-center" style={{ alignItems: "flex-start" }}>
          <div className="sk sk--title" />
          <div className="sk sk--text-short" style={{ width: 140 }} />
        </div>
        <div className="sk-legal__sections">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="sk-block-center" style={{ alignItems: "stretch", gap: 16 }}>
              <div className="sk sk--heading" />
              <div className="sk sk--text" />
              <div className="sk sk--text-short" />
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export function ContactSkeleton() {
  return (
    <>
      <Shell tone="sk-on-green sk-bg-green">
        <div className="sk-head">
          <div className="sk sk--text-short" style={{ width: 120 }} />
          <div className="sk sk--title" />
          <div className="sk sk--text sk-w-60" />
        </div>
      </Shell>
      <div className="sk-on-dark sk-bg-ph" aria-hidden="true">
        <div className="sk-list" style={{ paddingTop: 48 }}>
          <div className="sk" style={{ height: 380 }} />
          <div className="sk" style={{ height: 560 }} />
        </div>
      </div>
    </>
  );
}
