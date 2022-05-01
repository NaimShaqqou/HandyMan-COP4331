import React from 'react'

import Bookings from '../screens/Bookings'

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopBar from "./TopBar.js";

const Stack = createNativeStackNavigator();

const BookingsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BookingsScreen"
      screenOptions={{
        headerShown: true,
        header: (props) => <TopBar {...props} />,
      }}
    >
      <Stack.Screen name="BookingsScreen" component={Bookings} />
    </Stack.Navigator>
  )
}

export default BookingsStack