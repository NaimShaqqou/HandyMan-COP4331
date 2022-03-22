import { Center, Box } from 'native-base'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'

import Header from '../components/Header.js'
import MapView from 'react-native-maps'
import SearchBar from  '../components/SearchBar.js'

const Home = () => {
  return (
    <Center flex={1}>
      <MapView style={styles.map} />
      <Box w="100%" position={'absolute'} safeAreaTop alignItems='center' top={0} h="25%">
        <Box h='30%' backgroundColor={'black'}>
          <SearchBar mt='20' />
        </Box>
      </Box>
    </Center>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Home