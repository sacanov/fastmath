import test, { expect } from "@playwright/test";

test.describe("rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8100/tabs/tab1");
  });
  test("header", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Arithmetic Game");
    await expect(page.getByRole("main")).toContainText(
      "Try to solve as many problems as you can in a given amount of time."
    );
    await expect(page.locator("h3")).toContainText("Options");
    await expect(page.getByRole("button", { name: "Reset" })).toBeVisible;
  });

  test("cards", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Addition" })).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Subtraction" })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Multiplication" })
    ).toBeVisible();

    await expect(page.getByRole("heading", { name: "Division" })).toBeVisible();

    await expect(page.locator("ion-card-content")).toHaveText([
      "Range: (2 to 99) + (2 to 99) 0 decimal places",
      "Addition problems in reverse",
      "Range: (2 to 12) x (2 to 99) 0 decimal places",
      "Multiplication problems in reverse",
    ]);

    await page.getByTestId("open-subtraction-options").click();

    await page.getByTestId("same-as-addition").click();

    await page.getByRole("button", { name: "ok" }).click();

    await page.getByTestId("open-division-options").click();

    await page.getByTestId("same-as-multiplication").click();

    await page.getByRole("button", { name: "ok" }).click();

    await expect(page.locator("ion-card-content")).toContainText([
      "Range: (2 to 99) + (2 to 99) 0 decimal places",
      "Range: (2 to 198) - (2 to 99) 0 decimal placesNo negative results ",
      "Range: (2 to 12) x (2 to 99) 0 decimal places",
      "Range: (4 to 1188) / (2 to 12) 0 decimal places",
    ]);
  });
});

test.describe("modals", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8100/tabs/tab1");
  });

  test("addition inputs work, integer input values", async ({ page }) => {
    await page.getByTestId("open-addition-options").click();
    await expect(page.locator(".props-content")).toContainText([
      "Range: ( to ) + ( to )  Decimal places",
    ]);
    const inputComponents = await page.getByTestId("ranges-input");

    await expect(inputComponents).toHaveCount(4);

    await expect(inputComponents.nth(0)).toHaveJSProperty("value", 2);
    await expect(inputComponents.nth(1)).toHaveJSProperty("value", 99);
    await expect(inputComponents.nth(2)).toHaveJSProperty("value", 2);
    await expect(inputComponents.nth(3)).toHaveJSProperty("value", 99);

    await expect(page.getByTestId("decimal-places")).toHaveJSProperty(
      "value",
      0
    );

    const testValues = ["10", "90", "10", "90"];
    const inputs = await inputComponents.locator("input");

    for (let [i, input] of (await inputs.all()).entries()) {
      await input.fill(testValues[i]);
    }

    await page.getByTestId("decimal-places").locator("input").fill("3gd");

    await page.getByRole("button", { name: "ok" }).click();

    await expect(page.locator("ion-card-content")).toContainText([
      "Range: (10 to 90) + (10 to 90) 3 decimal places",
      "Addition problems in reverse",
      "Range: (2 to 12) x (2 to 99) 0 decimal places",
      "Multiplication problems in reverse",
    ]);
  });

  test("subtraction inputs work, integer input values", async ({ page }) => {
    await page.getByTestId("open-subtraction-options").click();
    await expect(page.locator(".props-content")).toContainText([
      "Addition problems in reverse Range: ( to ) - ( to ) Allow negative resultsDecimal places",
    ]);
    const inputComponents = await page.getByTestId("ranges-input");

    await expect(inputComponents).toHaveCount(4);

    await expect(inputComponents.nth(0)).toHaveJSProperty("value", 2);
    await expect(inputComponents.nth(1)).toHaveJSProperty("value", 198);
    await expect(inputComponents.nth(2)).toHaveJSProperty("value", 2);
    await expect(inputComponents.nth(3)).toHaveJSProperty("value", 12);

    await expect(page.getByTestId("decimal-places")).toHaveJSProperty(
      "value",
      0
    );

    const inputs = await inputComponents.locator("input");

    for (let input of await inputs.all()) {
      await expect(input).toBeDisabled();
    }

    await page.getByTestId("same-as-addition").click();

    const testValues = ["1fg0", "9aE0", "1fda0", "9sg0"];

    for (let [i, input] of (await inputs.all()).entries()) {
      await input.fill(testValues[i]);
    }

    await page.getByTestId("decimal-places").locator("input").fill("3df");

    await page.getByTestId("negative-results-checkbox").click();

    await page.getByRole("button", { name: "ok" }).click();

    await expect(page.locator("ion-card-content")).toContainText([
      "Range: (2 to 99) + (2 to 99) 0 decimal places",
      "Range: (10 to 90) - (10 to 90) 3 decimal places negative results ",
      "Range: (2 to 12) x (2 to 99) 0 decimal places",
      "Multiplication problems in reverse",
    ]);
  });

  test("multiplication inputs work, integer input values", async ({ page }) => {
    await page.getByTestId("open-multiplication-options").click();
    await expect(page.locator(".props-content")).toContainText([
      "Range: ( to ) x ( to )  Decimal places",
    ]);
    const inputComponents = await page.getByTestId("ranges-input");

    await expect(inputComponents).toHaveCount(4);

    await expect(inputComponents.nth(0)).toHaveJSProperty("value", 2);
    await expect(inputComponents.nth(1)).toHaveJSProperty("value", 12);
    await expect(inputComponents.nth(2)).toHaveJSProperty("value", 2);
    await expect(inputComponents.nth(3)).toHaveJSProperty("value", 99);

    await expect(page.getByTestId("decimal-places")).toHaveJSProperty(
      "value",
      0
    );

    const testValues = ["fg-5d", "da7", "10SDF", "90daf"];
    const inputs = await inputComponents.locator("input");

    for (let [i, input] of (await inputs.all()).entries()) {
      await input.fill(testValues[i]);
    }

    await page.getByTestId("decimal-places").locator("input").fill("3dsf");

    await page.getByRole("button", { name: "ok" }).click();

    await expect(page.locator("ion-card-content")).toContainText([
      "Range: (2 to 99) + (2 to 99) 0 decimal places",
      "Addition problems in reverse",
      "Range: (5 to 7) x (10 to 90) 3 decimal places",
      "Multiplication problems in reverse",
    ]);
  });

  test("division inputs work, integer input values", async ({ page }) => {
    await page.getByTestId("open-division-options").click();
    await expect(page.locator(".props-content")).toContainText([
      "Multiplication problems in reverse Range: ( to ) / ( to ) Decimal places",
    ]);
    const inputComponents = await page.getByTestId("ranges-input");

    await expect(inputComponents).toHaveCount(4);

    await expect(inputComponents.nth(0)).toHaveJSProperty("value", 4);
    await expect(inputComponents.nth(1)).toHaveJSProperty("value", 1188);
    await expect(inputComponents.nth(2)).toHaveJSProperty("value", 2);
    await expect(inputComponents.nth(3)).toHaveJSProperty("value", 12);

    await expect(page.getByTestId("decimal-places")).toHaveJSProperty(
      "value",
      0
    );

    const inputs = await inputComponents.locator("input");

    for (let input of await inputs.all()) {
      await expect(input).toBeDisabled();
    }

    await page.getByTestId("same-as-multiplication").click();

    const testValues = ["9df", "1af-69", "3az", "1dx3"];

    for (let [i, input] of (await inputs.all()).entries()) {
      await input.fill(testValues[i]);
    }

    await page.getByTestId("decimal-places").locator("input").fill("3as");

    await page.getByRole("button", { name: "ok" }).click();

    await expect(page.locator("ion-card-content")).toContainText([
      "Range: (2 to 99) + (2 to 99) 0 decimal places",
      "Addition problems in reverse",
      "Range: (2 to 12) x (2 to 99) 0 decimal places",
      "Range: (9 to 169) / (3 to 13) 3 decimal places",
    ]);
  });
});

test.describe("empty values toast", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8100/tabs/tab1");
  });
  test("addition and multiplication", async ({ page }) => {
    const operations = ["Addition", "Multiplication"];
    let inputs;
    for (let operation of operations) {
      await page.getByTestId(`open-${operation.toLowerCase()}-options`).click();

      inputs = await page.getByTestId("ranges-input").locator("input");

      for (let input of await inputs.all()) {
        await input.fill("");
        await page.getByRole("button", { name: "ok" }).click();
        await expect(page.getByText("inputs cannot be empty")).toBeVisible();
        await input.fill("1");
      }

      await page.getByRole("button", { name: "ok" }).click();
    }
  });
  test("division and subtraction", async ({ page }) => {
    const operations = ["Subtraction", "Division"];
    let inputs;
    for (let operation of operations) {
      await page.getByTestId(`open-${operation.toLowerCase()}-options`).click();

      inputs = await page.getByTestId("ranges-input").locator("input");

      await page.getByTestId(/^same-as.*/).click();

      for (let input of await inputs.all()) {
        await input.fill("");
        await page.getByRole("button", { name: "ok" }).click();
        await expect(page.getByText("inputs cannot be empty")).toBeVisible();
        await input.fill("1");
      }

      await page.getByRole("button", { name: "ok" }).click();
    }
  });
});

test.describe("lower limit smaller than upper limit", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8100/tabs/tab1");
  });
  test("addition and multipliation", async ({ page }) => {
    const operations = ["Addition", "Multiplication"];
    let inputsList;
    for (let operation of operations) {
      await page.getByTestId(`open-${operation.toLowerCase()}-options`).click();

      inputsList = await page
        .getByTestId("ranges-input")
        .locator("input")
        .all();

      for (let i = 0; i < 2; i++) {
        await inputsList[2 * i].fill("4");
        await inputsList[2 * i + 1].fill("2");
        await page.getByRole("button", { name: "ok" }).click();
        await expect(
          page.getByText("Lower bound must be smaller than upper bound")
        ).toBeVisible();
        await inputsList[2 * i].fill("4");
        await inputsList[2 * i + 1].fill("4");
      }

      await page.getByRole("button", { name: "ok" }).click();
      await expect(page.getByText("ok")).toHaveCount(0);
    }
  });
  test("subtraction and division", async ({ page }) => {
    const operations = ["Subtraction", "Division"];
    let inputsList;
    for (let operation of operations) {
      await page.getByTestId(`open-${operation.toLowerCase()}-options`).click();

      await page.getByTestId(/^same-as.*/).click();

      inputsList = await page
        .getByTestId("ranges-input")
        .locator("input")
        .all();

      for (let i = 0; i < 2; i++) {
        await inputsList[2 * i].fill("4");
        await inputsList[2 * i + 1].fill("2");
        await page.getByRole("button", { name: "ok" }).click();
        await expect(
          page.getByText("Lower bound must be smaller than upper bound")
        ).toBeVisible();
        await inputsList[2 * i].fill("4");
        await inputsList[2 * i + 1].fill("4");
      }

      await page.getByRole("button", { name: "ok" }).click();
      await expect(page.getByText("ok")).toHaveCount(0);
    }
  });
});

test("at least one operation selected", async ({ page }) => {
  await page.goto("http://localhost:8100/tabs/tab1");

  const checkboxList = await page.getByTestId(/.*-check$/).all();

  expect(checkboxList).toHaveLength(4);

  for (let checkbox of checkboxList) {
    await checkbox.click();
  }

  await page.getByTestId("start-game-button").click();

  await expect(
    page.getByText("At least one operation must be selected")
  ).toBeVisible();
});
