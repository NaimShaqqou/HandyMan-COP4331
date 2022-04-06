import {
  Center,
  Image,
  Heading,
  Text,
  Box,
  Flex,
  ScrollView,
  FormControl,
  Input,
  Icon,
  HStack,
  TextArea,
} from "native-base";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@native-base/icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../reducerStore/ActionCreators/index";
import * as ImagePicker from "expo-image-picker";

import { Dimensions, ImageBackground } from "react-native";
import axios from "axios";
const { width, height } = Dimensions.get("screen");

const EditProfileComponent = () => {
    
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { updateCurrentUser } = bindActionCreators(
    ActionCreators,
    dispatch
  );

  const navigation = useNavigation()

  const [validName, setValidName] = React.useState(true);

  // form values
  const [firstName, setFirstName] = React.useState(user.firstName);
  const [lastName, setLastName] = React.useState(user.lastName);
  const [description, setDescription] = React.useState(user.profileDescription);
  const [image, setImage] = React.useState(user.profilePicture);
  const [imageFile, setImageFile] = React.useState()

  // get image from phone
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {

        // convert uri to file  
        setImageFile({
            uri: result.uri,
            type: `image/${result.uri.split(".")[1]}`,
            name: `user-profile.${result.uri.split(".")[1]}`,
        })

      // set the image on the screen to new image
      setImage(result.uri);
    }
  };

  // upload new image to cloudinary
  async function handleUpload() {
    const data = new FormData();
    data.append("image", imageFile);

    let imageUrl;

    try {
        const res = await fetch("https://myhandyman1.herokuapp.com/api/store-image",
        {
            method: "post",
            body: data,
            headers: { "Content-Type": "multipart/form-data" },
        })
        var response = JSON.parse(await res.text())

        imageUrl = response
    } catch(error) {
        console.log(error)
    }

    return imageUrl
  }

  
  // call edit profile api
  const handleSave = async () => {

    let newImageUrl;
    if (user.profilePicture !== image) {
      newImageUrl = await handleUpload();
    } else {
      newImageUrl = user.profilePicture;
    }

    // await axios
    //     .post("https://myhandyman1.herokuapp.com/api/edit-profile", {
    //         userId: user.userId,
    //         newFirstName: firstName,
    //         newLastName: lastName,
    //         newProfileDescription: description,
    //         newProfilePicture: newImageUrl,
    //         jwtToken: user.jwtToken,
    //     })
    //     .then(function (response) {
    //         updateCurrentUser({
    //             userId: user.userId,
    //             firstName: firstName,
    //             lastName: lastName,
    //             profileDescription: description,
    //             profilePicture: newImageUrl,
    //             jwtToken: response.refreshedToken,
    //         })
    //     })
    //     .catch(function (response) {
    //         console.log(response)
    //     })

    var obj = {
        userId: user.userId,
        newFirstName: firstName,
        newLastName: lastName,
        newProfileDescription: description,
        newProfilePicture: newImageUrl,
        jwtToken: user.jwtToken,
    }
    var js = JSON.stringify(obj)

    try {
        const response = await fetch(
            "https://myhandyman1.herokuapp.com/api/edit-profile",
            {
              method: "POST",
              body: js,
              headers: { "Content-Type": "application/json" },
            }
          );
          var res = JSON.parse(await response.text());

          updateCurrentUser({
            userId: user.userId,
            firstName: firstName,
            lastName: lastName,
            profileDescription: description,
            profilePicture: newImageUrl,
            jwtToken: res.refreshedToken,
        })
    } catch (error) {
        console.log(error)
    }

    navigation.goBack()
  };

  

  return (
    <ImageBackground
      source={require("../../assets/profile-screen-bg.png")}
      style={{
        width: width,
        height: height,
        padding: 0,
        zIndex: 1,
      }}
      imageStyle={{ width: width, height: height }}
    >
      <ScrollView showsVerticalScrollIndicator={false} mt="25%" width={width}>
        <Flex
          p="16px"
          mx="16px"
          mt="65px"
          borderTopRadius={6}
          backgroundColor="white"
        >
          <Center position="relative" mt="-80px">
            <Image
              source={{ uri: image }}
              h="150px"
              w="150px"
              borderRadius="40"
            />
            <Button onPress={pickImage}>edit profile picture</Button>
          </Center>

          <Box display="flex">
            <Center mt={"35px"}>
              <Heading>Edit your Name</Heading>
              <FormControl
                mt={"15px"}
                isInvalid={validName ? false : true}
                flexDir="row"
                justifyContent={"space-between"}
              >
                <Input
                  variant="underlined"
                  defaultValue={user.firstName}
                  size="2xl"
                  w="45%"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  onChangeText={(newFirstName) => setFirstName(newFirstName)}
                />
                <Input
                  variant="underlined"
                  defaultValue={user.lastName}
                  size="2xl"
                  w="45%"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  onChangeText={(newLastName) => setLastName(newLastName)}
                />
              </FormControl>
            </Center>

            <Center mt="30px" mb="16px">
              <Box w="90%" borderWidth={1} borderColor="#E9ECEF" />
            </Center>
            <Center>
              <Heading>Edit your Description</Heading>
              <TextArea
                mt={"15px"}
                w="100%"
                defaultValue={user.profileDescription}
                onChangeText={(newDescription) =>
                  setDescription(newDescription)
                }
              />
            </Center>

            <Button mt={"35px"} onPress={handleSave}>
              Save Changes
            </Button>
          </Box>
        </Flex>
      </ScrollView>
    </ImageBackground>
  );
};

export default EditProfileComponent;
