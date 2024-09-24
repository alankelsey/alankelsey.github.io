/// <reference types="cypress" />

const { kMaxLength } = require("buffer")

describe('example to-do app', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('/')
  })

  const newItem = 'Feed the cat'

  it('can add new todo items', () => {
    // We'll store our item text in a variable so we can reuse it
    // const newItem = 'Feed the cat'

    cy.addTodo(`${newItem}`)

    cy.get('body > section > div > div:nth-child(1) > textarea')
      .should('have.length', 1)
      .should('have.attr', 'MaxLength', '73')
      .should('have.text', newItem)
  })

  it.only('can check off an item as completed', () => {

    cy.addTodo(`${newItem}`)
    cy.get('body > section > div > div > div > button:nth-child(2)').click()

    cy.get('body > section > div').should('not.contain', newItem)
  })

  it.only('can edit an wxisting item', () => {

    cy.addTodo(`${newItem}`)
    cy.get('body > section > div > div > div > button:nth-child(1)').click()
    cy.get('body > form > textarea').clear().type('test')
    cy.get('#addBtn').click()

    cy.get('body > section > div').should('contain', 'test')
  })
})
