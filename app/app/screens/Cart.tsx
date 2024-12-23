import { Layout, Text, Button } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View, Image, TouchableOpacity } from 'react-native';
import { useCart } from '@/app/context/CartContext'; // Обновлено на CartContext
import { useAuth } from '@/app/context/AuthContext'; // Подключаем AuthContext
import { ProductsResponse } from '@/app/apiController/getProducts';
import { useFocusEffect } from '@react-navigation/native';

interface CartItemProps {
  item: ProductsResponse['data'][0];
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const imageUrl =
    item.picture[0].formats.large?.url ||
    item.picture[0].formats.medium?.url ||
    item.picture[0].formats.small?.url ||
    item.picture[0].formats.thumbnail?.url;

  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text category="h6" style={styles.title}>
          {item.title}
        </Text>
        <Text category="p2" style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>
        <Text category="s1" style={styles.price}>
          {item.price || 0} ₽
        </Text>
      </View>
      <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeButton}>
        <Text style={styles.removeText}>Удалить</Text>
      </TouchableOpacity>
    </View>
  );
};



const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { token } = useAuth(); // Получаем токен из AuthContext

  useFocusEffect(() => {

  });

  const handleRemove = (id: number) => {
    removeFromCart(id);
  };

  if (cart.length === 0) {
    return (
      <Layout style={styles.emptyCart}>
        <Text category="h5">Корзина пуста</Text>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <FlatList
        data={cart} // Выводим данные из контекста
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} onRemove={handleRemove} />}
        contentContainerStyle={styles.list}
      />
      <Button style={styles.clearButton} onPress={clearCart}>
        Очистить корзину
      </Button>
    </Layout>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f9fc',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontWeight: '700',
    color: '#222B45',
  },
  description: {
    color: '#8F9BB3',
    fontSize: 12,
    marginTop: 4,
  },
  price: {
    fontWeight: '700',
    color: '#F17D21',
    marginTop: 6,
  },
  removeButton: {
    padding: 8,
  },
  removeText: {
    color: '#F17D21',
    fontWeight: '700',
  },
  clearButton: {
    marginTop: 16,
  },
});

export default Cart;
