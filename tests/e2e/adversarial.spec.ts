import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * Adversarial tests: hammer the UI the way impatient people, odd devices and hostile URLs do,
 * and check the app ends up in a consistent, usable state rather than a stuck or broken one.
 */

/** Longest menu sequence (open, or link close) plus headroom. */
const SETTLE_MS = 2500;

const ROUTES = [
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
  "/maintenance",
  "/this-page-does-not-exist",
];

const trigger = (page: Page) => page.getByRole("button", { name: "Open menu" });
const menu = (page: Page) => page.locator("#site-menu");
const LOGO_NAME = "AyurshuddhiWellness home";

/** Records uncaught exceptions and console errors (other than expected 4xx resource logs). */
function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    if (/Failed to load resource: the server responded with a status of 4\d\d/.test(message.text()))
      return;
    errors.push(`console: ${message.text()}`);
  });
  return errors;
}

async function menuState(page: Page) {
  return page.evaluate(() => {
    const dialog = document.getElementById("site-menu") as HTMLDialogElement;
    const button = document.querySelector('button[aria-label="Open menu"]') as HTMLElement;
    const icon = button.querySelector("svg") as SVGElement;
    const root = document.documentElement;
    return {
      open: dialog.open,
      expanded: button.getAttribute("aria-expanded"),
      iconVisible: getComputedStyle(icon).visibility === "visible",
      scrollLocked: getComputedStyle(root).overflow === "hidden",
      sbwSet: root.style.getPropertyValue("--sbw") !== "",
    };
  });
}

/** After any amount of abuse, the menu's DOM, ARIA and scroll-lock state must agree. */
async function expectMenuConsistent(page: Page) {
  await page.waitForTimeout(SETTLE_MS);
  const state = await menuState(page);
  if (state.open) {
    expect(state).toEqual({
      open: true,
      expanded: "true",
      iconVisible: false,
      scrollLocked: true,
      sbwSet: true,
    });
  } else {
    expect(state).toEqual({
      open: false,
      expanded: "false",
      iconVisible: true,
      scrollLocked: false,
      sbwSet: false,
    });
  }
}

/** A full, clean open/close cycle still works and every link ends up fully visible. */
async function expectMenuWorks(page: Page) {
  if ((await menuState(page)).open) {
    await page.keyboard.press("Escape");
  }
  await trigger(page).click();
  await expect(menu(page)).toBeVisible();
  await page.waitForTimeout(SETTLE_MS);
  const links = menu(page).locator("nav a");
  await expect(links).toHaveCount(7);
  for (const link of await links.all()) {
    await expect(link).toBeVisible();
    await expect(link.locator("xpath=..")).toHaveCSS("opacity", "1");
  }
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(menu(page)).toBeHidden();
  await expect(trigger(page)).toBeFocused();
  await expectMenuConsistent(page);
}

async function center(locator: Locator) {
  const box = await locator.boundingBox();
  if (!box) throw new Error("element has no box");
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

function intersects(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number },
) {
  return a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
}

test.describe("rapid state changes: menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("triple-clicking the menu button leaves a consistent, working menu", async ({ page }) => {
    const errors = watchErrors(page);
    await trigger(page).click({ clickCount: 3 });
    await expectMenuConsistent(page);
    await expectMenuWorks(page);
    expect(errors).toEqual([]);
  });

  test("hammering the menu button at random intervals cannot desync it", async ({ page }) => {
    const errors = watchErrors(page);
    const { x, y } = await center(trigger(page));
    // The X sits exactly where the menu button is, so these alternate open / close / mid-animation.
    for (const gap of [0, 20, 40, 80, 0, 120, 10, 200, 0, 60, 300, 30, 0, 90]) {
      await page.mouse.click(x, y);
      await page.waitForTimeout(gap);
    }
    await expectMenuConsistent(page);
    await expectMenuWorks(page);
    expect(errors).toEqual([]);
  });

  test("Escape mid-animation, repeatedly, never strands the menu", async ({ page }) => {
    const errors = watchErrors(page);
    const { x, y } = await center(trigger(page));
    for (const delay of [50, 150, 400, 750, 900, 1200]) {
      await page.mouse.click(x, y);
      await page.waitForTimeout(delay);
      await page.keyboard.press("Escape");
    }
    await expectMenuConsistent(page);
    await expectMenuWorks(page);
    expect(errors).toEqual([]);
  });

  test("double-clicking a menu link navigates once and closes cleanly", async ({ page }) => {
    const errors = watchErrors(page);
    await trigger(page).click();
    await page.waitForTimeout(SETTLE_MS);
    await menu(page).getByRole("link", { name: "Services" }).dblclick();
    await expect(page).toHaveURL(/\/services$/);
    await expectMenuConsistent(page);
    expect((await menuState(page)).open).toBe(false);
    await expectMenuWorks(page);
    expect(errors).toEqual([]);
  });

  test("Escape during a link's closing sequence, then reopening, shows the full menu", async ({
    page,
  }) => {
    await trigger(page).click();
    await page.waitForTimeout(SETTLE_MS);
    await menu(page).getByRole("link", { name: "Ayurveda" }).click();
    await page.waitForTimeout(150);
    await page.keyboard.press("Escape");
    await expect(page).toHaveURL(/\/ayurveda$/);
    await expectMenuConsistent(page);
    await expectMenuWorks(page);
  });

  for (const [from, to] of [
    [
      { width: 390, height: 844 },
      { width: 1280, height: 800 },
    ],
    [
      { width: 1280, height: 800 },
      { width: 390, height: 844 },
    ],
  ] as const) {
    test(`resizing ${from.width}px -> ${to.width}px while open keeps the screen covered`, async ({
      page,
    }) => {
      await page.setViewportSize(from);
      await page.goto("/about");
      await trigger(page).click();
      await page.waitForTimeout(SETTLE_MS);
      await page.setViewportSize(to);
      await page.waitForTimeout(500);

      const geometry = await page.evaluate(() => {
        const bg = document.querySelector("#site-menu .rm-bg") as HTMLElement;
        const match = /circle\(([\d.]+)px at ([\d.]+)px ([\d.]+)px\)/.exec(
          getComputedStyle(bg).clipPath,
        );
        const button = document
          .querySelector('button[aria-label="Open menu"]')!
          .getBoundingClientRect();
        return {
          circle: match ? { r: +match[1], x: +match[2], y: +match[3] } : null,
          button: { x: button.left + button.width / 2, y: button.top + button.height / 2 },
          width: window.innerWidth,
          height: window.innerHeight,
        };
      });
      expect(geometry.circle).not.toBeNull();
      const { r, x, y } = geometry.circle!;
      // The green circle still reaches every corner of the new viewport...
      for (const [cx, cy] of [
        [0, 0],
        [geometry.width, 0],
        [0, geometry.height],
        [geometry.width, geometry.height],
      ]) {
        expect(Math.hypot(cx - x, cy - y)).toBeLessThanOrEqual(r);
      }
      // ...and is still centred on the menu button, so closing shrinks back into it.
      expect(Math.abs(x - geometry.button.x)).toBeLessThanOrEqual(1);
      expect(Math.abs(y - geometry.button.y)).toBeLessThanOrEqual(1);

      await page.getByRole("button", { name: "Close menu" }).click();
      await expectMenuConsistent(page);
      expect((await menuState(page)).open).toBe(false);
    });
  }
});

test.describe("viewport extremes", () => {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 568, height: 320 },
  ]) {
    test(`every menu link is reachable and unobstructed at ${viewport.width}x${viewport.height}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("/about");
      await trigger(page).click();
      await page.waitForTimeout(SETTLE_MS);

      const close = page.getByRole("button", { name: "Close menu" });
      const logo = menu(page).getByRole("link", { name: LOGO_NAME });
      const contact = menu(page).getByRole("link", { name: "Contact us" });
      const chrome = await Promise.all([close, logo, contact].map((l) => l.boundingBox()));

      for (const link of await menu(page).locator("nav a").all()) {
        await link.scrollIntoViewIfNeeded();
        const box = await link.boundingBox();
        expect(box, await link.innerText()).not.toBeNull();
        // Fully on screen...
        expect(box!.y).toBeGreaterThanOrEqual(0);
        expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height);
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width);
        // ...not overlapping the logo, the X or "Contact us"...
        for (const other of chrome) expect(intersects(box!, other!)).toBe(false);
        // ...and actually the thing that receives a click there.
        await link.click({ trial: true });
      }
    });
  }

  for (const path of ROUTES) {
    test(`no horizontal scroll or off-screen content at 320px on ${path}`, async ({ page }) => {
      const errors = watchErrors(page);
      await page.setViewportSize({ width: 320, height: 640 });
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const overflow = await page.evaluate(() => {
        const width = document.documentElement.clientWidth;
        const clips = (el: Element) => {
          for (
            let node = el.parentElement;
            node && node !== document.body;
            node = node.parentElement
          ) {
            const style = getComputedStyle(node);
            if (style.overflowX !== "visible") return true;
          }
          return false;
        };
        const offenders: string[] = [];
        for (const el of document.body.querySelectorAll("*")) {
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) continue;
          if (el.closest("dialog:not([open]), [aria-hidden='true'], .sr-only")) continue;
          if (rect.right > width + 1 && !clips(el)) {
            offenders.push(`${el.tagName.toLowerCase()}.${el.className}`.slice(0, 80));
          }
        }
        return {
          scrollWidth: document.documentElement.scrollWidth,
          width,
          offenders: offenders.slice(0, 5),
        };
      });
      expect(overflow.offenders).toEqual([]);
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.width);

      // The page heading never starts out hidden under the fixed nav chips.
      const heading = page.getByRole("heading", { level: 1 });
      await expect(heading).toBeVisible();
      const headingBox = await heading.boundingBox();
      for (const chip of [
        trigger(page),
        page.locator("header").getByRole("link", { name: LOGO_NAME }),
      ]) {
        expect(intersects(headingBox!, (await chip.boundingBox())!)).toBe(false);
      }
      expect(errors).toEqual([]);
    });
  }

  test("jumping to #book does not tuck the booking heading under the fixed nav", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto("/");
    await page.getByRole("link", { name: "Book Now" }).click();
    await expect(page).toHaveURL(/\/ayurveda#book$/);
    const heading = page.locator("#book-heading");
    await expect(heading).toBeInViewport();
    await page.waitForTimeout(800); // smooth scroll
    const headingBox = (await heading.boundingBox())!;
    const chipBox = (await trigger(page).boundingBox())!;
    expect(headingBox.y).toBeGreaterThanOrEqual(chipBox.y + chipBox.height);
  });
});

test.describe("boundaries: hostile URLs", () => {
  const unpublished = "/blogs/ritucharya-seasonal-living";
  const notFound = [
    "/definitely-not-a-page",
    "/blogs/not-a-real-post",
    unpublished,
    "/ayurveda/extra/segments",
    "/100%25-natural",
    "/%",
    "/a%ZZb",
    "/%E0%A4",
    "/%E0%A4%86%E0%A4%AF%E0%A5%81%E0%A4%B0%E0%A5%8D%E0%A4%B5%E0%A5%87%E0%A4%A6",
    "/..%2F..%2Fetc%2Fpasswd",
    `/${"a".repeat(1500)}`,
  ];

  for (const path of notFound) {
    test(`unknown route ${path.slice(0, 40)} renders the branded 404`, async ({ page }) => {
      const errors = watchErrors(page);
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("heading", { level: 1 })).toContainText("Oops");
      // The nav still works on the 404 screen.
      await expectMenuWorks(page);
      expect(errors).toEqual([]);
    });
  }

  test("percent signs and broken escapes never cause a server error", async ({ request }) => {
    for (const path of ["/%", "/%25", "/blogs/%25", "/a%ZZb", "/%E0%A4", "/about%"]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(404);
    }
  });

  test("upper-case URLs redirect to the canonical lower-case page", async ({ page }) => {
    for (const [path, canonical] of [
      ["/AYURVEDA", "/ayurveda"],
      ["/About", "/about"],
      ["/Blogs/Dinacharya-Daily-Routine?ref=Flyer", "/blogs/dinacharya-daily-routine?ref=Flyer"],
    ]) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      expect(new URL(page.url()).pathname + new URL(page.url()).search).toBe(canonical);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
    // Static files keep their exact names.
    const asset = await page.request.get("/ASSETS.md");
    expect(asset.status()).toBe(200);
  });

  test("script in query strings and hashes is never executed", async ({ page }) => {
    let dialogs = 0;
    page.on("dialog", async (dialog) => {
      dialogs += 1;
      await dialog.dismiss();
    });
    for (const path of [
      "/?q=<script>window.__xss=1</script>",
      `/blogs?x="><img src=x onerror="window.__xss=1">`,
      "/contact#<img src=x onerror=alert(1)>",
      "/ayurveda?service=javascript:alert(1)",
    ]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(await page.evaluate(() => (window as { __xss?: number }).__xss)).toBeUndefined();
    }
    expect(dialogs).toBe(0);
  });

  test("a browser without IntersectionObserver still gets a working site", async ({ page }) => {
    await page.addInitScript(() => {
      // Some embedded web views and older browsers ship without it.
      delete (window as { IntersectionObserver?: unknown }).IntersectionObserver;
    });
    const errors = watchErrors(page);
    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.mouse.wheel(0, 1500);
    // The nav chips still switch to solid once scrolled.
    await expect(page.locator("html")).toHaveAttribute("data-scrolled", "");
    await expectMenuWorks(page);
    expect(errors).toEqual([]);
  });

  test("a browser without matchMedia gets the home page without the video", async ({ page }) => {
    await page.addInitScript(() => {
      delete (window as { matchMedia?: unknown }).matchMedia;
    });
    const errors = watchErrors(page);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Rooted in Ancient Wisdom");
    await expect(page.locator("video")).toHaveCount(0);
    expect(errors).toEqual([]);
  });

  test("an unexpected crash inside a page shows the branded error screen, not a blank page", async ({
    page,
  }) => {
    // A broken browser API (here matchMedia throwing, as some privacy extensions do) makes the
    // home page's video component throw while rendering.
    await page.addInitScript(() => {
      window.matchMedia = () => {
        throw new Error("matchMedia blocked");
      };
    });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Something Went Wrong");
    await expect(page.getByRole("button", { name: "Try Again" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to Home" })).toBeVisible();
    // The root layout survived: the nav menu still works around the error screen.
    await expectMenuWorks(page);
  });
});

test.describe("boundaries: forms under bad network conditions", () => {
  async function fillBooking(page: Page) {
    await page.getByLabel("Full Name").fill("Test Person");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Phone").fill("+91 98765 43210");
    await page
      .getByLabel("Preferred Date")
      .fill(new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10));
  }

  test("triple-clicking Book Now sends exactly one request", async ({ page }) => {
    let requests = 0;
    await page.route("**/api/book", async (route) => {
      requests += 1;
      await new Promise((resolve) => setTimeout(resolve, 800));
      await route.fulfill({ json: { ok: true } });
    });
    await page.goto("/ayurveda");
    await fillBooking(page);
    await page.getByRole("button", { name: "Book Now" }).click({ clickCount: 3 });
    await page.keyboard.press("Enter");
    await expect(page.getByRole("status")).toContainText("Your request is in");
    expect(requests).toBe(1);
  });

  test("hammering Enter in the contact form sends exactly one request", async ({ page }) => {
    let requests = 0;
    await page.route("**/api/contact", async (route) => {
      requests += 1;
      await new Promise((resolve) => setTimeout(resolve, 800));
      await route.fulfill({ json: { ok: true } });
    });
    await page.goto("/contact");
    await page.getByLabel("Full Name").fill("Test Person");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Message").fill("Hello, I would like to know more about Panchakarma.");
    await page.getByLabel("Email").focus();
    for (let i = 0; i < 5; i += 1) await page.keyboard.press("Enter");
    await expect(page.getByRole("status")).toContainText("Your message is on its way");
    expect(requests).toBe(1);
  });

  const failures: [string, Parameters<import("@playwright/test").Route["fulfill"]>[0] | "abort"][] =
    [
      ["the connection drops", "abort"],
      [
        "a proxy returns an HTML error page",
        { status: 502, contentType: "text/html", body: "<h1>502 Bad Gateway</h1>" },
      ],
      ["the API fails without a message", { status: 500, json: { ok: false } }],
      ["the API returns an empty body", { status: 200, body: "" }],
    ];

  for (const [label, failure] of failures) {
    test(`booking shows an error and can retry when ${label}`, async ({ page }) => {
      const errors = watchErrors(page);
      let attempt = 0;
      await page.route("**/api/book", async (route) => {
        attempt += 1;
        if (attempt > 1) return route.fulfill({ json: { ok: true } });
        if (failure === "abort") return route.abort("connectionreset");
        return route.fulfill(failure);
      });
      await page.goto("/ayurveda");
      await fillBooking(page);
      const submit = page.getByRole("button", { name: "Book Now" });
      await submit.click();

      const alert = page.locator("form [role='alert']");
      await expect(alert).toBeVisible();
      expect((await alert.innerText()).trim().length).toBeGreaterThan(10);
      await expect(submit).toBeEnabled();

      await submit.click();
      await expect(page.getByRole("status")).toContainText("Your request is in");
      expect(errors.filter((e) => !e.includes("Failed to load resource"))).toEqual([]);
    });
  }

  test("a request that never answers times out instead of spinning forever", async ({ page }) => {
    await page.clock.install();
    await page.route("**/api/book", () => {
      // Never fulfilled.
    });
    await page.goto("/ayurveda");
    await fillBooking(page);
    const submit = page.getByRole("button", { name: "Book Now" });
    await submit.click();
    await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
    await page.clock.runFor(30_000);
    await expect(page.locator("form [role='alert']")).toBeVisible();
    await expect(submit).toBeEnabled();
  });
});
