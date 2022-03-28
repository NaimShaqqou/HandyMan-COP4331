import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack.js'
import AppStack from './AppStack.js'

import React from 'react'

import { useSelector } from 'react-redux'
import { store } from '../../reducerStore/store.js'

const Navigation = () => {
    const state = useSelector((state) => state)
    console.log(state)

    return (
        <NavigationContainer>
            { useSelector((state => state)).user.jwtToken != "" ? <AppStack /> : <AuthStack /> }
        </NavigationContainer>
    )
}

export default Navigation