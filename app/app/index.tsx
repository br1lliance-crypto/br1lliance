import React from 'react'
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import MainNavigator from './_navigator/MainNavigator';
import { StatusBar } from 'react-native';
import LoadingProvider from './context/LoadingContext';
import AuthProvider from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const index = () => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <CartProvider>
        <ApplicationProvider {...eva} theme={{ ...eva.light }}>
          <StatusBar translucent backgroundColor={'transparent'}/>
          <MainNavigator />
          {/* <Loading /> */}
        </ApplicationProvider>
        </CartProvider>
      </AuthProvider>
    </LoadingProvider>
  )
}

export default index