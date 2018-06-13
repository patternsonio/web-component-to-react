context('React Counter', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/counter-with-radio-button');
  });

  it('works the counter', () => {
    cy.get('button')
      .click()
      .click();

    cy.get('[data-test="counter-count"]').contains(2);

    cy.contains('decrease').click();

    cy.get('button')
      .click()
      .click()
      .click();

    cy.get('[data-test="counter-count"]').contains(-1);

    cy.contains('increase').click();

    cy.get('button').click();

    cy.get('[data-test="counter-count"]').contains(0);
  });
});
