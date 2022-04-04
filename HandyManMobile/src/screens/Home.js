import { Center, Box } from 'native-base'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'

import Header from '../components/Header.js'
import ServicesMap from '../components/ServicesMap.js'
import SearchBar from  '../components/SearchBar.js'
import GooglePlacesInput from '../components/LocationSearchBar.js'

const Home = () => {

  return (
    <Center flex={1}>
      {/* NEW */}
      <ServicesMap />
      {/* NEW */}
      <Box w="100%" position={'absolute'} safeAreaTop alignItems='center' top={0} h="25%">
        <Box h='30%'>
          <SearchBar mt='20' />
        </Box>
        {/* NEW */}
        <Box h='1000'>
          <GooglePlacesInput mt='20' />
        </Box>
        {/* NEW */}
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