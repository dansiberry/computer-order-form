<script>
import currency from './../mixins/currency';

export default {
    mixins: [currency],
    props: {
        products: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        maxPrice: 5000,
        sortBy: 'priceAsc',
        category: 'all'
    }),
    computed: {
        filteredProducts() {
            return this.sortedProducts.filter((product) => {
                const inPriceRange = product.price <= this.maxPrice;
                const inCategory = this.category === 'all' || product.category === this.category;
                return inPriceRange && inCategory;
            });
        },
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
    <main class="container grid-cols-4 gap-2 py-8 sm:grid">
        <div class="col-span-1 pr-4 mb-4">
            <p class="font-bold">Customise your selection</p>
            <div class="mt-6">
                <label for="product-type" class="block mb-1">Product Type</label>
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
        <p v-if="!filteredProducts.length" class="col-span-3 px-4 font-bold text-center">
            No products match your price range
        </p>
        <div v-else class="grid col-span-3 gap-4 xs:grid-cols-2 md:grid-cols-3 products-grid">
            <div
                v-for="product in filteredProducts"
                :key="product.serialNumber"
                class="px-8 pb-6 rounded shadow-md product-card"
                :class="product.category"
            >
                <div class="px-3 lg:px-8 opacity-20">
                    <!-- prettier-ignore -->
                    <svg v-if="product.category === 'laptops'" class="w-32 mx-auto sm:w-full" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 478.976 478.976" style="enable-background: new 0 0 478.976 478.976" xml:space="preserve" > <g> <path d="M44.338,314.735h280.738c1.424,0,2.781-0.607,3.729-1.67s1.399-2.479,1.239-3.894L310.68,138.418c-0.287-2.527-2.425-4.437-4.968-4.437H24.974c-1.424,0-2.781,0.607-3.729,1.67s-1.399,2.479-1.239,3.894l19.364,170.754C39.656,312.825,41.794,314.735,44.338,314.735z M301.247,143.981l18.229,160.754H48.802L30.573,143.981H301.247z"/> <path d="M473.976,324.188H351.324l-21.753-191.822c-1.153-10.169-9.741-17.838-19.975-17.838H20.103c-5.719,0-11.185,2.447-14.994,6.713c-3.81,4.266-5.625,9.972-4.981,15.656l21.838,192.575v18.591c0,9.035,7.351,16.385,16.385,16.385H462.59c9.035,0,16.385-7.35,16.385-16.385v-18.875C478.976,326.426,476.737,324.188,473.976,324.188z M348.417,334.188c-1.359,1.489-3.309,2.43-5.479,2.43H285.12c-2.17,0-4.119-0.941-5.479-2.43h67.218H348.417z M12.567,127.901c1.943-2.176,4.619-3.374,7.536-3.374h289.494c5.144,0,9.459,3.854,10.039,8.965l21.625,190.695H31.431L10.064,135.77C9.735,132.871,10.625,130.077,12.567,127.901z M38.351,354.448c-3.521,0-6.385-2.865-6.385-6.385v-13.875h117.116v12.956c0,4.028-3.277,7.304-7.304,7.304H38.351z M468.976,348.063c0,3.521-2.864,6.385-6.385,6.385H157.443c1.041-2.223,1.639-4.692,1.639-7.304v-12.956H268.43c2.155,7.18,8.817,12.43,16.689,12.43h57.818c7.872,0,14.535-5.25,16.689-12.43h109.348V348.063z"/> <path d="M49.551,339.318h-9c-2.761,0-5,2.239-5,5s2.239,5,5,5h9c2.761,0,5-2.239,5-5S52.313,339.318,49.551,339.318z"/> <path d="M72.051,339.318h-8.5c-2.761,0-5,2.239-5,5s2.239,5,5,5h8.5c2.761,0,5-2.239,5-5S74.813,339.318,72.051,339.318z"/> <path d="M128.55,339.317c-1.31,0-2.6,0.54-3.53,1.46c-0.93,0.94-1.47,2.22-1.47,3.54c0,1.32,0.54,2.61,1.47,3.54c0.93,0.93,2.22,1.46,3.53,1.46c1.32,0,2.61-0.53,3.54-1.46c0.93-0.93,1.46-2.22,1.46-3.54c0-1.32-0.53-2.6-1.46-3.54C131.16,339.857,129.87,339.317,128.55,339.317z"/> <path d="M121.765,165.723h97.454c2.761,0,5-2.239,5-5s-2.239-5-5-5h-97.454c-2.761,0-5,2.239-5,5S119.004,165.723,121.765,165.723z"/> <path d="M73.672,189.133h198.96c2.761,0,5-2.239,5-5s-2.239-5-5-5H73.672c-2.761,0-5,2.239-5,5S70.91,189.133,73.672,189.133z"/> <path d="M76.321,202.543c-2.761,0-5,2.239-5,5s2.239,5,5,5h198.96c2.761,0,5-2.239,5-5s-2.239-5-5-5H76.321z"/> <path d="M78.982,225.943c-2.761,0-5,2.239-5,5s2.239,5,5,5h198.96c2.761,0,5-2.239,5-5s-2.239-5-5-5H78.982z"/> <path d="M81.631,249.353c-2.761,0-5,2.239-5,5s2.239,5,5,5h198.96c2.761,0,5-2.239,5-5s-2.239-5-5-5H81.631z"/> <path d="M84.292,272.763c-2.761,0-5,2.239-5,5s2.239,5,5,5h198.96c2.761,0,5-2.239,5-5s-2.239-5-5-5H84.292z"/> </g> </svg>
                    <!-- prettier-ignore -->
                    <svg v-else class="m-8" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 453.511 453.511" style="enable-background:new 0 0 453.511 453.511;" xml:space="preserve"><g><path d="M322.78,0H130.731c-19.834,0-35.97,16.136-35.97,35.969v385.51c0,4.142,3.357,7.5,7.5,7.5h15.216v17.031c0,4.142,3.357,7.5,7.5,7.5h38.564c4.143,0,7.5-3.358,7.5-7.5v-17.031h111.427v17.031c0,4.142,3.357,7.5,7.5,7.5h38.565c4.143,0,7.5-3.358,7.5-7.5v-17.031h15.215c4.143,0,7.5-3.358,7.5-7.5V35.969C358.749,16.136,342.613,0,322.78,0z M156.042,438.511h-23.564v-9.531h23.564V438.511z M321.034,438.511h-23.565v-9.531h23.565V438.511z M343.749,413.979H109.762V35.969c0-11.563,9.407-20.969,20.97-20.969H322.78c11.563,0,20.969,9.407,20.969,20.969V413.979z"/><path d="M312.251,85.869H141.26c-4.143,0-7.5,3.358-7.5,7.5v44.998c0,4.142,3.357,7.5,7.5,7.5h170.991c4.143,0,7.5-3.358,7.5-7.5V93.369C319.751,89.227,316.394,85.869,312.251,85.869z M304.751,130.867H148.76v-29.998h155.991V130.867z"/><path d="M226.756,197.503c-12.475,0-22.624,10.149-22.624,22.624s10.149,22.625,22.624,22.625s22.624-10.149,22.624-22.625S239.23,197.503,226.756,197.503z M226.756,227.752c-4.204,0-7.624-3.42-7.624-7.625s3.42-7.624,7.624-7.624s7.624,3.42,7.624,7.624S230.96,227.752,226.756,227.752z"/><path d="M226.756,171.165c-26.998,0-48.963,21.964-48.963,48.962s21.965,48.963,48.963,48.963s48.963-21.965,48.963-48.963S253.754,171.165,226.756,171.165z M226.756,254.09c-18.728,0-33.963-15.236-33.963-33.963s15.235-33.962,33.963-33.962s33.963,15.235,33.963,33.962S245.483,254.09,226.756,254.09z"/><path d="M173.291,301.888c0,4.142,3.357,7.5,7.5,7.5h70.401c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-70.401C176.648,294.388,173.291,297.746,173.291,301.888z"/><path d="M271.249,294.534c-3.144,0.669-5.559,3.233-5.97,6.434c-0.399,3.109,1.28,6.209,4.07,7.614c6.031,3.038,12.792-3.167,10.353-9.418C278.395,295.813,274.781,293.842,271.249,294.534C270.778,294.634,272.219,294.344,271.249,294.534z"/><path d="M272.72,349.668h-91.929c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h91.929c4.143,0,7.5-3.358,7.5-7.5S276.862,349.668,272.72,349.668z"/><path d="M272.72,322.028h-91.929c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h91.929c4.143,0,7.5-3.358,7.5-7.5S276.862,322.028,272.72,322.028z"/></g></svg>
                </div>
                <p class="font-bold">{{ product.name }}</p>
                <ul class="text-xs">
                    <li v-for="(component, type) in product.components" :key="type">
                        <p class="mt-3 font-bold">{{ type }}</p>
                        <p>{{ component.name }}</p>
                    </li>
                </ul>
                <p class="mt-2 font-bold">{{ formatCurrency(product.price) }}</p>
                <button class="mt-3 button button--small" @click="$emit('addCartItem', product)">
                    Add to cart
                </button>
            </div>
        </div>
    </main>
</template>
