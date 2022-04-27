import React from "react";

import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopBar from "./TopBar.js";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{ headerShown: true, header: (props) => <TopBar {...props} /> }}
    >
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
