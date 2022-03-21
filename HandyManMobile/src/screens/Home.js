import { Center, Box } from 'native-base'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native';

import Header from '../components/Header.js'
import MapView from 'react-native-maps';

const Home = () => {
  return (
    <Center>
      {/* <Box w="100%" bg={'primary.500'} h='10' /> */}
      <Box w="100%">
        <Header title="Home" />
      </Box>
      <Center>
        <MapView style={styles.map} />
      </Center>
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