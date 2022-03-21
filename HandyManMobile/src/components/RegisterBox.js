import { React, useState } from 'react'
import { Button, Box, Center, Input, Icon, Heading, FormControl } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from "@native-base/icons"

const RegisterBox = () => {
    const navigation = useNavigation();

    const doRegister = async (event) => {
        event.preventDefault();

        // call register api

        // if successful navigate to confirm email page
        // if error, then determine type of error and display it
    }

    const onLoginTransition = () => {
        navigation.navigate('Login');
    }
    
    // email: email the user inputs
    // username: username the user inputs
    // password: password the user inputs
    // passwordRepeat: repeated password the user inputs
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    // logic for revealing password
    const [showPass, setShowPass] = useState(false);
    const [showRepeat, setShowRepeat] = useState(false);
  
    return (
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
              type={showPass ? "text" : "password"}
              InputRightElement={<Icon as={<MaterialIcons name={showPass ? "visibility" : "visibility-off"} />} 
                size={5} mr="2" color="muted.400" onPress={() => setShowPass(!showPass)} />}
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
              type={showRepeat ? "text" : "password"}
              InputRightElement={<Icon as={<MaterialIcons name={showRepeat ? "visibility" : "visibility-off"} />} 
                size={5} mr="2" color="muted.400" onPress={() => setShowRepeat(!showRepeat)} />}
              InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />}
              onChangeText={newPasswordRepeat => setPasswordRepeat(newPasswordRepeat)}
            />
          </FormControl>

          <Button 
            onPress={ doRegister }
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
  )
}

export default RegisterBox