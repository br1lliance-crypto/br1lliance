import React, { createContext, useState, useContext, ReactNode } from 'react';

// Тип для состояния модалки
interface LoadingContextType {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  modalText: string;
  setText: (text: string) => void;
}

// Создаём контекст с дефолтным значением
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Провайдер для контекста загрузки
interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');

  // Функция для установки состояния загрузки
  const setLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  const setText = (text: string) => {
    setModalText(text);
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, modalText, setText }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Хук для использования контекста
export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export default LoadingProvider;