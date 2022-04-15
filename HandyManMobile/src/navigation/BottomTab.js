import React from "react";
import { MaterialIcons } from "@native-base/icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeScreen from "../screens/Home.js";
import ProfileStack from "./ProfileStack.js";
import ServicesScreen from "../screens/Services.js";

import { useTheme } from "react-native-paper";

const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      shifting={true}
      barStyle={{ backgroundColor: colors.primary }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="home" size={26} color={"white"} />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="business-center" size={26} color={"white"} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="person" size={26} color={"white"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
