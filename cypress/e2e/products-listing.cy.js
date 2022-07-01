describe('Products listing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('displays products on page load', () => {
        cy.get('.products-grid').children().should('have.length', 6);
    });

    it('adds products to cart', () => {
        cy.get('.products-grid .product-card:first-child button').click();
        cy.get('.cart-count').should('contain.text', '1');
    });

    it('filters by product type', () => {
        cy.get('#product-type').select('desktops');
        cy.get('.product-card.laptops').should('not.exist');
    });
});
