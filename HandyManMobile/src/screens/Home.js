import { Center, Box, Button } from 'native-base'
import React from 'react'
import {StyleSheet } from 'react-native'

import Header from '../components/Header.js'
import ServicesMap from '../components/ServicesMap.js'
import SearchBar from  '../components/SearchBar.js'
import GooglePlacesInput from '../components/LocationSearchBar.js'

const Home = () => {

  return (
    <Center flex={1}>
      <ServicesMap />
      <Box w="100%" position={'absolute'} safeAreaTop alignSelf='flex-start' top={-40}>
        <Box style={styles.searchContainer}>
          {/* <Box h='30%'>
            <SearchBar mt='20' />
          </Box> */}
          <GooglePlacesInput />
          <Button style={styles.filterButton} />
        </Box>
      </Box>
    </Center>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 15,
    width: "95%",
    padding: 5
  },
  filterButton: {
    alignSelf: "flex-start",
    flex: 0,
    height: 25,
    width: 25,
    marginTop: 10,
    marginRight: 10,
  }
});

export default Home