import { Center, Box, ScrollView } from 'native-base'
import React from 'react'

import RegisterBox from '../components/RegisterBox.js'
import Logo from '../components/Logo.js'

const Register = () => {  

  return (
    <Box w='100%' flex={1} safeAreaTop backgroundColor={'primary.300'} >
      <Center safeAreaY>
        <Logo size="xl" />
      </Center>
      <ScrollView 
        safeAreaTop
        backgroundColor={'gray.100'}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center'
        }} 
        borderTopRadius='35'
      >
        <RegisterBox />
      </ScrollView>
    </Box>
  )
}

export default Register