describe('Checkout', () => {
    // Setup before each test
    beforeEach(() => {
        // Visit product page
        cy.visit('http://localhost:3000/');
        // Add product to cart
        cy.get('.products-grid .product-card:first-child button').click();
        // Add product to cart
        cy.get('.products-grid .product-card:last-child button').click();
        // Go to checkout
        cy.get('.cart-count').click();
    });

    it('displays products for review and customisation', () => {
        // Test that 2 cards are showing in checkout
        cy.get('.cart-grid').children().should('have.length', 2);
    });

    it('should display the correct cart total', async () => {
        let cartTotal = 0;
        let sumTotal = 0;

        cy.get('.cart-total')
            .then((el) => {
                // Get cart total from UI
                cartTotal = parseFloat(el[0].getAttribute('total'));
            })
            .then(() => {
                cy.get('.cart-card').each(
                    // Sum price of each cart item from UI
                    (card) => (sumTotal += parseFloat(card[0].getAttribute('price')))
                );
            })
            // Test that the total is correct
            .then(() => expect(cartTotal).to.equal(sumTotal));
    });

    it('should update cart total when components are changed', () => {
        let totalWindowsHome = 0;
        let totalWindowsPro = 0;

        // Get the total for when first product has Windows Home
        cy.get('.cart-card:first-child select[name="operatingSystem"]')
            .select(0)
            .then((e) => {
                cy.get('.cart-total').then((el) => {
                    totalWindowsHome = parseFloat(el[0].getAttribute('total'));
                });
            });
        // Get the total for when first product has Windows Pro
        cy.get('.cart-card:first-child select[name="operatingSystem"]')
            .select(1)
            .then((e) => {
                cy.get('.cart-total').then((el) => {
                    totalWindowsPro = parseFloat(el[0].getAttribute('total'));
                });
            })
            // Verify that cart total has updated
            .then(() => expect(totalWindowsHome).not.to.equal(totalWindowsPro));
    });

    it('should submit form with correct data and redirect to thank you page', () => {
        // Fill out the form fields
        cy.get('#name').type('Tom Gray');
        cy.get('#email').type('test@test.com');
        cy.get('#address').type('123 Fake Street, Fake Town');
        cy.get('#postcode').type('1234');
        cy.get('#country').type('Germany');
        // Submit and test that redirected to thank-you
        cy.get('form button').click();
        cy.location('pathname').should('contain', '/thank-you');
    });
});
