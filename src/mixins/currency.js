export default {
    methods: {
        formatCurrency(decimal) {
            const formatter = new Intl.NumberFormat('ir-IR', {
                style: 'currency',
                currency: 'EUR'
            });

            return formatter.format(decimal);
        }
    }
};
