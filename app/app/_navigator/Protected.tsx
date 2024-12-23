import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './MainNavigator';
import TabNavigator from './TabNavigator';
import Login from '../screens/Auth/Login';

const Protected = () => {
    const { token } = useAuth();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        if (token === null) {
            navigation.navigate('Login');
        }
    }, [token, navigation]);
    
    if (!token) {
        return <Login />;
    }
    return <TabNavigator />
}

export default Protected
