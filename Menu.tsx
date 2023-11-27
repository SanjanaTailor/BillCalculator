import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

const menuItems: MenuItem[] = [
  { id: '1', name: 'Nachos', category: 'Appetizers', price: 13.99 },
  { id: '2', name: 'Calamari', category: 'Appetizers', price: 11.99 },
  { id: '3', name: 'Caesar Salad', category: 'Appetizers', price: 10.99 },
  { id: '4', name: 'Burger', category: 'Mains', price: 9.99 },
  { id: '5', name: 'Hotdog', category: 'Mains', price: 3.99 },
  { id: '6', name: 'Pizza', category: 'Mains', price: 12.99 },
  { id: '7', name: 'Water', category: 'Drinks', price: 0.0 },
  { id: '8', name: 'Pop', category: 'Drinks', price: 2.0 },
  { id: '9', name: 'Orange Juice', category: 'Drinks', price: 3.0 },
  { id: '10', name: 'Beer', category: 'Alcohol', price: 5.0 },
  { id: '11', name: 'Cider', category: 'Alcohol', price: 6.0 },
  { id: '12', name: 'Wine', category: 'Alcohol', price: 7.0 },
];

const Menu: React.FC = () => {
  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItemContainer}>
      <Text style={styles.categoryHeader}>{item.category}</Text>
      <Text>{item.name} - ${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <FlatList
      data={menuItems}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.menuContainer}
    />
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuItemContainer: {
    marginBottom: 12,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: 8,
  },
});

export default Menu;
