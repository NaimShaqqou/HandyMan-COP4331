import { Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Button, Box, Center, Input, Icon, Heading, FormControl, Link } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from "@native-base/icons"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [show, setShow] = useState('');

  const { height } = Dimensions.get('window').height;
  const navigation = useNavigation();

  const onLoginPressed = () => {
    // Authentication

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

  return (
    <Center w="100%" flex={1} >
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
            />
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
          </FormControl>
          
          <Button 
            onPress={ onLoginPressed }
            size="lg"
            w="100%"
            mt={6}
          >
            Login
          </Button>

          <Button 
            mt={6}
            variant="outline"
            onPress={onRegisterTransition}
            w="100%"
          >
            Don't have an account? Register here!
          </Button>
        </Center>
      </Box>
    </Center>
  )
}

export default Login

{/* <CustomInput
  placeholder="Username"
  value={username}
  setValue={setUsername}
/> */}

{/* <CustomInput 
placeholder="Password" 
value={password} 
setValue={setPassword} 
secureTextEntry 
/> */}

{/* <CustomButton 
text="Login" 
onPress={onLoginPressed}
type="PRIMARY"
/> */}

{/* <CustomButton 
  text="Forgot Password?" 
  onPress={onForgotPasswordPressed} 
  type="TERTIARY"
/> */}

{/* <CustomButton 
  text="Don't have an account? Click here!"
  onPress={onRegisterTransition}
  type="TERTIARY"
/> */}