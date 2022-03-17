import { useWindowDimensions } from 'react-native'
import { Button, Box, Center, Input, Icon, Heading, FormControl } from 'native-base'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from "@native-base/icons"


const Register = () => {
  // email: email the user inputs
  // username: username the user inputs
  // password: password the user inputs
  // passwordRepeat: repeated password the user inputs
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  // logic for revealing password
  const [show, setShow] = useState('');

  const { height } = useWindowDimensions(); // not needed anymore
  const navigation = useNavigation();

  const onRegisterPressed = () => {
    // TODO: email confirmation
      // make sure user enters proper email, passwords, available username
      // call register api

    // for testing purposes
    console.warn("Email: " + email + "\nusername: " + username + "\npassword: " + password + "\npasswordRepeat: " + passwordRepeat);
    
    navigation.navigate('Home');
  }

  const onLoginTransition = () => {
    navigation.navigate('Login');
  }

  return (
    
    <Center w="100%" flex={1} >
      <Box safeArea w="90%" p="2" py="8" justifyContent='center' >
        

        <Heading size="xl" fontWeight="600">
          Welcome to Handler
        </Heading>
        <Heading mt="1" fontWeight="medium" size="sm">
          Register to continue! 
        </Heading>
        
        <Center mt={10} w='100%'>
          <FormControl>
            <Input 
              variant="underlined" 
              placeholder="Email" 
              size="2xl" 
              w="100%" 
              InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />}
              onChangeText={newEmail => setEmail(newEmail)}
            />
          </FormControl>

          <FormControl mt={8}>
            <Input 
              variant="underlined" 
              placeholder="Username" 
              size="2xl" 
              w="100%" 
              InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
              onChangeText={newUsername => setUsername(newUsername)}
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
              onChangeText={newPassword => setPassword(newPassword)}
            />
          </FormControl>

          <FormControl mt={8}>
            <Input 
              variant="underlined" 
              placeholder="Confirm Password" 
              size="2xl" 
              w="100%" 
              type={show ? "text" : "password"}
              InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} 
                size={5} mr="2" color="muted.400" onPress={() => setShow(!show)} />}
              InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />}
              onChangeText={newPasswordRepeat => setPasswordRepeat(newPasswordRepeat)}
            />
          </FormControl>

          <Button 
            onPress={ onRegisterPressed }
            size="lg"
            w="100%"
            mt={8}
          >
            Register
          </Button>

          <Button 
            mt={6}
            variant="outline"
            onPress={onLoginTransition}
            w="100%"
          >
            Already have an account? Login here!
          </Button>
        </Center>
      </Box>
    </Center>
  )
}

export default Register

{/* <CustomInput
placeholder="Email"
value={email}
setValue={setEmail}
/> */}

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

{/* <CustomInput 
placeholder="Confirm Password" 
value={passwordRepeat} 
setValue={setPasswordRepeat} 
secureTextEntry 
/> */}

{/* <CustomButton 
text="Register" 
onPress={onRegisterPressed}
type="PRIMARY"
/>

<CustomButton 
text="Already have an account? Click here!"
onPress={onLoginTransition}
type="TERTIARY"
/> */}