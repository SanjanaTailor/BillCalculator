// DiscountsScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

interface Discount {
  name: string;
  effect: string;
}

const discountsData: Discount[] = [
  { name: '$5 off', effect: '$5.00 off the whole order' },
  { name: '10% off', effect: '10% off the whole order' },
  { name: '20% off', effect: '20% off the whole order' },
];

const DiscountsScreen: React.FC = () => {
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);

  const toggleDiscount = (discountName: string) => {
    if (selectedDiscounts.includes(discountName)) {
      setSelectedDiscounts(selectedDiscounts.filter((name) => name !== discountName));
    } else {
      setSelectedDiscounts([...selectedDiscounts, discountName]);
    }
  };

  const applyDiscounts = (orderTotal: number) => {
    return selectedDiscounts.reduce((total, discount) => {
      if (discount === '$5 off') {
        return total - 5;
      } else if (discount === '10% off') {
        return total * 0.9;
      } else if (discount === '20% off') {
        return total * 0.8;
      }
      return total;
    }, orderTotal);
  };

  return (
    <View>
      <Text>Discounts Screen</Text>
      {discountsData.map((discount) => (
        <TouchableOpacity
          key={discount.name}
          onPress={() => toggleDiscount(discount.name)}
          style={{
            backgroundColor: selectedDiscounts.includes(discount.name) ? 'lightblue' : 'lightgrey',
            padding: 10,
            margin: 5,
          }}
        >
          <Text>{discount.name} - {discount.effect}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Back to Main" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DiscountsScreen;
