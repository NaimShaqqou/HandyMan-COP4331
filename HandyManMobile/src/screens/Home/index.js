import { View } from 'react-native'
import { Text, Block, NavBar } from 'galio-framework'
import Header from '../../components/Header'
import React from 'react'

const Home = () => {
  return (
    <View>
    <Block flex safe>
      <Header title="Welcome to HandyMan!" />
    </Block>
    </View>
  )
}

export default Home