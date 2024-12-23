import React from 'react';
import { useLoading } from '@/app/context/LoadingContext';
import LottieView from 'lottie-react-native';
import { Modal, StyleSheet, Text, View } from 'react-native';

const Loading = () => {
  const { isLoading } = useLoading(); // Получаем состояние из контекста
  const { modalText } = useLoading();

  return (
    <Modal visible={isLoading} style={{flex: 1}} transparent>
      <View style={styles.container}>
        <LottieView
          source={require('../../../assets/images/steps.json')}
          autoPlay
          loop
          style={{width: 200, height: 200}}
        />
        <Text style={ styles.text }>{modalText}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  }
});

export default Loading;
