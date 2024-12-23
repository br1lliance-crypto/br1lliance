import React, { useEffect } from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import { useAuth } from '../context/AuthContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Protected from './Protected';

// Определяем параметры маршрутов
export type RootStackParamList = {
  TabNavigator: undefined; // Экран без параметров
  Login: undefined;
  Register: undefined;
};

// Создаем стек с типизацией параметров
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={'TabNavigator'}
      screenOptions={{ headerShown: false, animation: 'fade' }}
    >
      <Stack.Screen name="TabNavigator" component={Protected} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
