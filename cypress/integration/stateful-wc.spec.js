context('React Counter', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stateful-wc');
  });

  it('works the counter', () => {
    cy.get('input').type('Hello, World');
    cy.get('stateful-div').contains('Hello, World');
  });
});
