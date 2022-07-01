describe('Checkout', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        cy.get('.products-grid .product-card:first-child button').click();
        cy.get('.products-grid .product-card:last-child button').click();
        cy.get('.cart-count').click();
    });

    it('displays products for review and customisation', () => {
        cy.get('.cart-grid').children().should('have.length', 2);
    });

    it('should display the correct cart total', async () => {
        let cartTotal = 0;
        let sumTotal = 0;
        cy.get('.cart-total')
            .then((el) => {
                cartTotal = parseFloat(el[0].getAttribute('total'));
            })
            .then(() => {
                cy.get('.cart-card').each(
                    (card) => (sumTotal += parseFloat(card[0].getAttribute('price')))
                );
            })
            .then(() => expect(cartTotal).to.equal(sumTotal));
    });

    it('should submit form with correct data and redirect to thank you page', () => {
        cy.get('#name').type('Tom Gray');
        cy.get('#email').type('test@test.com');
        cy.get('#address').type('123 Fake Street, Fake Town');
        cy.get('#postcode').type('1234');
        cy.get('#country').type('Germany');
        cy.get('form button').click();
        cy.location('pathname').should('eq', '/thank-you')
    });
});
