export default {
    methods: {
        // Return formatted currency string in standard Irish style - €12.50
        formatCurrency(decimal) {
            const formatter = new Intl.NumberFormat('ir-IR', {
                style: 'currency',
                currency: 'EUR'
            });

            return formatter.format(decimal);
        }
    }
};
