<script>
import { RouterLink, RouterView } from 'vue-router';
import products from './mixins/products';
import data from './data.json';

export default {
    components: [RouterLink, RouterView],

    mixins: [products],

    data() {
        return {
            cart: [],
            products: this.hydrateProducts(data.products)
        }
    },

    methods: {
        removeCartItem(cartId) {
            this.cart = this.cart.filter((i) => i.cartId !== cartId);
            if (!this.cart.length) this.$router.push('/');
        },
        addCartItem(product) {
            this.cart.push({ ...product, cartId: Date.now() });
        },
        updateCartItem(cartId, componentType, component) {
            this.cart = this.cart.map((cartItem) => {
                if (cartItem.cartId !== cartId) return cartItem;
                const components = { ...cartItem.components, [componentType]: component };
                const updatedCartItem = { ...cartItem, components };
                return {...updatedCartItem, price: this.sumPrice(updatedCartItem)}
            });
        }
    }
};
</script>

<template>
    <header class="border-b">
        <div class="container flex justify-between py-8 align-bottom">
            <RouterLink class="hover:underline" to="/">
                <!-- prettier-ignore -->
                <svg class="w-8" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 488.4 488.4" style="enable-background: new 0 0 488.4 488.4" xml:space="preserve" > <g> <g> <rect x="103.1" y="453.5" width="282.2" height="34.9"/> <rect x="143" y="367.5" width="202" height="66.3"/> <path d="M0,0v348.1h488.4V0H0z M461.7,311.3c0,5.4-4.3,9.7-9.7,9.7H36.4c-5.4,0-9.7-4.3-9.7-9.7V36.8c0-5.4,4.3-9.7,9.7-9.7H452c5.4,0,9.7,4.3,9.7,9.7L461.7,311.3L461.7,311.3z"/> <path d="M46.1,301.6h396.2V46.5H46.1V301.6z M309.7,194.2c0-1.9,1.2-3.5,2.7-4.3l54.7-25.2l-54.7-24.8c-1.6-0.8-2.7-2.3-2.7-4.3V116c0-3.3,3.4-5.4,6.3-4l82.4,38.3c1.6,0.8,2.7,2.3,2.7,4.3v21.7c0,1.9-1.2,3.5-2.7,4.3L316,218.5c-3,1.4-6.4-0.8-6.4-4.1v-20.2H309.7z M188.5,253.2l75.8-162.5c0.8-1.6,2.3-2.7,4.3-2.7h17.2c3.5,0,5.9,3.7,4.4,6.9l-75.9,162.5c-0.8,1.6-2.3,2.7-4.3,2.7h-17.2C189.4,260.1,187,256.4,188.5,253.2z M87.6,154.7c0-1.9,1.2-3.5,2.7-4.3l82.5-38.3c2.9-1.4,6.3,0.8,6.3,4v20c0,1.9-1.2,3.5-2.7,4.3l-54.7,24.8l54.7,25.2c1.6,0.8,2.7,2.3,2.7,4.3v20.4c0,3.2-3.3,5.4-6.3,4l-82.5-37.9c-1.6-0.8-2.7-2.3-2.7-4.3C87.6,176.9,87.6,154.7,87.6,154.7z"/> </g> </g> </svg>
            </RouterLink>
            <nav class="flex items-end align-baseline">
                <RouterLink to="/">Products</RouterLink>
                <RouterLink v-if="cart.length" to="/checkout">Checkout</RouterLink>
                <component :is="!cart.length ? 'span' : 'router-link'" to="/checkout">
                    <!-- prettier-ignore -->
                    <svg class="inline w-6 xs:ml-8" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 491.123 491.123" style="enable-background: new 0 0 491.123 491.123" xml:space="preserve" > <g> <g> <path d="M470.223,0.561h-89.7c-9.4,0-16.7,6.3-19.8,14.6l-83.4,263.8h-178.3l-50-147h187.7c11.5,0,20.9-9.4,20.9-20.9s-9.4-20.9-20.9-20.9h-215.9c-18.5,0.9-23.2,18-19.8,26.1l63.6,189.7c3.1,8.3,11.5,13.6,19.8,13.6h207.5c9.4,0,17.7-5.2,19.8-13.6l83.4-263.8h75.1c11.5,0,20.9-9.4,20.9-20.9S481.623,0.561,470.223,0.561z"/> <path d="M103.223,357.161c-36.5,0-66.7,30.2-66.7,66.7s30.2,66.7,66.7,66.7s66.7-30.2,66.7-66.7S139.723,357.161,103.223,357.161z M128.223,424.861c0,14.6-11.5,26.1-25,26.1c-13.6,0-25-11.5-25-26.1s11.5-26.1,25-26.1C117.823,398.861,129.323,410.261,128.223,424.861z"/> <path d="M265.823,357.161c-36.5,0-66.7,30.2-66.7,66.7s30.2,66.7,66.7,66.7c37.5,0,66.7-30.2,66.7-66.7C332.623,387.361,302.323,357.161,265.823,357.161z M290.923,424.861c0,14.6-11.5,26.1-25,26.1c-13.5,0-25-11.5-25-26.1s11.5-26.1,25-26.1C280.423,398.861,291.923,410.261,290.923,424.861z"/> </g> </g> </svg>
                    <span class="cart-count">{{ cart.length }}</span>
                </component>
            </nav>
        </div>
    </header>

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
@import '@/assets/base.css';

.router-link-active {
    @apply font-bold;
}

nav a {
    @apply hover:underline mx-4;
}
</style>
