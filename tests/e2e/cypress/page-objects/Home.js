class Home {
  goHome() {
    cy.visit("/");
    cy.get("[data-cy=home]").should("be.visible");
  }
  clickOnNavbarLink(link) {
    cy.get(`[data-cy=${link}]`).click();
  }
  clickOnTable(table) {
    cy.get(`[data-cy=table-${table}]`).click();
  }
}

export default Home;
