import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
  test("home shows the hero and Book Now links to Ayurveda booking", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Rooted in Ancient Wisdom");
    await page.getByRole("link", { name: "Book Now" }).click();
    await expect(page).toHaveURL(/\/ayurveda#book$/);
    await expect(page.getByRole("heading", { level: 1, name: "Ayurveda" })).toBeVisible();
  });

  test("menu opens, closes with Escape and returns focus", async ({ page }) => {
    await page.goto("/");
    const open = page.getByRole("button", { name: "Open menu" });
    await open.click();
    const menu = page.getByRole("dialog", { name: "Site menu" });
    await expect(menu).toBeVisible();
    await expect(open).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(open).toBeFocused();
    await expect(open).toHaveAttribute("aria-expanded", "false");
  });

  test("menu links navigate and the menu closes", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Blogs" }).click();
    await expect(page).toHaveURL(/\/maintenance$/);
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("logo links home", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("link", { name: /home$/i }).first().click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("blog list links the published article only", async ({ page }) => {
    await page.goto("/blogs");
    await expect(page.getByText("Coming soon")).toHaveCount(4);
    await page.getByRole("link", { name: /Morning Ritual/ }).click();
    await expect(page).toHaveURL(/dinacharya-daily-routine$/);
  });
});

test.describe("footer", () => {
  test("link groups, contact links and legal links", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator(".site-footer .footer-body")).toBeVisible();
    const footer = page.getByRole("contentinfo");
    const nav = footer.getByRole("navigation", { name: "Footer" });
    for (const heading of ["Therapies", "Explore", "Visit"]) {
      await expect(nav.getByRole("heading", { name: heading })).toBeVisible();
    }
    await expect(nav.getByRole("link", { name: "Book a consultation" })).toHaveAttribute(
      "href",
      "/ayurveda#book",
    );
    await expect(nav.getByRole("link", { name: /^\+91/ })).toHaveAttribute("href", /^tel:/);
    await expect(nav.getByRole("link", { name: /@/ })).toHaveAttribute("href", /^mailto:/);
    const legal = footer.getByRole("navigation", { name: "Legal" });
    await expect(legal.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy-policy",
    );
    await expect(legal.getByRole("link", { name: "Terms of Service" })).toHaveAttribute(
      "href",
      "/terms",
    );
    await expect(footer).toContainText(`© ${new Date().getFullYear()} Ayurshuddhi Wellness`);
  });

  // The fixed nav chips may only sit over the footer photo, never over the content below it.
  // "fallback" stands in for browsers without scroll-driven animations (Firefox, older Safari).
  for (const mode of ["css", "fallback"] as const) {
    for (const viewport of [
      { width: 1366, height: 768 },
      { width: 844, height: 390 },
      { width: 390, height: 844 },
    ]) {
      test(`nav chips never cover footer content at ${viewport.width}x${viewport.height} (${mode})`, async ({
        page,
      }) => {
        if (mode === "fallback") {
          await page.addInitScript(() => {
            const supports = CSS.supports.bind(CSS) as (...args: string[]) => boolean;
            CSS.supports = ((...args: string[]) =>
              args.join(":").includes("animation-timeline")
                ? false
                : supports(...args)) as typeof CSS.supports;
          });
        }
        await page.setViewportSize(viewport);
        await page.goto("/about");
        await expect(page.locator(".site-footer .footer-body")).toBeVisible();
        if (mode === "fallback") {
          await expect(page.locator("html")).toHaveAttribute("data-chips-fallback", "");
        }
        // Partway (content top 50px from the top of the screen), then the very bottom of the page.
        for (const contentTop of [50, null]) {
          await page.evaluate((top) => {
            const content = document.querySelector("footer .footer-body")!.getBoundingClientRect();
            const target =
              top === null ? document.documentElement.scrollHeight : scrollY + content.top - top;
            window.scrollTo({ top: target, behavior: "instant" });
          }, contentTop);
          await page.waitForFunction(() => {
            const content = document.querySelector("footer .footer-body")!.getBoundingClientRect();
            const chips = document.querySelectorAll(
              "body > header > :is(a.nav-chip, .menu-trigger)",
            );
            return [...chips].every((chip) => {
              const bottom = chip.getBoundingClientRect().bottom;
              return bottom <= 0 || bottom <= content.top;
            });
          });
        }
      });
    }
  }

  test("the photo never takes over an ultra-wide screen", async ({ page }) => {
    for (const viewport of [
      { width: 3440, height: 1440 },
      { width: 2560, height: 1080 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/about");
      await expect(page.locator(".site-footer .footer-body")).toBeVisible();
      const height = await page
        .locator(".site-footer > div")
        .first()
        .evaluate((band) => band.getBoundingClientRect().height);
      expect(height).toBeLessThanOrEqual(Math.min(640, viewport.height * 0.65));
    }
  });

  test("every footer link is at least 44x44 and no two overlap", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/about");
    await expect(page.locator(".site-footer .footer-body")).toBeVisible();
    const boxes = await page.locator(".site-footer a").evaluateAll((links) =>
      links.map((link) => {
        const r = link.getBoundingClientRect();
        return {
          text: link.textContent,
          left: r.left,
          top: r.top,
          right: r.right,
          bottom: r.bottom,
        };
      }),
    );
    for (const [i, a] of boxes.entries()) {
      expect(a.right - a.left, `${a.text} width`).toBeGreaterThanOrEqual(44);
      expect(a.bottom - a.top, `${a.text} height`).toBeGreaterThanOrEqual(44);
      for (const b of boxes.slice(i + 1)) {
        const overlap =
          a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
        expect(overlap, `${a.text} overlaps ${b.text}`).toBe(false);
      }
    }
  });
});

test.describe("404", () => {
  test("clicking anywhere goes home", async ({ page }) => {
    await page.goto("/no-such-page");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Oops");
    await page.mouse.click(200, 500);
    await expect(page).toHaveURL(/\/$/);
  });

  test("unpublished blog slugs are not found", async ({ page }) => {
    const response = await page.goto("/blogs/ritucharya-seasonal-living");
    expect(response?.status()).toBe(404);
  });
});

test.describe("accordion", () => {
  test("one item open at a time, first open by default", async ({ page }) => {
    await page.goto("/panchakarma");
    const items = page.locator("h3 button");
    await expect(items.nth(0)).toHaveAttribute("aria-expanded", "true");
    await items.nth(2).click();
    await expect(items.nth(2)).toHaveAttribute("aria-expanded", "true");
    await expect(items.nth(0)).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("forms", () => {
  // The API rate-limits by IP; give every test its own so runs do not interfere.
  test.beforeEach(async ({ page }) => {
    const ip = `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    await page.setExtraHTTPHeaders({ "x-forwarded-for": ip });
  });

  test("booking form validates, then submits", async ({ page }) => {
    await page.goto("/ayurveda");
    await page.getByRole("button", { name: "Book Now" }).click();
    await expect(page.getByText("Please enter your full name")).toBeVisible();

    await page.getByLabel("Full Name").fill("Test Person");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Phone").fill("+91 98765 43210");
    await expect(page.getByLabel("Service")).toHaveValue("ayurveda");
    const inThreeDays = new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10);
    await page.getByLabel("Preferred Date").fill(inThreeDays);
    await page.getByRole("button", { name: "Book Now" }).click();
    await expect(page.getByRole("status")).toContainText("Your request is in");
  });

  test("booking form shows the server error state", async ({ page }) => {
    await page.route("**/api/book", (route) =>
      route.fulfill({
        status: 500,
        json: { ok: false, message: "Something went wrong on our side." },
      }),
    );
    await page.goto("/ayurveda");
    await page.getByLabel("Full Name").fill("Test Person");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Phone").fill("+91 98765 43210");
    await page
      .getByLabel("Preferred Date")
      .fill(new Date(Date.now() + 864e5).toISOString().slice(0, 10));
    await page.getByRole("button", { name: "Book Now" }).click();
    await expect(page.getByText("Something went wrong on our side.")).toBeVisible();
  });

  test("contact form submits", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Please write at least 10 characters")).toBeVisible();
    await page.getByLabel("Full Name").fill("Test Person");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Message").fill("Hello, I would like to know more about Panchakarma.");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByRole("status")).toContainText("Your message is on its way");
  });

  test("the API rejects a filled honeypot", async ({ request }) => {
    const response = await request.post("/api/contact", {
      headers: { "x-forwarded-for": "10.9.9.9" },
      data: {
        fullName: "Bot",
        email: "bot@example.com",
        subject: "Other",
        message: "Buy cheap pills now please",
        website: "http://spam.example",
      },
    });
    expect(response.status()).toBe(400);
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("the menu still works and pins do not animate", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("dialog", { name: "Site menu" })).toBeVisible();
    await page.keyboard.press("Escape");
    await page.goto("/ayurveda");
    const pinAnimation = await page
      .locator(".map-pin")
      .first()
      .evaluate((el) => getComputedStyle(el, "::after").animationName);
    expect(pinAnimation).toBe("none");
  });
});
