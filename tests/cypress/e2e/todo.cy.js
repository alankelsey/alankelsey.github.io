/// <reference types="cypress" />

const { kMaxLength } = require("buffer")

describe('example to-do app', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('/')
  })

  it.only('can add new todo items', () => {
    // We'll store our item text in a variable so we can reuse it
    // const newItem = 'Feed the cat'
    const newItem = 'this us a test'
    console.log(newItem.length)

    // cy.get('body > form > textarea').type(`${newItem}`)
    // cy.get('#addBtn').click()

    cy.addTodo(`${newItem}`)

    cy.get('body > section > div > div:nth-child(1) > textarea')
      .should('have.length', 1)
      .should('have.attr', 'MaxLength', '73')
      .should('have.text', newItem)
  })

  // it('can check off an item as completed', () => {
  
  // })
})
