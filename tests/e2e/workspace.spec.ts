import { expect, test } from "@playwright/test";

test.describe("Workspace protected routes redirection", () => {
  const workspaceRoutes = [
    "/overview",
    "/insights",
    "/report",
    "/ask",
    "/sources",
    "/evaluation",
  ];

  for (const route of workspaceRoutes) {
    test(`unauthenticated user accessing ${route} is redirected to /login`, async ({
      page,
    }) => {
      await page.goto(route);
      await expect(page).toHaveURL(/\/login/);
    });
  }
});
