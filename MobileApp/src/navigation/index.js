import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage/';
import HomePage from '../pages/HomePage';

const Stack = createNativeStackNavigator();


const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="Home" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation