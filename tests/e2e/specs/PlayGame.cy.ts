describe("Rendering", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Renders descripiton", () => {
    cy.contains("Arithmetic Game").should("exist");
    cy.contains(
      "Try to solve as many problems as you can in a given amount of time."
    ).should("exist");
  });
});
