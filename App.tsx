// MainScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BillCalculator from './BillCalculator';
import DiscountsScreen from './DiscountsScreen';

interface MainScreenProps {
  navigation: any; // React Navigation prop
}

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);

  const handleDiscountSelection = (selectedDiscounts: string[]) => {
    setSelectedDiscounts(selectedDiscounts);
  };

  return (
    <View>
      <Text>Main Screen</Text>
      <BillCalculator selectedDiscounts={selectedDiscounts} />
      <Button
        title="Go to Discounts"
        onPress={() => navigation.navigate('Discounts', { selectedDiscounts, handleDiscountSelection })}
      />
    </View>
  );
};

interface DiscountsScreenProps {
  route: any; // React Navigation route prop
  navigation: any; // React Navigation prop
}

const DiscountsScreen: React.FC<DiscountsScreenProps> = ({ route, navigation }) => {
  const { selectedDiscounts, handleDiscountSelection } = route.params;

  return (
    <View>
      <Text>Discounts Screen</Text>
      <DiscountsList selectedDiscounts={selectedDiscounts} onSelect={handleDiscountSelection} />
      <Button title="Back to Main" onPress={() => navigation.goBack()} />
    </View>
  );
};

interface DiscountsListProps {
  selectedDiscounts: string[];
  onSelect: (selectedDiscounts: string[]) => void;
}

const DiscountsList: React.FC<DiscountsListProps> = ({ selectedDiscounts, onSelect }) => {
  const allDiscounts = [
    { name: '$5 off', effect: '$5.00 off the whole order' },
    { name: '10% off', effect: '10% off the whole order' },
    { name: '20% off', effect: '20% off the whole order' },
  ];

  const toggleDiscount = (discountName: string) => {
    const updatedDiscounts = selectedDiscounts.includes(discountName)
      ? selectedDiscounts.filter((name) => name !== discountName)
      : [...selectedDiscounts, discountName];
    onSelect(updatedDiscounts);
  };

  return (
    <View>
      {allDiscounts.map((discount) => (
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
    </View>
  );
};

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Discounts" component={DiscountsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
