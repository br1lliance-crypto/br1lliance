import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
    Layout,
    Input,
    Button,
    Text,
} from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import loginToStrapi from '@/app/apiController/login';
import { useLoading } from '@/app/context/LoadingContext';
import { useAuth } from '@/app/context/AuthContext';
import { RootStackParamList } from '@/app/_navigator/MainNavigator';

const Login = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setLoading, setText} = useLoading();
    const {login} = useAuth();

    const handleLogin = () => {
        setLoading(true);
        setText('Входим...');

        loginToStrapi(email, password).then(res => {
            console.log(res);
            if (res === null) {
                setText('Указаны неверные данные!');
                setTimeout(() => {
                    setLoading(false);
                }, 500)
            } else {
                if (res.jwt) {
                    setText('Вход выполнен!');
                    login({newToken: res.jwt, newUserID: res.user.documentId});
                    
                    setTimeout(() => {
                        setLoading(false);
                    }, 500)
                    navigation.navigate('TabNavigator');
                }
            }
        });
    };

    const handleGoToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <Layout style={styles.container}>
            <Text category="h1" style={styles.title}>
                Вход
            </Text>
            <Input
                style={styles.input}
                value={email}
                label="Email"
                placeholder="Введите ваш email"
                onChangeText={(nextValue) => setEmail(nextValue)}
            />
            <Input
                style={styles.input}
                value={password}
                label="Пароль"
                placeholder="Введите ваш пароль"
                secureTextEntry={true}
                onChangeText={(nextValue) => setPassword(nextValue)}
            />
            
            <View style={styles.bottomBlock}>
            <Button style={styles.button} onPress={handleLogin}>
                Войти
            </Button>
                <Button style={styles.buttonReg} onPress={handleGoToRegister}>Зарегистрироваться</Button>
            </View>
        </Layout>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        marginBottom: 24,
        textAlign: 'center',
        color: '#f6f'
    },
    input: {
        marginBottom: 16,
        width: '100%',
    },
    button: {
        marginTop: 16,
        width: '100%',
        backgroundColor: '#3c2',
        borderWidth: 0
    },

    bottomBlock: {
        width: '100%',
        // position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        // bottom: 0
    },
    buttonReg: {
        width: '100%',
        backgroundColor: '#f6f',
        borderWidth: 0
    },
    bottomBlockText: {
        color: '#0007'
    },

    animation: {
        width: 200,
        height: 200,
    }
});
