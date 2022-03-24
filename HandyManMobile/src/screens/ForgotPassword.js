import { Center, Box } from 'native-base'
import React from 'react'

import ForgotPasswordBox from '../components/ForgotPasswordBox.js'
import Logo from '../components/Logo.js'

const ForgotPassword = () => {

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
                <ForgotPasswordBox />
            </Box>
        </Box>
    )
}

export default ForgotPassword