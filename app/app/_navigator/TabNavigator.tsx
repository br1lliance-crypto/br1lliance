import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/Home';
import HeaderSearch from './HeaderSearch';
import { Text, StyleSheet } from 'react-native';
import ProductList from '../screens/ProductList';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Cart from '../screens/Cart';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='ProductList' screenOptions={({ route }) => ({
      header: () => {
        if (route.name === 'ProductList') {
          return <HeaderSearch />;
        } else {
          return null;
        }
      }
    })}
  >
      
      <Tab.Screen 
        name="ProductList" 
        component={ProductList} 
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, { color: focused ? '#f17d21' : 'black' }]}>Одежда</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name='peace' size={28} color={focused ? '#f17d21' : 'black'} />
          ),
        }} 
      />

      <Tab.Screen 
        name="Cart" 
        component={Cart}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, { color: focused ? '#f17d21' : 'black' }]}>Корзина</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather name='shopping-cart' size={28} color={focused ? '#f17d21' : 'black'} />
          ),
        }} 
      />

      <Tab.Screen 
        name="Profile" 
        component={Home} 
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, { color: focused ? '#f17d21' : 'black' }]}>Профиль</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather name='user' size={28} color={focused ? '#f17d21' : 'black'} />
          ),
        }} 
      />

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default TabNavigator;
