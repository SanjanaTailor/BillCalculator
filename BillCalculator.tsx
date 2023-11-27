// Define interfaces for items, taxes, and discounts
interface Item {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface Tax {
  id: string;
  name: string;
  rate: number;
  appliesTo: string[]; // Categories to which the tax applies
}

interface Discount {
  id: string;
  name: string;
  type: 'percentage' | 'dollar';
  value: number;
}

// Define a function to calculate the bill
const calculateBill = (
  items: Item[],
  taxes: Tax[],
  discounts: Discount[]
) => {
  // Calculate pre-tax and pre-discount total
  const preTaxPreDiscountTotal = items.reduce((total, item) => total + item.price, 0);

  // Apply discounts
  const discountedTotal = applyDiscounts(preTaxPreDiscountTotal, discounts);

  // Apply taxes
  const taxedTotal = applyTaxes(discountedTotal, taxes, items);

  // Calculate post-tax and post-discount total
  const postTaxPostDiscountTotal = taxedTotal - applyDiscounts(0, discounts);

  // Calculate total of all taxes applied
  const totalTaxes = taxedTotal - discountedTotal;

  // Calculate total of all discounts applied
  const totalDiscounts = discountedTotal - preTaxPreDiscountTotal;

  return {
    totalTaxes,
    totalDiscounts,
    preTaxPreDiscountTotal,
    postTaxPostDiscountTotal,
  };
};

// Helper function to apply discounts
const applyDiscounts = (amount: number, discounts: Discount[]) => {
  return discounts.reduce((total, discount) => {
    if (discount.type === 'percentage') {
      return total * (1 - discount.value / 100);
    } else {
      return total - discount.value;
    }
  }, amount);
};

// Helper function to apply taxes
const applyTaxes = (amount: number, taxes: Tax[], items: Item[]) => {
  return taxes.reduce((total, tax) => {
    const taxedItems = items.filter((item) => tax.appliesTo.includes(item.category));
    const taxedAmount = taxedItems.reduce((subtotal, item) => subtotal + item.price, 0);
    return total + taxedAmount * (1 + tax.rate / 100);
  }, amount);
};

// Example usage
const items: Item[] = [
  { id: '1', name: 'Nachos', category: 'Appetizers', price: 13.99 },
  { id: '2', name: 'Beer', category: 'Alcohol', price: 5.00 },
  // Add more items as needed
];

const taxes: Tax[] = [
  { id: '1', name: 'Tax 1', rate: 5, appliesTo: ['All'] },
  { id: '2', name: 'Alcohol Tax', rate: 10, appliesTo: ['Alcohol'] },
  // Add more taxes as needed
];

const discounts: Discount[] = [
  { id: '1', name: '$5 off', type: 'dollar', value: 5.00 },
  { id: '2', name: '10% off', type: 'percentage', value: 10 },
  // Add more discounts as needed
];

const bill = calculateBill(items, taxes, discounts);
console.log(bill);

