import { Center, Image, Heading, Text, Box, Flex, ScrollView, FormControl, Input, Icon, HStack, TextArea } from 'native-base'
import { Button } from 'react-native-paper'
import { MaterialIcons } from "@native-base/icons"
import React from 'react'

import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from 'expo-image-picker';

import { Dimensions, ImageBackground } from 'react-native';
const { width, height } = Dimensions.get("screen");

const EditProfileComponent = () => {

    const user = useSelector((state) => state.user)
    const services = useSelector((state) => state.services)

    const profilePicture = user.profilePicture

    const [validName, setValidName] = React.useState(true);
    
    // form values
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [image, setImage] = React.useState(profilePicture);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result)

        if (!result.cancelled) {
            setImage(result.uri)
        }
    }

    const handleSave = async () => {
        console.log("savechanges")
    }


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
                                    source={{uri: image}}
                                    h="150px" w="150px" borderRadius="40"
                                />
                                <Button onPress={pickImage}>edit profile picture</Button>
                            </Center>

                            <Box display='flex'>
                                <Center mt={'35px'}>
                                    <Heading>
                                        Edit your Name
                                    </Heading>
                                    <FormControl mt={'15px'} isInvalid={validName? false : true} flexDir='row' justifyContent={'space-between'}>
                                        <Input 
                                            variant="underlined" 
                                            defaultValue={user.firstName}
                                            size="2xl" 
                                            w="45%" 
                                            InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
                                            onChangeText={ newFirstName => setFirstName(newFirstName) }
                                        />
                                        <Input 
                                            variant="underlined" 
                                            defaultValue={user.lastName}
                                            size="2xl" 
                                            w="45%" 
                                            InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
                                            onChangeText={ newLastName => setLastName(newLastName) }
                                        />
                                    </FormControl>
                                </Center>

                                <Center mt='30px' mb='16px'>
                                    <Box w='90%' borderWidth={1} borderColor='#E9ECEF' />
                                </Center>
                                <Center>
                                    <Heading>
                                        Edit your Description
                                    </Heading>
                                    <TextArea 
                                        mt={'15px'} 
                                        w='100%' 
                                        defaultValue={user.profileDescription} 
                                        onChangeText={ newDescription => setDescription(newDescription)}
                                    />
                                </Center>

                                <Button 
                                    mt={'35px'}
                                    onPress={handleSave}
                                >
                                    Save Changes
                                </Button>  
                            </Box>

                    </Flex>
                </ScrollView>
        </ImageBackground>
    )
}

export default EditProfileComponent