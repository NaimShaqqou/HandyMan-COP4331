import React, { useState, useContext } from 'react'
import AppContext from './AppContext.js'
import jwt_decode from "jwt-decode";
import { useNavigation } from '@react-navigation/native'

import { Button, Box, Center, Input, Icon, Heading, FormControl, Link, WarningOutlineIcon } from 'native-base'
import { MaterialIcons } from "@native-base/icons"

// to store user info in global variable
//const context = useContext(AppContext)

const LoginBox = () => {    
    // call the login api
    const doLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

        var obj = { login: username, password: pass}
        var js = JSON.stringify(obj);

        try {
            const response = await fetch('https://myhandyman1.herokuapp.com/api/login', {
                method: 'POST',
                body: js,
                headers: { "Content-Type": "application/json" }
            });
            var res = JSON.parse(await response.text());

            // TODO: display errors in app
            if (res.error != null) {
                setValid(false);
                setMsg(res.error);
            } else {
                setValid(true);
                console.log("login success!");
                var user = jwt_decode(res.jwtToken);

                // context.userLogin({jwtToken: res.jwtToken, userData:user})
                // console.log("UserData: " + context.userData + "\njwtToken: " + context.jwtToken)

                // TODO: call navigation function here
                goToHome();
            }

            setLoading(false);
        } catch (e) {
            console.log(e.toString());
            setLoading(false);
            return; 
          }
    }

    // to navigate between pages
    // refer to the "navigation" folder for more info
    const navigation = useNavigation();

    const goToHome = () => {
        // this takes the user to the home page
        navigation.navigate('Home');
    }

    const onForgotPasswordPressed = () => {
        console.warn("Forgot Password Pressed");

        // TODO: create forgot password page
        // navigate to that page from here
    }

    const onRegisterTransition = () => {
        navigation.navigate('Register');
    }

    // username: contains username typed by the user
    // password: contains password typed by the user
    const [username, setUsername] = useState('');
    const [pass, setPassword] = useState('');
    
    // form things
    const [show, setShow] = useState(false);
    const [valid, setValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');


    return (
        <Box safeArea w="90%" justifyContent='center' >
        <Heading size="xl" fontWeight="600">
          Welcome to Handler
        </Heading>
        <Heading mt="1" fontWeight="medium" size="sm">
          Login to continue! 
        </Heading>

        <Center mt={10} w='100%'>
            <FormControl isInvalid={valid? false : true}>
                <Input 
                variant="underlined" 
                placeholder="Username" 
                size="2xl" 
                w="100%" 
                InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
                onChangeText={ newUsername => setUsername(newUsername) }
                />
            </FormControl>

            <FormControl mt={8} isInvalid={valid? false : true}>
                <Input 
                variant="underlined" 
                placeholder="Password" 
                size="2xl" 
                w="100%" 
                type={show ? "text" : "password"}
                InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} 
                    size={5} mr="2" color="muted.400" onPress={() => setShow(!show)} />}
                InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />}
                onChangeText={ newPassword => setPassword(newPassword) }
                />

                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    { msg }
                </FormControl.ErrorMessage>
            </FormControl>
          
            <Link _text={{
              fontWeight: '500',
              color: 'secondary.500'
            }}
              alignSelf='flex-end'
              mt='1'
              onPress={ onForgotPasswordPressed }
            >
              Forgot Password?
            </Link>

            <Button 
                onPress={ doLogin }
                size="lg"
                w="100%"
                mt={6}
                isLoading={loading ? true : false}
                isLoadingText='Logging in...'
            >
                Login
            </Button>

            <Button 
                mt={6}
                variant="outline"
                onPress={ onRegisterTransition }
                w="100%"
            >
                Don't have an account? Register here!
            </Button>
        </Center>
      </Box>
    );
}

export default LoginBox