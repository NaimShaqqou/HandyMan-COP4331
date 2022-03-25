import React, { useState } from 'react'
import AppContext from './AppContext.js'
import { useNavigation } from '@react-navigation/native'

import { 
    Button, 
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
import { MaterialIcons } from "@native-base/icons"

// to store user info in global variable
//const context = useContext(AppContext)

const LoginBox = () => {
    const { Login } = React.useContext(AppContext);

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
                
                Login({jwtToken: res.jwtToken})
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
    const [email, setEmail] = useState('');
    
    // form things
    const [show, setShow] = useState(false);
    const [valid, setValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [showModal, setShowModal] = useState(false);


    return (
        <Box w="90%" p="2" py="8" justifyContent='center' >
        <Heading size="xl" fontWeight="600">
          Welcome to Handler
        </Heading>
        <Heading mt="1" fontWeight="medium" size="sm">
          Login to continue! 
        </Heading>

        {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content>
                <Modal.Header>Reset your Password</Modal.Header>
                <Modal.Body>
                    <Text>
                        Please enter the email that is associated with your account.
                    </Text>
                    <Text>
                        After clicking the "Confirm" button, you will receive an email
                        with instructions on how to reset your password. 
                    </Text>
                    <FormControl mt='10px'>
                        <Input 
                            variant='underlined' 
                            placeholder='Email'
                            InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />}
                            size='xl'
                            onChangeText={newEmail => setEmail(newEmail)}
                        />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {setShowModal(false)}}>
                            Cancel
                        </Button>
                        <Button onPress={ onForgotPasswordPressed }>
                            Confirm
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal> */}

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