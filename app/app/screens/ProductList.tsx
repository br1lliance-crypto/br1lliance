import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Layout } from '@ui-kitten/components';
import getProducts, { ProductsResponse } from '../apiController/getProducts';
import { useAuth } from '../context/AuthContext';
import Product from '../components/products/Product';
import { useLoading } from '../context/LoadingContext';

const ProductList = () => {
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useAuth();
  const { setLoading, setText } = useLoading();

  const fetchProducts = useCallback(async () => {
    if (!token) {
      return;
    }

    try {
      const response = await getProducts({ token });
      setProducts(response);
      console.log(response)
    } catch (error) {
      console.error('Ошибка при загрузке продуктов:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onRefresh = async () => {
    setLoading(true);
    setText('Обновляю...');
    await fetchProducts();
    setTimeout(() => {
        setLoading(false);
        setRefreshing(false);
    }, 500)
  };

  return (
    <Layout style={styles.container}>
      <FlatList
        data={products?.data || []}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => <Product item={item} />}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default ProductList;
