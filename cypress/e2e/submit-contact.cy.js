import { HOME } from "../fixtures/navigation"
import { CONTACT_PAGE } from "../pageObjects/contact"
import { NAVIGATION_BAR } from "../pageObjects/navigation"
import { CONTACT_1 } from "../data/contacts"
import { CONTACT_ERROR } from "../fixtures/errorMsg"

const home = HOME
const contactPage = CONTACT_PAGE
const navigationBar = NAVIGATION_BAR
const contact1 = CONTACT_1
const contactError = CONTACT_ERROR

const message = 'This is a looooooooong text in message.'

describe("Visit contact page", () => {
  beforeEach(function () {
    //1. From the home page go to contact page
    cy.visit(home)
    cy.get(navigationBar.CONTACT_NAV).click()
  })

  it("Test Case 1 - error message test", () => {

    //2. Click submit button
    cy.get(contactPage.SUBMIT_BTN).click()

    //3. Verify error messages
    cy.get(contactPage.ALERT_MSG).should('be.visible').should('contain', contactError.ALERT_MSG)
    cy.get(contactPage.FORENAME_ERROR_MSG).should('be.visible').should('have.text', contactError.NO_FORENAME_MSG)
    cy.get(contactPage.EMAIL_ERROR_MSG).should('be.visible').should('have.text', contactError.NO_EMAIL_MSG)
    cy.get(contactPage.MESSAGE_ERROR_MSG).should('be.visible').should('have.text', contactError.NO_MESSAGE_MSG)

    //4. Populate mandatory fields
    cy.get(contactPage.FORENAME_TXT).type(contact1.name)
    cy.get(contactPage.EMAIL_TXT).type(contact1.email)
    cy.get(contactPage.MESSAGE_TXT).type(message)

    //5. Validate errors are gone
    cy.get(contactPage.ALERT_MSG).should('not.exist')
    cy.get(contactPage.FORENAME_ERROR_MSG).should('not.exist')
    cy.get(contactPage.EMAIL_ERROR_MSG).should('not.exist')
    cy.get(contactPage.MESSAGE_ERROR_MSG).should('not.exist')

  })

  it("Test Case 2 - successful submission message test", () => {

    //2. Populate mandatory fields
    cy.get(contactPage.FORENAME_TXT).type(contact1.name)
    cy.get(contactPage.EMAIL_TXT).type(contact1.email)
    cy.get(contactPage.MESSAGE_TXT).type(message)

    //3. Click submit button
    cy.get(contactPage.SUBMIT_BTN).click()
    
    cy.get(contactPage.POPUP_MDL).should('be.visible')
    
    //4. Validate successful submission message
    cy.get(contactPage.SUCCESS_SUBMISSION_MSG).should('be.visible')
                                              .should('contain',`Thanks ${contact1.name}, we appreciate your feedback.`)
  })  
})
