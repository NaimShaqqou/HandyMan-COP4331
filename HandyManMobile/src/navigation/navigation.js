import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Center } from 'native-base'
import { ActivityIndicator } from 'react-native'

import AuthStack from './AuthStack.js'
import AppStack from './AppStack.js'



const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthStack />
      {/* <AppStack /> */}
    </NavigationContainer>
  )
}

export default Navigation