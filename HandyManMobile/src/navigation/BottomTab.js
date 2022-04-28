import React from "react";
import { MaterialIcons } from "@native-base/icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome5 } from '@expo/vector-icons'; 

import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack.js";
import OwnedServiceStack from "./OwnedServiceStack";
import BookingsScreen from "../screens/Bookings.js";

import { useTheme } from "react-native-paper";

const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      shifting={true}
      barStyle={{ backgroundColor: colors.primary }}
    >
      {/* <Tab.Screen
        name="Testing"
        component={ServiceInfo}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="home" size={26} color={"white"} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Search"
        component={HomeStack}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="search" size={26} color={"white"} />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={OwnedServiceStack}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="business-center" size={26} color={"white"} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="airbnb" size={26} color={"white"} />
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
