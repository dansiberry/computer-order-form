<script>
import currency from './../mixins/currency';
import products from './../mixins/products';
import data from '../data.json';

export default {
    // Import mixins for formatting currency strings and handling products data
    mixins: [currency, products],
    props: {
        // Cart is array of products, each populated with components and price
        cart: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        // Expose data for using in templates
        data: data,
        // User details for order confirmation
        details: {
            name: undefined,
            email: undefined,
            phone: undefined,
            address: undefined,
            postcode: undefined,
            country: undefined
        }
    }),
    computed: {
        // Return decimal of total price of all cart items
        total() {
            return this.cart.reduce((accumulator, current) => {
                return accumulator + current.price;
            }, 0);
        }
    },
    methods: {
        // Handle updates in cart item components.
        updateComponent(cartId, type, componentId) {
            // Fetch the component by its ID
            const component = data[`${type}s`].find((item) => item.id == componentId);
            // Emit event so cart can be updated in App.vue
            this.$emit('updateCartItem', cartId, type, component);
        },
        // Handle submission by clearing cart and redirecting to thank you page.
        // AJAX form submission could be added here later to process user's order
        handleSubmission() {
            this.$emit('clearCart');
            this.$router.push('/thank-you');
        }
    },

    // If this page is visited with no items in cart, redirect to products page
    created() {
        if (!this.cart.length) this.$router.push('/');
    }
};
</script>

<template>
    <!-- Wrap page in container using main element with vertical margins -->
    <main class="container py-12">
        <!-- Page title -->
        <h1 class="my-12 text-3xl font-bold">Review and customise your order</h1>
        <div class="grid gap-2 md:grid-cols-2 cart-grid">
            <!-- Loop cart products. Add price attribute for use in tests -->
            <div
                v-for="product in cart"
                :key="product.cartId"
                class="relative max-w-xl px-4 py-6 bg-gray-100 xs:flex cart-card"
                :price="product.price"
            >
                <div class="px-4">
                    <!-- Output SVG depending on product type. -->
                    <img v-if="product.category === 'laptops'" class="w-20 mr-4" src="./../assets/laptop.svg" alt="laptop">
                    <img v-else class="w-16 mr-4" src="./../assets/desktop.svg" alt="desktop">
                </div>
                <div class="">
                    <!-- Print product details -->
                    <p class="mb-3 font-bold">{{ product.name }}</p>
                    <p class="font-bold">{{ formatCurrency(product.price) }}</p>

                    <!-- Loop through and print products components -->
                    <div
                        v-for="(component, type) in product.components"
                        class="mt-4 mb-1"
                        :key="type"
                    >
                        <label class="block" for="processor">{{ componentNameMap[type] }}</label>
                        <!-- Allow for user to udpate each component by choosing from available alternatives -->
                        <select
                            class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded"
                            :name="type"
                            @change="updateComponent(product.cartId, type, $event.target.value)"
                        >
                            <!-- Loop through available components of given type using data -->
                            <option
                                v-for="option in data[type + 's']"
                                :key="option.name"
                                :value="option.id"
                                :selected="option.id === component.id"
                            >
                                {{ option.name }}
                            </option>
                        </select>
                    </div>

                    <!-- Remove item from cart using it's cartId -->
                    <button
                        class="mt-4 button button--small"
                        @click="$emit('removeCartItem', product.cartId)"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
        <div class="my-12">
            <p class="mb-2 text-xl font-bold">Order Summary</p>
            <ul>
                <!-- Total price of all cart items -->
                <li :total="total" class="cart-total">Total: {{ formatCurrency(total) }}</li>
            </ul>
        </div>
        <!-- Form for user details. On submission, prevent default action and handle in vue method -->
        <form @submit.prevent="handleSubmission">
            <p class="mb-4 text-xl font-bold">Your Details</p>
            <div class="grid gap-2 sm:grid-cols-2">
                <div>
                    <label class="block mb-1" for="name">Full Name</label>
                    <input
                        type="text"
                        required
                        id="name"
                        class="w-full px-3 py-2 border rounded shadow appearance-none"
                    />
                </div>

                <div>
                    <label class="block mb-1" for="email">Email</label>
                    <input
                        type="text"
                        required
                        id="email"
                        class="w-full px-3 py-2 border rounded shadow appearance-none"
                    />
                </div>

                <div>
                    <label class="block mb-1" for="address">Address</label>
                    <input
                        type="text"
                        required
                        id="address"
                        class="w-full px-3 py-2 border rounded shadow appearance-none"
                    />
                </div>

                <div>
                    <label class="block mb-1" for="postcode">Postcode</label>
                    <input
                        type="text"
                        required
                        id="postcode"
                        class="w-full px-3 py-2 border rounded shadow appearance-none"
                    />
                </div>

                <div>
                    <label class="block mb-1" for="country">Country</label>
                    <input
                        type="text"
                        required
                        id="country"
                        class="w-full px-3 py-2 border rounded shadow appearance-none"
                    />
                </div>

            </div>
            <!-- Button will automatically trigger submit event when clicked -->
            <button class="mt-4 button">Confirm Order</button>
        </form>
    </main>
</template>
