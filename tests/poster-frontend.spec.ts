const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Poster Frontend", () => {
  beforeEach(async ({ page, request }) => {
    // Resetting(clearing) posts collection at database
    await request.post("http://localhost:3001/test/reset");

    await page.goto("http://localhost:5173");
  });

  test("front page can be opened", async ({ page }) => {
    await expect(page.getByText("Poster")).toBeVisible();
    await expect(
      page.getByText("Made using React, Redux, Express and MongoDB")
    ).toBeVisible();
  });

  test("post can be added", async ({ page }) => {
    await page.getByRole("button").click();
    await page
      .getByTestId("addPostTextarea")
      .fill("A post created by playwright");
    await page.getByRole("button", { name: "ADD POST" }).click();

    await expect(
      page.getByTestId("postExcerptContent", {
        name: "A post created by playwright",
      })
    ).toBeVisible();
  });

  describe("post management", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button").click();
      await page
        .getByTestId("addPostTextarea")
        .fill("A post created by playwright");
      await page.getByRole("button", { name: "ADD POST" }).click();
    });

    test("post can be deleted", async ({ page }) => {
      await page
        .getByTestId("postExcerpt", { name: "A post created by playwright" })
        .click();
      await page.getByTestId("deleteBtn").click();
      await page.getByTestId("deleteModalDeleteConfirmationBtn").click();

      await expect(page.getByText("No posts found")).toBeVisible();
    });
  });
});
