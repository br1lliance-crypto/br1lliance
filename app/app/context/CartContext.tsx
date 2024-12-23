import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductsResponse } from '@/app/apiController/getProducts';

interface CartContextType {
  cart: ProductsResponse['data'];
  addToCart: (product: ProductsResponse['data'][0]) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<ProductsResponse['data']>([]);

  const CART_STORAGE_KEY = '@cart';

  // Загрузка состояния корзины из AsyncStorage при монтировании
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Failed to load the cart:', error);
      }
    };

    loadCart();
  }, []);

  // Сохранение состояния корзины в AsyncStorage при каждом изменении
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to save the cart:', error);
      }
    };

    saveCart();
  }, [cart]);

  // Добавить товар в корзину
  const addToCart = (product: ProductsResponse['data'][0]) => {
    setCart((prevCart) => {
      if (!prevCart.some((item) => item.id === product.id)) {
        return [...prevCart, product];
      }
      return prevCart;
    });
  };

  // Удалить товар из корзины
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Очистить корзину
  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem(CART_STORAGE_KEY); // Удалить из хранилища
      setCart([]);
    } catch (error) {
      console.error('Failed to clear the cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Хук для использования контекста корзины
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
