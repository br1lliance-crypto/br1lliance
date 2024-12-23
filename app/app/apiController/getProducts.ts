import axios from 'axios';

export interface ProductsResponse {
  data: {
    id: number;
    documentId: string;
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
        }
      };
    }[];
  }[];
}

const BASE_URL = 'http://localhost:1337';

const getProducts = async ({ token }: { token: string }): Promise<ProductsResponse | null> => {
  try {
    const response = await axios.get<ProductsResponse>(
      `${BASE_URL}/api/products?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Добавляем базовый URL к путям изображений
    const products = response.data;
    products.data.forEach((product) => {
      product.picture.forEach((pic) => {
        // Проверяем наличие изображения в формате large, если нет — ищем medium или small
        const imageUrl =
          pic.formats.large?.url ||
          pic.formats.medium?.url ||
          pic.formats.small?.url ||
          pic.formats.thumbnail?.url;

        if (imageUrl) {
          pic.formats.large = { url: `${BASE_URL}${imageUrl}` }; // Используем найденный URL
        }
      });
    });

    // console.log(products)

    return products;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export default getProducts;
