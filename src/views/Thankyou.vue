<template>
    <div class="container pt-24 text-center">
        <h1 class="mb-4 text-4xl font-bold md:text-5xl">Thanks for your order!</h1>
        <p>You'll receive a confirmation email shortly with the details of your purchase.</p>
        <RouterLink class="mt-10 button" to="/">Order More Items</RouterLink>
    </div>
</template>

<style>
.button {
    @apply bg-blue-500 text-white px-8 py-3 rounded font-bold inline-block;
}

.button:hover {
    @apply brightness-75;
}

.button--small {
    @apply bg-blue-500 text-white px-4 py-2 text-sm rounded font-bold inline-block;
}
</style>
