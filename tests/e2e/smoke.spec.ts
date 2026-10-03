import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
  test("home shows the hero and links to Ayurveda", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Rooted in Ancient Wisdom");
    await page.getByRole("link", { name: "Ayurveda" }).first().click();
    await expect(page).toHaveURL(/\/ayurveda$/);
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
    await expect(page).toHaveURL(/\/blogs$/);
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
