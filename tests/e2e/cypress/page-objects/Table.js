class Table {
  visit(table) {
    cy.visit(`/table/${table}`);
    cy.get("[data-cy=table-page]").should("be.visible");
  }
  getTotalValue() {
    cy.get('[data-cy="total"]').then(el => {
      Cypress.env({
        total: Number(
          el
            .text()
            .replace("R$ ", "")
            .replace(",", ".")
        )
      });
    });
  }
  openModal() {
    cy.get('[data-cy="add-payment-button"]').click();
    cy.get('[data-cy="payment-modal"]').should("be.visible");
  }
  typeValue(value) {
    cy.get('[data-cy="payment-input"]').type(value);
  }
  addPayment(value) {
    this.getTotalValue();
    const valueFiltered = value.toFixed(2).replace(".", ",");
    this.openModal();
    this.typeValue(value);
    cy.get('[data-cy="payment-modal-primary-button"]').click();
    cy.get("[data-cy=payments]").should("be.visible");
    cy.get(":nth-child(3) > [data-cy=payments-payment]").contains(
      `R$ ${valueFiltered}`
    );
    // checks total
    cy.get('[data-cy="total"]').then(el => {
      const finalTotal = +el
        .text()
        .replace("R$ ", "")
        .replace(",", ".");

      expect(finalTotal).to.be.eq(+(Cypress.env("total") - value).toFixed(2));
    });
  }
}

export default Table;
