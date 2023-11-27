// Menu.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface MenuItem {
  name: string;
  category: string;
  price: number;
}

interface MenuProps {
  menuItems: MenuItem[];
  onItemPress: (item: MenuItem) => void;
}

const Menu: React.FC<MenuProps> = ({ menuItems, onItemPress }) => {
  return (
    <View>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          onPress={() => onItemPress(item)}
          style={{ backgroundColor: getCategoryColor(item.category), padding: 10, margin: 5 }}
        >
          <Text>{item.name} - ${item.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const getCategoryColor = (category: string): string => {
  // implement logic to assign different colors based on categories
  switch (category) {
    case 'Appetizers':
      return 'lightgreen';
    case 'Mains':
      return 'lightblue';
    case 'Drinks':
      return 'lightcoral';
    case 'Alcohol':
      return 'lightyellow';
    default:
      return 'lightgrey';
  }
};

export default Menu;
