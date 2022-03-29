import AppContext from './AppContext'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Box, Text, Image, Button, Icon } from 'native-base'
import { ImageBackground } from 'react-native'
import { MaterialIcons } from "@native-base/icons"

// redux
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../reducerStore/ActionCreators/index'
import AsyncStorage from '@react-native-async-storage/async-storage'

const deleteInfo = async() => {
    try {
        await AsyncStorage.removeItem('userInfo')
    } catch (err) {
        console.log(err)
    }
}

const CustomDrawer = (props) => {
    // redux state and methods
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { logoutUser } = bindActionCreators(ActionCreators, dispatch);

    const doLogout = () => {
        deleteInfo()
        logoutUser()
    }

    return (
        <Box flex="1">
            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: "#016eed"}}>
                <ImageBackground 
                    source={require('../../assets/menu-bg.jpg')}
                    style={{padding: 20}}
                >
                    <Image 
                        source={require('../../assets/user-profile.jpg')} 
                        h="80px" w="80px" borderRadius="40" mb="10px"
                    />
                    <Text color={'white'} fontSize={18}>{user.firstName + " " + user.lastName}</Text>
                </ImageBackground>

                <Box flex={1} backgroundColor='white' paddingTop='10px'>
                    <DrawerItemList {...props} />
                </Box>
            </DrawerContentScrollView>

            <Box p='20px' alignItems='flex-start'>
                <Button 
                    variant='ghost'
                    colorScheme='muted' 
                    _text={{
                        fontSize: 15,
                    }}
                    leftIcon={<Icon as={MaterialIcons} name="logout" />}
                    py='15px'
                    onPress={doLogout}
                >
                    Sign Out
                </Button>
            </Box>
        </Box>
    )
}

export default CustomDrawer