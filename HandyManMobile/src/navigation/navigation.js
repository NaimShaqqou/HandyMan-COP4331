import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './AuthStack.js'
import AppStack from './AppStack.js'



const Navigation = () => {
  return (
    <NavigationContainer>
      {/* <AuthStack /> */}
      <AppStack />
    </NavigationContainer>
  )
}

export default Navigation