import {STUFFED_FROG, FLUFFY_BUNNY, VALENTINE_BEAR} from "../data/products"

const product1 = STUFFED_FROG
const product2 = FLUFFY_BUNNY
const product3 = VALENTINE_BEAR

//product is the item to be selected on the shop
//quantity is the number of the product to be added on the cart
function addToCard (product, quantity) {
    for (let i = 0; i < quantity; i++)
    {
      cy.get('.product-title').contains(product).parent().find('.btn-success').click()
    }
}

//product is an item on the cart
//unitPrice is the expected unit price of the product
//quantity is the expected number of the product added on the cart
function verifyPrice (product, unitPrice, quantity) {
  cy.get('tbody').contains('tr',product).then( tableRow => {
    cy.wrap(tableRow).find('td').eq(3).should('contain', unitPrice * quantity)
    cy.wrap(tableRow).find('td').eq(1).should('contain', unitPrice)
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
      cy.get('#nav-cart').click()

      //3. Verify the subtotal for each product is correct
      //4. Verify the price for each product
      verifyPrice(product1.name, product1.unitPrice, quantity1)
      verifyPrice(product2.name, product2.unitPrice, quantity2)
      verifyPrice(product3.name, product3.unitPrice, quantity3)

      //5. Verify that total = sum(sub totals)
      cy.get('td:nth-child(4)').then(($cells) => {
        const subtotals = $cells.toArray()
                            .map((el) => el.innerText)
                            .map((unitTotal) => unitTotal.replace('$',''))
                            .map(parseFloat)
        const sum = Cypress._.sum(subtotals)

        cy.get('.total').invoke('text')
                        .then((total) => total.replace('Total: ',''))
                        .then(parseFloat)
                        .should('equal',sum)                
      })
      
    })

})
