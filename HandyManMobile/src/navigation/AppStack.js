import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { Button, Icon } from 'native-base'
import { MaterialIcons } from "@native-base/icons"
import CustomDrawer from '../components/CustomDrawer.js'

import HomeScreen from '../screens/Home.js'
import ProfileScreen from '../screens/Profile.js'


const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator 
        drawerContent={props => <CustomDrawer { ...props } />}
        screenOptions={{
            drawerActiveBackgroundColor: '#06b6d4',
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: '#333',
            drawerLabelStyle: {
                marginLeft: -25, 
                fontSize: 15
            }
        }}
    >
        <Drawer.Screen name="Home" component={HomeScreen} options={{
            drawerIcon: ({color}) => (
                <MaterialIcons name="home" size={22} color={color} />
            )
        }} />

        <Drawer.Screen name="Profile" component={ProfileScreen} options={{
            drawerIcon: ({color}) => (
                <MaterialIcons name="person" size={22} color={color} />
            ),
            headerRight: () => (
                <Button
                    leftIcon={<Icon as={MaterialIcons} name="edit" size="sm" />}
                    onPress={() => alert('edit profile' )}
                    variant='unstyled'
                />
            ),
        }} />
    </Drawer.Navigator>
  );
}

export default AppStack