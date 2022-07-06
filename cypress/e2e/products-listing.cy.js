describe('Products listing', () => {
    beforeEach(() => {
        // Visit the products listing page
        cy.visit('http://localhost:3000/');
    });

    it('displays products on page load', () => {
        // Test that all 6 products are showing
        cy.get('.products-grid').children().should('have.length', 6);
    });

    it('adds products to cart', () => {
        // Test that adding a product to the cart updates the UI
        cy.get('.products-grid .product-card:first-child button').click();
        cy.get('.cart-count').should('contain.text', '1');
    });

    it('filters by product type', () => {
        // Test that filtering by desktops only removes any laptop products
        cy.get('#product-type').select('desktops');
        cy.get('.product-card.laptops').should('not.exist');
    });
});
