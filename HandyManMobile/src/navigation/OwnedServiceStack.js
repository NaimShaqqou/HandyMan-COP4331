import React from "react";

import Services from "../screens/Services.js";
import EditService from "../screens/EditService.js";
import AddService from "../screens/AddService.js";
import RequestedServices from "../screens/RequestedServices.js";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopBar from "./TopBar.js";

const Stack = createNativeStackNavigator();

const OwnedServiceStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ServicesScreen"
      screenOptions={{
        headerShown: true,
        header: (props) => <TopBar {...props} />,
      }}
    >
      <Stack.Screen name="ServicesScreen" component={Services} />
      <Stack.Screen name="EditService" component={EditService} />
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="RequestedServices" component={RequestedServices} />
    </Stack.Navigator>
  );
};

export default OwnedServiceStack;
