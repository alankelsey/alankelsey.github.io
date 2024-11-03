/// <reference types="cypress" />

describe('Questions Page E2E Test Suite', () => {
    beforeEach(() => {
      cy.visit('https://alankelsey.github.io/questions.html#');
      cy.viewport(1920, 1080)
    //   cy.visit('/')
    });
  
    it('Should load the page with correct titles and structure', () => {
      cy.get('h1').contains('Interview Questions').should('be.visible');
      cy.get('#category-links').should('be.visible');
    });
  
    it('Should display categories and allow clicking each one', () => {
      cy.get('#category-links a').each((categoryLink) => {
        cy.wrap(categoryLink).click();
        cy.get('#subcategories-heading').should('be.visible');
      });
    });
  
    it('Should display subcategories when a category is clicked', () => {
      cy.get('#category-links a').first().click();
      cy.get('#subcategory-links a').should('have.length.greaterThan', 0);
    });
  
    it('Should display questions when a subcategory is clicked', () => {
      cy.get('#category-links a').first().click();
      cy.get('#subcategory-links a').first().click();
      cy.get('#questions').should('be.visible');
      cy.get('#questionText').should('not.be.empty');
    });
  
    it('Should navigate between questions using Next and Back buttons', () => {
      cy.get('#category-links a').first().click();
      cy.get('#subcategory-links a').first().click();
      cy.get('#nextBtn').click();
      cy.get('#backBtn').click();
    });
  
    it('Should disable Next button on the last question and Back on the first', () => {
      cy.get('#category-links a').first().click();
      cy.get('#subcategory-links a').first().click();
  
      cy.get('#backBtn').should('be.disabled');
      cy.get('#nextBtn').should('not.be.disabled');
  
      cy.get('#nextBtn').click({ multiple: true }).then(() => {
        cy.get('#nextBtn').should('be.disabled');
      });
    });
  
    it('Should reset to categories when clicking a new category', () => {
      cy.get('#category-links a').first().click();
      cy.get('#subcategory-links a').first().click();
  
      cy.get('#category-links a').last().click();
      cy.get('#subcategory-links a').should('not.be.empty');
    });
  });
  