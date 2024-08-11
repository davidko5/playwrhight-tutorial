import { describe } from "node:test";

const { test, expect } = require("@playwright/test");

describe("Poster Frontend", () => {
  test("front page can be opened", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await expect(page.getByText("Poster")).toBeVisible();
    await expect(
      page.getByText("Made using React, Redux, Express and MongoDB")
    ).toBeVisible();
  });

  test("post can be added", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.getByRole("button").click();
  });
});
