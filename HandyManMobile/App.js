import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Center } from 'native-base';
import { ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './src/navigation/AuthStack.js'
import AppStack from './src/navigation/AppStack.js'

// Context used to handle jwt things
import AppContext from './src/components/AppContext.js'

export default function App() {
  const [userData, setUserData] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authContext = React.useMemo(() => ({
    Login: () => {
      setJwtToken('myToken');
      setIsLoading(false);
    },
    Logout: () => {
      setJwtToken(null);
      setIsLoading(false);
    },
    Register: () => {
      setJwtToken('myToken');
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, [])

  if ( isLoading ) {
    return (
      <NativeBaseProvider>
        <Center flex={1}>
          <ActivityIndicator size="large" />
        </Center>
      </NativeBaseProvider>
    );
  }

  return (
    <AppContext.Provider value={authContext}>
      <NativeBaseProvider>
        <NavigationContainer>
          { jwtToken == null ? <AppStack /> : <AuthStack /> }
        </NavigationContainer>

        <StatusBar style="auto" />

      </NativeBaseProvider>
    </AppContext.Provider>
  );
}

// Context stuff, will use that to store jwt and see if user is logged in
// const userSettings = {
//   userData: '',
//   isLoggedIn: false,
//   jwtToken: '',
//   userLogin,
//   userLogout,
// }

// const userLogin = ({ jwtToken, userData }) => {
//   setIsLoggedIn(true)
//   setJwtToken({ jwtToken })
//   setUserData({ userData })
// }

// const userLogout = () => {
//   setIsLoggedIn(false)
//   setJwtToken('')
//   setUserData('')
// }

// jwtToken storage (need redux bc local storage doesn't work)
//localStorage.setItem("user_data", JSON.stringify(user));
//storage.storeToken(res);