import React, { useState } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigation } from '@react-navigation/native'

import { Button, Box, Center, Input, Icon, Heading, FormControl, Link } from 'native-base'
import { MaterialIcons } from "@native-base/icons"

const LoginBox = () => {
    var bp = require("../Path.js");
    
    // call the login api
    const doLogin = async (event) => {
        event.preventDefault();

        var obj = { login: username, password: pass}
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath("api/login"), {
                method: 'POST',
                body: js,
                headers: { "Content-Type": "application/json" }
            });
            var res = JSON.parse(await response.text());

            // TODO: display errors in app
            if (res.id <= 0) {
                console.log("User/Password combination incorrect");
                console.warn("Wrong credentials");
            } else {
                console.log("login success!");
                var storage = require("../../tokenStorage.js");
                var user = jwt_decode(res);
                localStorage.setItem("user_data", JSON.stringify(user));
                storage.storeToken(res);

                // TODO: call navigation function here
            }
        } catch (e) {
            console.log(e.toString());
            return; 
          }
    }

    // to navigate between pages
    // refer to the "navigation" folder for more info
    const navigation = useNavigation();

    const onLoginPressed = () => {
        // TODO: Authentication
        console.log("Username: " + username + "\nPassword: " + pass)

        doLogin();

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
    
    // used for hiding/unhiding the password
    const [show, setShow] = useState('');


    return (
        <Box safeArea w="90%" p="2" py="8" justifyContent='center' >
        <Heading size="xl" fontWeight="600">
          Welcome to Handler
        </Heading>
        <Heading mt="1" fontWeight="medium" size="sm">
          Login to continue! 
        </Heading>

        <Center mt={10} w='100%'>
          <FormControl>
            <Input 
              variant="underlined" 
              placeholder="Username" 
              size="2xl" 
              w="100%" 
              InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
              onChangeText={ newUsername => setUsername(newUsername) }
            />
          </FormControl>
          <FormControl mt={8}>
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
          </FormControl>
          
          <Button 
            onPress={ doLogin }
            size="lg"
            w="100%"
            mt={6}
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