describe('Marketplace', () => {
  it('should add a product and delete it from the basket', () => {
    cy.addProductBasket();
    cy.get('[data-cy=basket]').should('include.text', 'Basket 1');
    cy.get('[data-cy=basket]').click();
    cy.get('[data-cy=basket-item]').should('have.length', 1);
    cy.get('[data-cy=basket-remove-btn]').first().click();
    cy.get('[data-cy=basket-item]').should('have.length', 0);
    cy.get('[data-cy=empty-basket]').should('include.text', 'no products');
  });

  it('should pay the product', () => {
    cy.addProductBasket();
    cy.get('[data-cy=basket]').should('include.text', 'Basket 1');
    cy.get('[data-cy=basket]').click();
    cy.get('[data-cy=basket-item]').should('have.length', 1);
    cy.get('[data-cy=basket-checkout-btn]').click();
    cy.get('[data-cy=checkout-pay-btn]').click();
    cy.url().should('include','/checkout');
    cy.get('[data-cy=checkout-success]').should('not.exist');
    cy.get('[data-cy=checkout-first-input]').type('John');
    cy.get('[data-cy=checkout-last-input]').type('Milton');
    cy.get('[data-cy=checkout-street-input]').type('Mulege 21');
    cy.get('[data-cy=checkout-city-input]').type('Guaymas');
    cy.get('[data-cy=checkout-state-input]').type('Sonora');
    cy.get('[data-cy=checkout-email-input]').type('john@microsoft.com');
    cy.get('[data-cy=checkout-pay-btn]').click();
    cy.get('[data-cy=checkout-success]').should('exist');
    cy.get('[data-cy=checkout-buyMore-btn]').click();
    cy.get('[data-cy=showcase-container]').should('exist');
  });
})
