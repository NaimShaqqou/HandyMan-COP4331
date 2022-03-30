import { React, useState } from 'react'
import { Button, Box, Center, Input, Icon, Heading, FormControl, WarningOutlineIcon } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from "@native-base/icons"

const RegisterBox = () => {
    const navigation = useNavigation();

    const doRegister = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setValid(true);
        setPassValid(true);
        setUserValid(true);
        setEmailValid(true);

        if (password != passwordRepeat)
        {
          setPassValid(false);
          setMsg("Passwords do not match.");
          setIsLoading(false);
          return;
        }

        // call register api
        var obj = { 
          email: email, 
          username: username, 
          password: password, 
          firstName: fName, 
          lastName: lName
        }
        var js = JSON.stringify(obj);

        try {
          const response = await fetch('https://myhandyman1.herokuapp.com/api/register', {
              method: 'POST',
              body: js,
              headers: { "Content-Type": "application/json" }
          });
          var res = JSON.parse(await response.text());

          if (res.error == '') {
            navigation.navigate('confirmEmail');
          } else if (res.error == 'Username already exists. Please enter a different username.') {
            setUserValid(false);
            setUserMsg(res.error);
            setIsLoading(false);
          } else if (res.error == 'Email already exists. Please enter a different email.') {
            setEmailValid(false);
            setEmailMsg(res.error);
            setIsLoading(false);
          } else {
            // everything invalid 
            setEmailValid(false);
            setUserValid(false);
            setValid(false);
            setMsg(res.error)
          }

        } catch (e) {
          console.log(e.toString());
          setLoading(false);
          return; 
        }

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
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');

    // logic for forms
    const [showPass, setShowPass] = useState(false);
    const [showRepeat, setShowRepeat] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const [userValid, setUserValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [valid, setValid] = useState(true);
    const [passValid, setPassValid] = useState(true);
    const [msg, setMsg] = useState('');
    const [userMsg, setUserMsg] = useState('');
    const [emailMsg, setEmailMsg] = useState('');

  
    return (
        <Box  w="90%" p="2" py="8" justifyContent='center' >
        

        <Heading size="xl" fontWeight="600">
          Welcome to Handler
        </Heading>
        <Heading mt="1" fontWeight="medium" size="sm">
          Register to continue! 
        </Heading>
        
        <Center mt={10} w='100%'>
        <FormControl flexDir={'row'} isInvalid={valid? false : true}>
            <Input 
              variant="underlined" 
              placeholder="First Name" 
              size="2xl" 
              w="50%" 
              InputLeftElement={<Icon as={<MaterialIcons name="contact-mail" />} size={5} ml="2" color="muted.400" />}
              onChangeText={newFName => setFName(newFName)}
            />
            <Input 
              variant="underlined" 
              placeholder="Last Name" 
              size="2xl" 
              w="50%" 
              InputLeftElement={<Icon as={<MaterialIcons name="contact-mail" />} size={5} ml="2" color="muted.400" />}
              onChangeText={newLName => setLName(newLName)}
            />
          </FormControl>

          <FormControl mt={8} isInvalid={emailValid ? false : true}>
            <Input 
              variant="underlined" 
              placeholder="Email" 
              size="2xl" 
              w="100%" 
              InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />}
              onChangeText={newEmail => setEmail(newEmail)}
            />

            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              { emailMsg }
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl mt={8} isInvalid={userValid ? false : true}>
            <Input 
              variant="underlined" 
              placeholder="Username" 
              size="2xl" 
              w="100%" 
              InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
              onChangeText={newUsername => setUsername(newUsername)}
            />

            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              { userMsg }
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl mt={8} isInvalid={passValid? false : true}>
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

          <FormControl mt={8} isInvalid={passValid? false : true}>
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

            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              { msg }
            </FormControl.ErrorMessage>
          </FormControl>

          <Button 
            onPress={ doRegister }
            size="lg"
            w="100%"
            mt={8}
            isLoading={loading ? true : false}
            isLoadingText='Registering...'
            _loading={{
                bg: "primary.400:alpha.70",
                _text: {
                  color: "coolGray.700"
                }
            }}
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