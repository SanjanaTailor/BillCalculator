// Order.tsx
import React from 'react';
import { View, Text, SwipeableFlatList } from 'react-native';

interface OrderItem {
  name: string;
  price: number;
}

interface OrderProps {
  orderItems: OrderItem[];
  onItemRemove: (item: OrderItem) => void;
}

const Order: React.FC<OrderProps> = ({ orderItems, onItemRemove }) => {
  return (
    <SwipeableFlatList
      data={orderItems}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <View style={{ backgroundColor: 'lightgrey', padding: 10, margin: 5 }}>
          <Text>{item.name} - ${item.price}</Text>
        </View>
      )}
      renderRightItem={({ item }) => (
        <TouchableOpacity onPress={() => onItemRemove(item)}>
          <Text>Remove</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Order;
