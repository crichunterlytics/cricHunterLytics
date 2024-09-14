const getStockStatus = (stock_quantity, minimum_stock_level, maximum_stock_level) => {
    if (stock_quantity <= 0) {
        return 'out_of_stock';
    } else if (stock_quantity <= minimum_stock_level) {
        return 'low_stock';
    } else if (stock_quantity <= maximum_stock_level) {
        return 'in_stock';
    } else {
        return 'over_stock';  // Optional case if quantity exceeds max level
    }
}

module.exports = {
    getStockStatus
}