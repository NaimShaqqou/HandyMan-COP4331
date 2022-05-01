import React from "react";

import Home from "../screens/Home";
import ServiceInfo from "../screens/ServiceInfo";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopBar from "./TopBar.js";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{ headerShown: false, header: (props) => <TopBar {...props} /> }}
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="ServiceInfoScreen" component={ServiceInfo} options={{headerShown: true}}/>
    </Stack.Navigator>
  );
};

export default HomeStack;