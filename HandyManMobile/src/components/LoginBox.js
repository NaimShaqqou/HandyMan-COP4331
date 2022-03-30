import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

// react redux imports
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../reducerStore/ActionCreators/index'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
    Box,
    Center, 
    Input, 
    Icon, 
    Heading, 
    FormControl, 
    Link, 
    WarningOutlineIcon, 
    Modal,
    Text
} from 'native-base'
import { Button } from 'react-native-paper'
import { MaterialIcons } from "@native-base/icons"

// to store user info in global variable
//const context = useContext(AppContext)

const storeInfo = async (userInfo) => {
    try {
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
    } catch (err) {
        console.log(err)
    }
}

const LoginBox = () => {
    // const { authContext } = React.useContext(AppContext)
    const dispatch = useDispatch();
    const { updateCurrentUser } = bindActionCreators(ActionCreators, dispatch);

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

            if (res.error != '') {
                setValid(false);
                setMsg(res.error);
            } else {
                setValid(true);
                console.log("login success!");

                const user = {
                    userId: res.userId,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    profilePicture: res.profilePicture,
                    profileDescription: res.profileDescription,
                    jwtToken: res.jwtToken
                }

                updateCurrentUser(user) // update redux state
                storeInfo(user) // store to localstorage

                // authContext.Login({
                //     userId: res.userId,
                //     firstName: res.firstName,
                //     lastName: res.lastName,
                //     profilePicture: res.profilePicture,
                //     profileDescription: res.profileDescription,
                //     jwtToken: res.jwtToken
                // })
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

    // sends a reset password email to the user
    const onForgotPasswordPressed = async (event) => {
        navigation.navigate('forgotPassword');
    }

    const onRegisterTransition = () => {
        navigation.navigate('Register');
    }

    // username: contains username typed by the user
    // password: contains password typed by the user
    // email: contains the email to reset the password
    const [username, setUsername] = useState('');
    const [pass, setPassword] = useState('');
    
    // form things
    const [show, setShow] = useState(false);
    const [valid, setValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');


    return (
        <Box w="90%" p="2" py="8" justifyContent='center' >
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
              onPress={onForgotPasswordPressed}
            >
              Forgot Password?
            </Link>

            <Button 
                onPress={doLogin}
                mode='contained'
                loading={loading ? true : false}
                style={{
                    width: '100%',
                    marginTop: 20
                }}
            >
                Login
            </Button>

            <Button 
                onPress={onRegisterTransition}
                mode='outlined'
                style={{
                    width: '100%',
                    marginTop: 20
                }}
            >
                Don't have an account?
            </Button>

            {/* <Button 
                onPress={ doLogin }
                size="lg"
                w="100%"
                mt={6}
                isLoading={loading ? true : false}
                isLoadingText='Logging in...'
                _loading={{
                    bg: "primary.400:alpha.70",
                    _text: {
                      color: "coolGray.700"
                    }
                }}
            >
                Login
            </Button> */}

            {/* <Button 
                mt={6}
                variant="outline"
                onPress={ onRegisterTransition }
                w="100%"
            >
                Don't have an account? Register here!
            </Button> */}
        </Center>
      </Box>
    );
}

export default LoginBox