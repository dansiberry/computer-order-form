<script>
import currency from './../mixins/currency';

export default {
    // Currency utility for formating price strings
    mixins: [currency],
    // Products prop is array of products, each populated with components and price
    props: {
        products: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        // Data for user's choices of filters
        maxPrice: 5000,
        sortBy: 'priceAsc',
        category: 'all'
    }),
    computed: {
        // Return filtered product array by matching price range and category
        filteredProducts() {
            return this.sortedProducts.filter((product) => {
                const inPriceRange = product.price <= this.maxPrice;
                const inCategory = this.category === 'all' || product.category === this.category;
                return inPriceRange && inCategory;
            });
        },
        // Return products array sorted by price depending on active option.
        sortedProducts() {
            const sorted = [...this.products].sort((a, b) => {
                return a.price < b.price ? -1 : 1;
            });
            return this.sortBy === 'priceAsc' ? sorted : sorted.reverse();
        }
    }
};
</script>

<template>
    <!-- Divide page into 4 columns on small screens and up -->
    <main class="container grid-cols-4 gap-2 py-8 sm:grid">
        <div class="col-span-1 pr-4 mb-4">
            <p class="font-bold">Customise your selection</p>
            <div class="mt-6">
                <label for="product-type" class="block mb-1">Product Type</label>
                <!-- Field for selecting category filter via v-model -->
                <select
                    v-model="category"
                    id="product-type"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded"
                >
                    <option value="all">All</option>
                    <option value="laptops">Laptops</option>
                    <option value="desktops">Desktops</option>
                </select>
            </div>
            <div class="mt-6">
                <label class="block mb-1" for="max-price"
                    >Max Price - {{ formatCurrency(maxPrice) }}</label
                >
                <!-- Use HTML slider to allow max price to be set. -->
                <input
                    type="range"
                    min="0"
                    step="200"
                    max="3000"
                    class="block slider"
                    id="max-price"
                    v-model="maxPrice"
                />
            </div>
            <div class="mt-6">
                <label for="sort-by" class="block mb-1">Sort by</label>
                <!-- Field for selecting sort filter via v-model -->
                <select
                    v-model="sortBy"
                    id="sort-by"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded"
                >
                    <option value="priceAsc">Price: Asc.</option>
                    <option value="priceDesc">Price: Desc.</option>
                </select>
            </div>
        </div>
        <!-- Message for when no products match filters -->
        <p v-if="!filteredProducts.length" class="col-span-3 px-4 font-bold text-center">
            No products match your price range
        </p>
        <!-- Loop through matching products and output as cards in a grid -->
        <div v-else class="grid col-span-3 gap-4 xs:grid-cols-2 md:grid-cols-3 products-grid">
            <div
                v-for="product in filteredProducts"
                :key="product.serialNumber"
                class="px-8 pb-6 rounded shadow-md product-card"
                :class="product.category"
            >
                <div class="px-3 lg:px-8 opacity-20">
                    <!-- Use SVG depending on products type. -->
                    <img v-if="product.category === 'laptops'" class="w-32 mx-auto sm:w-full" src="./../assets/laptop.svg" alt="laptop">
                    <img v-else class="m-8" src="./../assets/desktop.svg" alt="desktop">
                </div>
                <p class="font-bold">{{ product.name }}</p>
                <!-- Loop over products components and print -->
                <ul class="text-xs">
                    <li v-for="(component, type) in product.components" :key="type">
                        <p class="mt-3 font-bold">{{ type }}</p>
                        <p>{{ component.name }}</p>
                    </li>
                </ul>
                <!-- Print product's price -->
                <p class="mt-2 font-bold">{{ formatCurrency(product.price) }}</p>
                <!-- Add product to cart by emitting product to App.vue -->
                <button class="mt-3 button button--small" @click="$emit('addCartItem', product)">
                    Add to cart
                </button>
            </div>
        </div>
    </main>
</template>
