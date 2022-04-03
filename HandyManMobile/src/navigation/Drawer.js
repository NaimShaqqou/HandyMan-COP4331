import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { Button, Icon } from 'native-base'
import { MaterialIcons } from "@native-base/icons"
import CustomDrawer from '../components/CustomDrawer.js'

import HomeScreen from '../screens/Home.js'
import ProfileScreen from '../screens/Profile.js'
import Services from '../screens/Services.js'

import { useNavigation } from '@react-navigation/native'

const drawer = createDrawerNavigator();

const Drawer = () => {
    const navigation = useNavigation();

    return (
        <drawer.Navigator 
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
            <drawer.Screen name="Home" component={HomeScreen} options={{
                drawerIcon: ({color}) => (
                    <MaterialIcons name="home" size={22} color={color} />
                )
            }} />

            <drawer.Screen name="Services" component={Services} options={{
                drawerIcon: ({color}) => (
                    <MaterialIcons name="home" size={22} color={color} />
                )
            }} />

            <drawer.Screen name="Profile" component={ProfileScreen} options={{
                drawerIcon: ({color}) => (
                    <MaterialIcons name="person" size={22} color={color} />
                ),
                headerRight: () => (
                    <Button
                        leftIcon={<Icon as={MaterialIcons} name="edit" size="sm" />}
                        onPress={() => navigation.navigate('EditProfile')}
                        variant='unstyled'
                    />
                ),
            }} />
        </drawer.Navigator>
    );
}

export default Drawer