import axios from 'axios';

export interface CartItem {
  id: number;
  title: string;
  description?: string;
  price?: number;
  size?: number;
  picture: {
    formats: {
      large?: {
        url: string;
      };
      medium?: {
        url: string;
      };
      small?: {
        url: string;
      };
      thumbnail?: {
        url: string;
      };
    };
  }[];
}

export interface CartResponse {
  data: CartItem[];
}

const BASE_URL = 'http://localhost:1337';

// Контроллер для получения товаров из корзины
const getCartItems = async ({ token }: { token: string }): Promise<CartResponse | null> => {
  try {
    const response = await axios.get<CartResponse>(
      `${BASE_URL}/api/cart?populate=*`, // Указываем правильный эндпоинт корзины
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Обрабатываем пути изображений
    const cartItems = response.data;
    cartItems.data.forEach((item) => {
      item.picture.forEach((pic) => {
        const imageUrl =
          pic.formats.large?.url ||
          pic.formats.medium?.url ||
          pic.formats.small?.url ||
          pic.formats.thumbnail?.url;

        if (imageUrl) {
          pic.formats.large = { url: `${BASE_URL}${imageUrl}` };
        }
      });
    });

    return cartItems;
  } catch (error: any) {
    console.error('Ошибка при получении корзины:', error);
    return null;
  }
};

export default getCartItems;
