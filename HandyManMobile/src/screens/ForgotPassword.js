import { Center, Box, KeyboardAvoidingView } from 'native-base'
import React from 'react'
import { useTheme } from 'react-native-paper'

import ForgotPasswordBox from '../components/ForgotPasswordBox.js'
import Logo from '../components/Logo.js'

const ForgotPassword = () => {
    const { colors } = useTheme();

    return (
        <KeyboardAvoidingView
      behavior="padding"
      flex={1}
      w="100%"
      alignItems={"center"}
    >
        <Box w="100%" flex={1} safeAreaTop backgroundColor={colors.primary}>
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
    </KeyboardAvoidingView>

    )
}

export default ForgotPassword