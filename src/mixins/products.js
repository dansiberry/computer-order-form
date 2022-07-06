import data from './../data.json';

// Utility methods for handling product data
export default {
    data: () => ({
        // Map component types to formatted titles for UI
        componentNameMap: {
            lcd: 'LCD',
            operatingSystem: 'Operating System',
            processor: 'Processor'
        }
    }),
    methods: {
        // Return array of products populated with components and prices
        hydrateProducts(products) {
            // Loop over products using other methods to hydrate data
            return products.map((product) => {
                const components = this.hydrateComponents(product.components);
                const hydratedProduct = { ...product, components };
                return { ...hydratedProduct, price: this.sumPrice(hydratedProduct) };
            });
        },
        // Return components object that has been populated from IDs
        hydrateComponents(components) {
            // Loop over components and populate them from data
            return Object.keys(components).reduce((accumulator, type) => {
                const component = data[`${type}s`].find((item) => {
                    return item.id === components[type];
                });
                return {...accumulator, [type]: component};
            }, {});
        },
        // Return total price of base product and its components
        sumPrice(product) {
            // Loop over prices and sum them
            return Object.keys(product.components).reduce((accumulator, componentKey) => {
                return accumulator + product.components[componentKey].price;
            }, product.basePrice);
        }
    }
};
