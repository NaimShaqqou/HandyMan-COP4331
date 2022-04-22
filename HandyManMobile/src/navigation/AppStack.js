import { View, Text } from 'react-native'
import React from 'react'

import AppStack from './Drawer';
import EditProfile from '../screens/EditProfile.js'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const AppStackTest = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="drawer"
                component={AppStack}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{headerShown: true, headerLeft: () => null}}
            />
        </Stack.Navigator>
    )
}

export default AppStackTest