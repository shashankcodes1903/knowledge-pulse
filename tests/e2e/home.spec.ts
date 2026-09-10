import { expect, test } from "@playwright/test";

test("homepage loads successfully with public navbar and CTAs", async ({
  page,
}) => {
  await page.goto("/");

  // Check branding
  await expect(page.locator("header")).toBeVisible();
  await expect(
    page.locator("header").getByRole("link", { name: /knowledgepulse/i }),
  ).toBeVisible();

  // Check sign in and get started CTAs
  await expect(page.getByRole("link", { name: /sign in/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /get started/i }).first(),
  ).toBeVisible();

  // Check hero section
  await expect(
    page.getByRole("heading", {
      name: /your customers are telling you what to fix/i,
    }),
  ).toBeVisible();
});