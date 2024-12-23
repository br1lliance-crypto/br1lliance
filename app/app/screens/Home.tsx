import { Button, Layout, Text } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getUser } from '../apiController/getUser';

const Home = () => {
  const { logout } = useAuth();
  const { token } = useAuth();

  const [user, setUser] = useState();
  const handleExit = () => {
    logout();
  }

  useEffect(() => {
    if (!token) return; 
    getUser(token).then(res => {
      setUser(res);
    })
  }, [])

  return (
    <Layout style={{flex: 1, padding: 20, gap: 20}}>
      <Layout style={{flex: 1, backgroundColor: '#0000', borderRadius: 10, padding: 20}}>
        {user ? (
            <>
              <Text style={{fontWeight: 700, fontSize: 30, color: '#f6f'}}>{user.username}</Text>
              <Text>Почта: {user.email}</Text>
              <Text>Дата регистрации: {user.createdAt.split('T')[0]}</Text>
            </>
          )
        : <Text>Не удалось загрузить пользователя</Text>
        }
      </Layout>
      <Button onPress={handleExit} style={{backgroundColor: '#f6f', borderWidth: 0}}>Выйти из аккаунта</Button>
    </Layout>
  )
}

export default Home
