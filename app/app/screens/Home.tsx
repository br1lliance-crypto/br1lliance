import { Button, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { logout } = useAuth();
  const handleExit = () => {
    logout();
  }
  return (
    <Layout style={{flex: 1, padding: 20, gap: 20}}>
      <Layout style={{flex: 1, backgroundColor: '#eee', borderRadius: 10, padding: 20}}>
        <Text style={{fontWeight: 600, fontSize: 18}}>История заказов</Text>
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          <Text>Заказов пока нет</Text>
        </Layout>
      </Layout>
      <Button onPress={handleExit} style={{backgroundColor: '#f17d21', borderWidth: 0}}>Выйти из аккаунта</Button>
    </Layout>
  )
}

export default Home
