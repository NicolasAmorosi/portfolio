import { expect, test, type Page } from "@playwright/test";

type Anchor = { path: number[]; top: number };

// Same addressing as LocaleSwitch: the element under the header, 60% across,
// as a child-index path from <main>, plus its offset in the viewport.
function anchorUnderHeader(page: Page): Promise<Anchor> {
  return page.evaluate(() => {
    const main = document.getElementById("main")!;
    const headerBottom = document.querySelector("body > header")!.getBoundingClientRect().bottom;
    const hit = document.elementFromPoint(innerWidth * 0.6, headerBottom + 8)!;
    const path: number[] = [];
    for (let node = hit; node !== main; node = node.parentElement!) {
      path.unshift(Array.prototype.indexOf.call(node.parentElement!.children, node));
    }
    return { path, top: hit.getBoundingClientRect().top };
  });
}

function topOf(page: Page, path: number[]): Promise<number> {
  return page.evaluate((path) => {
    let node: Element | undefined = document.getElementById("main")!;
    for (const index of path) node = node?.children[index];
    return node!.getBoundingClientRect().top;
  }, path);
}

async function switchTo(page: Page, locale: "en" | "es") {
  // A real pointer click: locator.click() would first scroll the sticky header "into view".
  const box = await page.locator(`header a[hreflang="${locale}"]`).boundingBox();
  if (!box) throw new Error(`No visible ${locale} link`);
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await expect(page.locator("html")).toHaveAttribute("lang", locale);
}

const routes = [
  ["/", "es"],
  ["/es", "en"],
  ["/projects/legacy-migration", "es"],
  ["/es/projects/libretto", "en"],
] as const;

for (const [path, locale] of routes) {
  test(`switching ${path} to ${locale} keeps the reading position`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() =>
      window.scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * 0.45, behavior: "instant" }),
    );
    const before = await anchorUnderHeader(page);

    await switchTo(page, locale);
    const settled = await page.evaluate(() => scrollY);
    await page.waitForTimeout(400);

    expect(await page.evaluate(() => scrollY), "no glide after the switch").toBe(settled);
    expect(Math.abs((await topOf(page, before.path)) - before.top)).toBeLessThanOrEqual(2);
  });
}

test("the name decodes once per visit, not on every language switch", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".decode")).toHaveAttribute("data-phase", "done", { timeout: 5_000 });
  await switchTo(page, "es");
  await expect(page.locator(".decode")).toHaveAttribute("data-phase", "done", { timeout: 300 });
});
