context('React Counter', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/counter-changing-prop-buttons');
  });

  it('works the counter', () => {
    cy.contains('set to 1').click();
    cy.get('[data-test="counter-count"]').contains(1);
    cy.contains('set to 2').click();
    cy.get('[data-test="counter-count"]').contains(2);
    cy.contains('set to 1').click();
    cy.get('[data-test="counter-count"]').contains(1);
    cy.contains('set to 0').click();
    cy.get('[data-test="counter-count"]').contains(0);
    cy.contains('set to -1').click();
    cy.get('[data-test="counter-count"]').contains(-1);
  });
});
