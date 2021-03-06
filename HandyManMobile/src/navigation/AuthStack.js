import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/Login.js";
import RegisterScreen from "../screens/Register.js";
import HomeScreen from "../screens/Home.js";
import ForgotPassword from "../screens/ForgotPassword.js";
import ConfirmEmail from "../screens/ConfirmEmail.js";
import OnboardingScreen from "../screens/OnboardingScreen.js";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="forgotPassword" component={ForgotPassword} />
      <Stack.Screen name="confirmEmail" component={ConfirmEmail} />
    </Stack.Navigator>
  );
};

export default AuthStack;
