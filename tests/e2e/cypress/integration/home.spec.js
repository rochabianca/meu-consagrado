import Home from "../page-objects/Home";

describe("Home Tests", () => {
  const home = new Home();
  it("should load the home page", () => {
    home.goHome();
  });
  it("should be able to go to about page", () => {
    home.clickOnNavbarLink("navbar-link-Sobre");
    cy.get("[data-cy=about-page]").should("be.visible");
  });
  it("should be able to click on a table and go to table page", () => {
    home.goHome();
    home.clickOnTable(2);
    cy.get("[data-cy=table-page]").should("be.visible");
  });
});
