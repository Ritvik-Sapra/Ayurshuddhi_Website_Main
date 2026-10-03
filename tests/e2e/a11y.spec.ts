import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  "/",
  "/ayurveda",
  "/panchakarma",
  "/services",
  "/about",
  "/blogs",
  "/blogs/dinacharya-daily-routine",
  "/contact",
  "/privacy-policy",
  "/terms",
];

for (const path of pages) {
  test(`no WCAG A/AA violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
}
