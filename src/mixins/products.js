import data from './../data.json';

export default {
    methods: {
        hydrateProducts(products) {
            return products.map((product) => {
                const components = this.hydrateComponents(product.components);
                const hydratedProduct = { ...product, components };
                return { ...hydratedProduct, price: this.sumPrice(hydratedProduct) };
            });
        },
        hydrateComponents(components) {
            return Object.keys(components).reduce((accumulator, type) => {
                const component = data[`${type}s`].find((item) => {
                    return item.id === components[type];
                });
                return {...accumulator, [type]: component};
            }, {});
        },
        sumPrice(product) {
            return Object.keys(product.components).reduce((accumulator, componentKey) => {
                return accumulator + product.components[componentKey].price;
            }, product.basePrice);
        }
    }
};
