import { expect, test } from "@playwright/test";

test.describe("Protected routes redirection", () => {
  test("unauthenticated user accessing /services is redirected to /login", async ({
    page,
  }) => {
    await page.goto("/services");
    await expect(page).toHaveURL(/\/login/);
  });

  test("unauthenticated user accessing /profile is redirected to /login", async ({
    page,
  }) => {
    await page.goto("/profile");
    await expect(page).toHaveURL(/\/login/);
  });

  test("unauthenticated user accessing /onboarding/resources is redirected to /login", async ({
    page,
  }) => {
    await page.goto("/onboarding/resources");
    await expect(page).toHaveURL(/\/login/);
  });
});