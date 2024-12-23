import { useNavigation } from '@react-navigation/native';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Тип для контекста авторизации
interface AuthContextType {
  token: string | null;
  login: ({newToken, newUserID}: {newToken: string, newUserID: string}) => void;
  logout: () => void;
  userID: string | null;
}

// Создаем контекст с дефолтным значением
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Провайдер контекста
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);

  // Загружаем токен при запуске приложения
  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem('authToken');
      if (savedToken) {
        setToken(savedToken); // Загружаем токен в состояние
      }
    };
    loadToken();
  }, []);

  // Функция для входа
  const login: AuthContextType['login'] = async ({newToken, newUserID}) => {
    setToken(newToken); // Сохраняем токен в состояние
    setUserID(newUserID)
    await AsyncStorage.setItem('authToken', newToken); // Сохраняем токен в AsyncStorage
  };

  // Функция для выхода
  const logout = async () => {
    setToken(null); // Очищаем токен из состояния
    await AsyncStorage.removeItem('authToken'); // Удаляем токен из AsyncStorage
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, userID }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
