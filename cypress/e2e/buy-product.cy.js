import { NAVIGATION_BAR } from "../pageObjects/navigation"
import { SHOP_PAGE } from "../pageObjects/shop"
import { CART_PAGE } from "../pageObjects/cart"
import {STUFFED_FROG, FLUFFY_BUNNY, VALENTINE_BEAR} from "../data/products"

const navigationBar = NAVIGATION_BAR
const shopPage = SHOP_PAGE
const cartPage = CART_PAGE

const product1 = STUFFED_FROG
const product2 = FLUFFY_BUNNY
const product3 = VALENTINE_BEAR

//product is the item to be selected on the shop
//quantity is the number of the product to be added on the cart
function addToCard (product, quantity) {
    for (let i = 0; i < quantity; i++)
    {
      cy.get(shopPage.PRODUCT_TITLE).contains(product).parent().find(shopPage.BUY_BTN).click()
    }
}

//product is an item on the cart
//unitPrice is the expected unit price of the product
//quantity is the expected number of the product added on the cart
function verifyPrice (product, unitPrice, quantity) {
  cy.get(cartPage.CART_TABLE).contains(cartPage.TABLE_ROW, product).then( tableRow => {
    cy.wrap(tableRow).find(cartPage.TABLE_DATA).eq(3).should('contain', unitPrice * quantity)
    cy.wrap(tableRow).find(cartPage.TABLE_DATA).eq(1).should('contain', unitPrice)
  })
}

describe("Visit shop page", () => {
  beforeEach(function () {
    cy.visit("/#/shop")
  })

    it("Test Case 3 - add to card then verify price", () => {

      //1. Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
      const quantity1 = 2
      const quantity2 = 5
      const quantity3 = 3

      addToCard(product1.name, quantity1)
      addToCard(product2.name, quantity2)
      addToCard(product3.name, quantity3)
        
      //2. Go to the cart page
      cy.get(navigationBar.CART_NAV).click()

      //3. Verify the subtotal for each product is correct
      //4. Verify the price for each product
      verifyPrice(product1.name, product1.unitPrice, quantity1)
      verifyPrice(product2.name, product2.unitPrice, quantity2)
      verifyPrice(product3.name, product3.unitPrice, quantity3)

      //5. Verify that total = sum(sub totals)
      cy.get(cartPage.SUBTOTAL_DATA).then(($cells) => {
        const subtotals = $cells.toArray()
                            .map((el) => el.innerText)
                            .map((unitTotal) => unitTotal.replace('$',''))
                            .map(parseFloat)
        const sum = Cypress._.sum(subtotals)

        cy.get(cartPage.TOTAL).invoke('text')
                        .then((total) => total.replace('Total: ',''))
                        .then(parseFloat)
                        .should('equal',sum)                
      })
      
    })

})
