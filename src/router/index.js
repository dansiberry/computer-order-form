import { createRouter, createWebHistory } from 'vue-router';
import Products from '../views/Products.vue';
import Checkout from '../views/Checkout.vue';
import Thankyou from '../views/Thankyou.vue';

// Define routes for products ('/'), checkout and thank you pages.
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/thank-you',
            name: 'thankyou',
            component: Thankyou
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout
        },
        {
            path: '/',
            name: 'products',
            component: Products
        }
    ]
});

export default router;
