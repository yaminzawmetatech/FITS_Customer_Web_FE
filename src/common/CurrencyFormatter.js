export const CurrencyFormatter = (params) => {
    const value = parseFloat(params.value);

    if (!isNaN(value)) {
        const hasDecimals = value % 1 !== 0;

        return value.toLocaleString('en-US', {
            minimumFractionDigits: hasDecimals ? 2 : 0,
            maximumFractionDigits: hasDecimals ? 2 : 0
        });
    }

    return '';
};