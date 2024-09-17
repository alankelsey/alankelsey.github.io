/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('/')
  })

  it.only('can add new todo items', () => {
    // We'll store our item text in a variable so we can reuse it
    // const newItem = 'Feed the cat'
    const newItem = 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'
    console.log(newItem.length)

    // cy.get('body > form > textarea').type(`${newItem}`)
    // cy.get('#addBtn').click()

    cy.addTodo(`${newItem}`)

    cy.get('body > section > div > div > p')
      .should('have.length', 1)
      .last()
      .should('have.text', newItem)
  })

  // it('can check off an item as completed', () => {
  
  // })
})
