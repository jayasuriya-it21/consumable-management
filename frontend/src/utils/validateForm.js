export const validateStock = (quantity, availableStock) => {
    return quantity > 0 && quantity <= availableStock;
  };