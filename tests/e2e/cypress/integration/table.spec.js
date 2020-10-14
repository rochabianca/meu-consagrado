import Table from "../page-objects/Table";

describe("Table Tests", () => {
  const table = new Table();
  it("should load the table page", () => {
    table.visit(2);
  });
  it("should show a message when entering a invalid table", () => {
    table.visit(233);
    cy.get('[data-cy="table-error-message"]').should("be.visible");
  });
  it("should not show the payments page if there is no payments", () => {
    table.visit(3);
    cy.get("[data-cy=payments]").should("not.be.visible");
  });
  it("should be able to add a payment", () => {
    table.visit(3);
    table.addPayment(45.5);
  });
  it("should not be able to add a payment greater then the total", () => {
    table.openModal();
    table.typeValue(1000);
    cy.get('[data-cy="error-message"]').should("be.visible");
    cy.get('[data-cy="payment-modal-primary-button"]').should(
      "have.prop",
      "disabled"
    );
  });
  it("should not be able to click on pay without putting a value", () => {
    table.visit(3);
    table.openModal();
    table.clickOnPay();
    cy.get('[data-cy="error-message"]').should("be.visible");
  });
});
