context('React Counter', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/react-counter');
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
