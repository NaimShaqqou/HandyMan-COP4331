import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Center } from 'native-base';
import { ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './src/navigation/AuthStack.js'
import AppStack from './src/navigation/AppStack.js'

// Context used to handle jwt things
import AppContext from './src/components/AppContext.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    jwtToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          jwtToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          //userName: action.id,
          jwtToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          //userName: null,
          jwtToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          //userName: action.id,
          jwtToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    Login: async({ jwtToken }) => {
      try {
        await AsyncStorage.setItem('jwtToken', jwtToken)
      } catch(e) {
        console.log(e)
      }
      dispatch({ type: 'LOGIN', token: jwtToken})
    },
    Logout: async() => {
      try {
        await AsyncStorage.removeItem('jwtToken')
      } catch(e) {
        console.log(e)
      }
      dispatch({ type: 'LOGOUT' })
    },
    Register: () => {
      setJwtToken('myToken');
      setIsLoading(false);
    },
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      let userToken = null
      try {
        userToken = await AsyncStorage.getItem('jwtToken')
      } catch(e) {
        console.log(e)
      }

      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000)
  }, [])

  if ( loginState.isLoading ) {
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
          { loginState.jwtToken != null ? <AppStack /> : <AuthStack /> }
        </NavigationContainer>

        <StatusBar style="auto" />

      </NativeBaseProvider>
    </AppContext.Provider>
  );
}