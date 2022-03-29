import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack.js'
import AppStack from './AppStack.js'

import React, { useState } from 'react'

import { useSelector } from 'react-redux'



const Navigation = () => {
    const user = useSelector((state) => state.user)

    return (
        <NavigationContainer>
            { user.isLoggedIn ? <AppStack /> : <AuthStack /> }
        </NavigationContainer>
    )
}

export default Navigation