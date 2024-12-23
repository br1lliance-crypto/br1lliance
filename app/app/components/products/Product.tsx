import { ProductsResponse } from '@/app/apiController/getProducts';
import { useCart } from '@/app/context/CartContext'; // Импортируем хук для работы с корзиной
import Feather from '@expo/vector-icons/Feather';
import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface ProductProps {
  item: ProductsResponse['data'][0];
}

const ProductImage: React.FC<ProductProps> = ({ item }) => {
  const imageUrl =
    item.picture[0].formats.large?.url ||
    item.picture[0].formats.medium?.url ||
    item.picture[0].formats.small?.url ||
    item.picture[0].formats.thumbnail?.url;

  return (
    <Image
      source={{ uri: imageUrl ? `${imageUrl}` : 'default_image_url' }}
      style={styles.image}
    />
  );
};

const Product: React.FC<ProductProps> = ({ item }) => {
  const { addToCart } = useCart(); // Достаём функцию добавления из контекста корзины

  const handleAddToCart = (product: ProductsResponse['data'][0]) => {
    addToCart(product); // Добавляем товар в корзину
  };

  return (
    <Layout level="2" style={styles.card}>
      <ProductImage item={item} />
      <Text category="h6" style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text category="p2" style={styles.description} numberOfLines={1}>
        {item.description}
      </Text>

      <View style={styles.priceAndCart}>
        <Text category="s1" style={styles.price}>
          {item.price || 0} ₽
        </Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => handleAddToCart(item)} // Передаем весь объект товара
        >
          <Feather name="shopping-cart" size={24} color="#f17d21" />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    padding: 10,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    fontWeight: '700',
    textAlign: 'left',
    color: '#222B45',
    fontSize: 14,
  },
  description: {
    marginTop: 6,
    color: '#8F9BB3',
    fontSize: 12,
    textAlign: 'left',
    maxHeight: 50,
  },
  price: {
    marginTop: 10,
    fontWeight: '700',
    color: '#F17D21',
    textAlign: 'left',
  },
  cartButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceAndCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Product;
