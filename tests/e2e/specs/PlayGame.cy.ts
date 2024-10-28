describe("Rendering", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Renders header", () => {
    cy.contains("Arithmetic Game").should("exist");
    cy.contains(
      "Try to solve as many problems as you can in a given amount of time."
    ).should("exist");
    cy.contains("Options").should("exist");
  });
  it("Renders Addition card", () => {
    // cy.log(.text);
    cy.contains("Addition")
      .closest("ion-card")
      .contains("Range: (2 to 99) + (2 to 99)")
      .should("exist");

    cy.contains("Addition")
      .closest("ion-card")
      .contains("0 decimal places")
      .should("exist");

    cy.contains("Addition")
      .closest("ion-card")
      .find("ion-icon")
      .click({ force: true })
      .wait(500);

    // cy.find(".button-native");

    // cy.contains("Range").should("exist");
  });

  it("Renders subtraction card", () => {
    cy.contains("Subtraction")
      .closest("ion-card")
      .contains("Addition problems in reverse")
      .should("exist");

    cy.contains("Subtraction").closest("ion-card").find("ion-checkbox").click();
  });
});
