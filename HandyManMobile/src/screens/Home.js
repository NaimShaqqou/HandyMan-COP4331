import { Center, Box } from 'native-base'
import React from 'react'
import Header from '../components/Header.js'

const Home = () => {
  return (
    <Center>
      {/* <Box w="100%" bg={'primary.500'} h='10' /> */}
      <Box w="100%">
        <Header title="Home" />
      </Box>
    </Center>
  )
}

export default Home