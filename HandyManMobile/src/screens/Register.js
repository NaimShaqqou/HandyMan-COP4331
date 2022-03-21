import { Center, Box } from 'native-base'
import React from 'react'

import RegisterBox from '../components/RegisterBox.js'
import Logo from '../components/Logo.js'

const Register = () => {  

  return (
    <Box w='100%' flex={1} safeAreaTop backgroundColor={'primary.300'}>
      <Center flexGrow={1}>
        <Logo size="xl" />
      </Center>
      <Box 
        flex={10}
        backgroundColor={'gray.100'} 
        justifyContent='flex-start' 
        alignItems={'center'}
        borderTopRadius='35'
      >
        <RegisterBox />
      </Box>
    </Box>
  )
}

export default Register