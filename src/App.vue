<script>
import { RouterLink, RouterView } from 'vue-router';
// Import mixins for prodcessing product data
import products from './mixins/products';
// Import data of products and components
import data from './data.json';

export default {
    // Add standard router components
    components: [RouterLink, RouterView],

    // Add mixin functions for handling products data
    mixins: [products],

    data() {
        return {
            cart: [],
            // Set products to hydrated product data
            products: this.hydrateProducts(data.products)
        }
    },

    methods: {
        // Use cartId to remove item from cart
        removeCartItem(cartId) {
            this.cart = this.cart.filter((i) => i.cartId !== cartId);
            if (!this.cart.length) this.$router.push('/');
        },
        // Add an item to the cart array. Use timestamp as an ID for the cart item
        addCartItem(product) {
            this.cart.push({ ...product, cartId: Date.now() });
        },
        // Update a cart item's components
        updateCartItem(cartId, componentType, component) {
            this.cart = this.cart.map((cartItem) => {
                // Find the relevant item in the array
                if (cartItem.cartId !== cartId) return cartItem;
                // Set the component to the new choice
                const components = { ...cartItem.components, [componentType]: component };
                const updatedCartItem = { ...cartItem, components };
                // Return updated item with new price calculated
                return {...updatedCartItem, price: this.sumPrice(updatedCartItem)}
            });
        }
    }
};
</script>

<template>
    <!-- Page header -->
    <header class="border-b">
        <div class="container flex justify-between py-8 align-bottom">
            <RouterLink class="hover:underline" to="/">
                <img class="w-8" src="./assets/logo.svg" alt="">
            </RouterLink>
            <!-- Nav bar with conditional pages depending on cart items -->
            <nav class="flex items-end align-baseline">
                <RouterLink to="/">Products</RouterLink>
                <RouterLink v-if="cart.length" to="/checkout">Checkout</RouterLink>
                <component :is="!cart.length ? 'span' : 'router-link'" to="/checkout">
                    <img class="inline w-6 xs:ml-8" src="./assets/cart.svg" alt="">
                    <span class="cart-count">{{ cart.length }}</span>
                </component>
            </nav>
        </div>
    </header>
    <!-- Router view of current page. Connect props and events for products/checkout pages -->
    <RouterView
        @add-cart-item="addCartItem"
        @remove-cart-item="removeCartItem"
        @update-cart-item="updateCartItem"
        @clear-cart="cart = []"
        :products="products"
        :cart="cart"
    />
</template>

<style>
/* Import base styles */
@import '@/assets/base.css';

/* Style router links  */
.router-link-active {
    @apply font-bold;
}

nav a {
    @apply hover:underline mx-4;
}
</style>
