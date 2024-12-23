// file: api/cartService.ts
import axios, { AxiosResponse } from 'axios';
import getUserCart from './getUserCart';

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

const API_BASE_URL = 'http://localhost:1337/api'; // Базовый URL API

/**
 * Метод для добавления товара в корзину
 * @param userId ID пользователя
 * @param product Массив товаров
 * @param token Авторизационный токен
 * @returns Ответ от сервера
 */
export const addToCart = async (
  userId: string,
  productId: number,
  productDoc: string,
  token: string
): Promise<ApiResponse> => {
  try {
    const requestBody = {
      data: {
        cart: userId,
        products: {
          connect: {
            id: productId,
            documentId: productDoc
          }
        },
      },
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    // console.log( token);
    getUserCart(token).then(res => {
      console.log(res.cart_cart.documentId);
      if (res.cart_cart.documentId) {

      }
    })
    
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/carts`,
      requestBody,
      { headers }
    );
    
    // console.log(response.data)
    return response.data;
  } catch (error: any) {
    console.error('Ошибка при добавлении товара в корзину:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Не удалось выполнить запрос',
    };
  }
};
