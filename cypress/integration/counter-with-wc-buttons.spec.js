context('Counter with WebComponent Buttons', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/counter-with-wc-buttons');
  });

  it('works the counter', () => {
    cy.contains('increase')
      .click()
      .click();

    cy.get('[data-test="counter-count"]').contains(2);

    cy.contains('decrease')
      .click()
      .click()
      .click();

    cy.get('[data-test="counter-count"]').contains(-1);
  });
});
