import { Box, Center, Heading, Button } from 'native-base'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import Logo from '../components/Logo.js'

const ConfirmEmail = () => {
    const navigation = useNavigation();

    const onConfirm = () => {
        navigation.navigate('Login');
    }
  return (
    <Box w="100%" flex={1} safeAreaTop backgroundColor={'primary.300'}>
        <Center flexGrow={1} >
            <Logo size="2xl" />
        </Center>
        <Box 
                flex={2} 
                backgroundColor={'gray.100'} 
                justifyContent='flex-start' 
                alignItems={'center'}
                borderTopRadius='35'
        >
            <Box safeArea w="90%" justifyContent='center' >
                <Heading size="xl" fontWeight="600">
                    Confirm your Email.
                </Heading>
                <Heading mt="4" fontWeight="medium" size="sm">
                    We have sent an email to the address you provided with instructions on how to confirm your email.
                </Heading>
                <Heading mt="4" fontWeight="medium" size="sm">
                    Once you have confirmed your email, click the button below to login to your account.
                </Heading>

                <Button 
                    onPress={ onConfirm }
                    size="lg"
                    w='100%'
                    mt={10}
                >
                    Go to login
                </Button>
            </Box>

        </Box>
    </Box>
  )
}

export default ConfirmEmail