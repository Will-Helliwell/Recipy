describe('Homepage', () => {
  it('Displays the site title', () => {
    cy.visit("http://localhost:3000")
    cy.contains("Recipy")
  })
})
