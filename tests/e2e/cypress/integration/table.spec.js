import Table from "../page-objects/Table";

describe("Table Tests", () => {
  const table = new Table();
  it("should load the table page", () => {
    table.visit(2);
  });
  it("should not show the payments page if there is no payments", () => {
    table.visit(3);
    cy.get("[data-cy=payments]").should("not.be.visible");
  });
  it("should be able to add a payment", () => {
    table.visit(2);
    table.addPayment(45.5);
  });
});
