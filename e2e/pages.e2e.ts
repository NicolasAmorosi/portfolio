import { expect, test } from "@playwright/test";

// Checks every page before the link goes out: nothing wider than the screen
// (the mobile project runs at 375px) and a preview image for when it's shared.
const slugs = ["libretto", "legacy-migration", "himnova-live", "hr-platform", "university-systems"];
const prefixes = ["", "/es", "/it", "/pt"];
const paths = prefixes.flatMap((prefix) => [prefix || "/", ...slugs.map((slug) => `${prefix}/projects/${slug}`)]);

for (const path of paths) {
  test(`${path} fits the screen and has a share preview`, async ({ page }) => {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, "horizontal overflow in px").toBeLessThanOrEqual(0);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
  });
}
