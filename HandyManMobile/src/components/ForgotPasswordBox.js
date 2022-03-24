import React, { useState } from 'react'
import { Box, Heading, Center, Icon, FormControl, Input, Button, useToast } from 'native-base'
import { MaterialIcons } from "@native-base/icons"
import { useNavigation } from '@react-navigation/native'


const ForgotPasswordBox = () => {
    const onSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        var obj = { email: email }
        var js = JSON.stringify(obj);

        try {
            const response = await fetch('https://myhandyman1.herokuapp.com/api/forgot-password-email', {
                method: 'POST',
                body: js,
                headers: { "Content-Type": "application/json" }
            });

            var res = JSON.parse(await response.text());
            
            setLoading(false);
            toast.show({
                title: "Email Sent",
                status: "success",
                description: "We have sent an email to the address you provided with instructions on how to reset your password.",
                duration: null
              })
        } catch (e) {
            console.log(e.toString());
            return;
        }
    }

    const [email, setEmail] = useState('');
    const [valid, setValid] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const toast = useToast();

    return (
        <Box safeArea w="90%" justifyContent='center' >
            <Heading size="xl" fontWeight="600">
            Reset your Password
            </Heading>
            <Heading mt="1" fontWeight="medium" size="sm">
            Please enter your email below to continue.
            </Heading>

            <Center mt={10} w='100%'>
            <FormControl isInvalid={valid ? false : true}>
                    <Input 
                        variant="underlined" 
                        placeholder="Email" 
                        size="2xl" 
                        w="100%" 
                        InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />}
                        onChangeText={ newEmail => setEmail(newEmail) }
                    />
                </FormControl>
                    <Button 
                        onPress={ onSubmit }
                        size="lg"
                        w='100%'
                        isLoading={loading ? true : false}
                        isLoadingText='Logging in...'
                        _loading={{
                            bg: "primary.400:alpha.70",
                            _text: {
                            color: "coolGray.700"
                            }
                        }}
                        mt={10}
                    >
                        Submit
                    </Button>
                    <Button 
                        variant="ghost" 
                        colorScheme="blueGray" 
                        onPress={() => {navigation.goBack()}}
                        size='lg'
                        mt={4}
                        w='100%'
                    >
                        Back to Login
                    </Button>
            </Center>
        </Box>
    )
}

export default ForgotPasswordBox