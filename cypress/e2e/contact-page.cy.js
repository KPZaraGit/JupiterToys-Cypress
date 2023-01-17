import {CONTACT_1} from "../data/contacts"

const contact1 = CONTACT_1
const message = 'This is a looooooooong text in message.'

describe("Visit contact page", () => {
  beforeEach(function () {
    //1. From the home page go to contact page
    cy.visit("/")
    cy.get('#nav-contact').click()
  })

  it("Test Case 1 - error message test", () => {

    //2. Click submit button
    cy.get('.btn-contact').click()

    //3. Verify error messages
    cy.get('.alert-error').should('be.visible').contains('but we won\'t get it unless you complete the form correctly.')
    cy.get('#forename-err').should('be.visible').should('have.text','Forename is required')
    cy.get('#email-err').should('be.visible').should('have.text','Email is required')
    cy.get('#message-err').should('be.visible').should('have.text','Message is required')

    //4. Populate mandatory fields
    cy.get('#forename').type(contact1.name)
    cy.get('#email').type(contact1.email)
    cy.get('#message').type(message)

    //5. Validate errors are gone
    cy.get('#forename-err').should('not.exist')
    cy.get('#email-err').should('not.exist')
    cy.get('#message-err').should('not.exist')

  })

  it("Test Case 2 - successful submission message test", () => {

    //2. Populate mandatory fields
    cy.get('#forename').type(contact1.name)
    cy.get('#email').type(contact1.email)
    cy.get('#message').type(message)

    //3. Click submit button
    cy.get('.btn-contact').click()
    
    cy.get('.popup.modal').should('be.visible')
    
    //4. Validate successful submission message
    cy.get('.alert-success').should('be.visible')
                            .should('contain','Thanks Kevin Tester, we appreciate your feedback.')
  })  
})
