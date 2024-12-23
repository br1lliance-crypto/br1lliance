import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Layout,
    Input,
    Button,
    Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useLoading } from '@/app/context/LoadingContext';
import registerUser from '@/app/apiController/registration';
import { useAuth } from '@/app/context/AuthContext';

const Register = () => {
    const [loginField, setLoginField] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retryPassword, setRetryPassword] = useState('');

    const {setLoading, setText} = useLoading();
    const {login} = useAuth();

    const navigation = useNavigation();

    const handleLogin = () => {
        setLoading(true);
        setText('Регистрирую...');

        registerUser(loginField, email, password).then(res => {
            if (res === null) {
                setText('Вы не зарегистрированы!');
                setTimeout(() => {
                    setLoading(false);
                }, 500)
            } else {
                if (res.jwt) {
                    setText('Регистрация выполнена!');
                    login({newToken: res.jwt, newUserID: res.user.documentId});
                    
                    setTimeout(() => {
                        setLoading(false);
                    }, 500)
                    navigation.navigate('TabNavigator');
                }
            }
        });
    };

    const handleGoToLogin = () => {
        navigation.navigate('Login');
    };


    return (
        <Layout style={styles.container}>
            <Text category="h1" style={styles.title}>
                Регистрация
            </Text>
            <Input
                style={styles.input}
                value={loginField}
                label="Логин"
                placeholder="Придумайте логин"
                onChangeText={(nextValue) => setLoginField(nextValue)}
            />
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
            <Input
                style={styles.input}
                value={retryPassword}
                label="Повторите пароль"
                placeholder="Повторите ваш пароль"
                secureTextEntry={true}
                onChangeText={(nextValue) => setRetryPassword(nextValue)}
            />

            <View style={styles.bottomBlock}>
                <Button style={styles.button} onPress={handleLogin} appearance="filled">Регистрация</Button>
                <Button style={styles.buttonReg} onPress={handleGoToLogin}><Text>Войти</Text></Button>
            </View>
        </Layout>
    );
};

export default Register;

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
        borderWidth: 0,
        color: '#fff'
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
