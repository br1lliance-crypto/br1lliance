import React, { useState, useCallback } from 'react'
import { Layout, Input } from '@ui-kitten/components'
import { StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather'

interface HeaderProps {}

const HeaderSearch: React.FC<HeaderProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const onSearchChange = useCallback((query: string): void => {
    setSearchQuery(query)
  }, [])

  const onSearchSubmit = useCallback(() => {
    console.log('Search submitted:', searchQuery)
  }, [searchQuery])

  const renderSearchIcon = useCallback(() => (
    <TouchableOpacity>
      <Feather name='search' size={22} color="#f17d21" />
    </TouchableOpacity>
  ), [onSearchSubmit])

  const goSeacrh = useCallback(() => (
    <TouchableOpacity onPress={onSearchSubmit}>
      <Feather name='arrow-right' size={22} color="#f17d21" />
    </TouchableOpacity>
  ), [onSearchSubmit])

  return (
    <Layout style={styles.header}>
      <Input
        style={styles.searchInput}
        placeholder='Тут можно написать, что хотите найти'
        value={searchQuery}
        onChangeText={onSearchChange}
        accessoryLeft={renderSearchIcon}
        accessoryRight={goSeacrh}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align left to avoid stretching
    width: '100%',
  } as ViewStyle,
  searchInput: {
    flex: 1, // Ensure input takes all available space
    borderRadius: 8,
    borderWidth: 0,
  } as TextStyle,
})

export default HeaderSearch
