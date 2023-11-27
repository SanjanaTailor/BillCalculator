// MainScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import Menu from './Menu';
import Order from './Order';

const menuData = [
  { name: 'Nachos', category: 'Appetizers', price: 13.99 },
  { name: 'Calamari', category: 'Appetizers', price: 11.99 },
  { name: 'Caesar Salad', category: 'Appetizers', price: 10.99 },
  { name: 'Burger', category: 'Mains', price: 9.99 },
  { name: 'Hotdog', category: 'Mains', price: 3.99 },
  { name: 'Pizza', category: 'Mains', price: 12.99 },
  { name: 'Water', category: 'Drinks', price: 0.00 },
  { name: 'Pop', category: 'Drinks', price: 2.00 },
  { name: 'Orange Juice', category: 'Drinks', price: 3.00 },
  { name: 'Beer', category: 'Alcohol', price: 5.00 },
  { name: 'Cider', category: 'Alcohol', price: 6.00 },
  { name: 'Wine', category: 'Alcohol', price: 7.00 },
];

const MainScreen: React.FC = () => {
  const [orderItems, setOrderItems] = useState([]);

  const handleItemPress = (item) => {
    setOrderItems([...orderItems, item]);
  };

  const handleItemRemove = (item) => {
    setOrderItems(orderItems.filter((orderItem) => orderItem !== item));
  };

  const calculateOrderTotal = () => {
    return orderItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <View>
      <Text>Main Screen</Text>
      <Menu menuItems={menuData} onItemPress={handleItemPress} />
      <Order orderItems={orderItems} onItemRemove={handleItemRemove} />
      <Text>Total: ${calculateOrderTotal()}</Text>
      <Button title="Go to Discounts" onPress={() => navigation.navigate('Discounts')} />
    </View>
  );
};

export default MainScreen;

