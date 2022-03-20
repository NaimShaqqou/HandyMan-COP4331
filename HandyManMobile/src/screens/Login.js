import React from 'react'

// native-base
import { Box, Center } from 'native-base'

// components
import LoginBox from "../components/LoginBox.js"
import Logo from '../components/Logo.js'


const Login = () => {
  return (
    <Box w="100%" flex={1} safeAreaTop backgroundColor={'primary.300'}>
      <Center flexGrow={1} >
        <Logo size="2xl" />
      </Center>
      <Box 
        flex={10} 
        backgroundColor={'gray.100'} 
        justifyContent='flex-start' 
        alignItems={'center'}
        borderTopRadius='35'
      >
        <LoginBox />
      </Box>
    </Box>
  )
}

export default Login