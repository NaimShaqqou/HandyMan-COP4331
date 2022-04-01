import { Center, Image, Heading, Text, Box, Flex, ScrollView } from 'native-base'
import React from 'react'

import { Dimensions, ImageBackground } from 'react-native';

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios'
const baseUrl = 'https://myhandyman1.herokuapp.com'

const { width, height } = Dimensions.get("screen");

const ProfileComponent = () => {
    const user = useSelector((state) => state.user)
    const services = useSelector((state) => state.services)


    return (
        <ImageBackground
                source={require('../../assets/profile-screen-bg.png')}
                style={{
                    width: width,
                    height: height,
                    padding: 0,
                    zIndex: 1,
                }}
                imageStyle={{width: width, height: height / 2}}
            >
                <ScrollView showsVerticalScrollIndicator={false} mt='25%' width={width}>
                    <Flex
                        p='16px'
                        mx='16px'
                        mt='65px'
                        borderTopRadius={6}
                        backgroundColor='white'
                    >
                            <Center position='relative' mt='-80px'>
                                <Image 
                                    source={{uri: user.profilePicture}}
                                    h="150px" w="150px" borderRadius="40"
                                />
                            </Center>

                            <Box display='flex'>
                                <Center mt={'35px'}>
                                    <Heading>
                                        {user.firstName + " " + user.lastName}
                                    </Heading>
                                </Center>

                                <Center mt='30px' mb='16px'>
                                    <Box w='90%' borderWidth={1} borderColor='#E9ECEF' />
                                </Center>
                                <Center>
                                    <Text>
                                        {user.profileDescription}{'\n'}
                                        {JSON.stringify(services)}
                                    </Text>
                                </Center>
                                    
                            </Box>

                    </Flex>
                </ScrollView>
        </ImageBackground>
    )
}

export default ProfileComponent