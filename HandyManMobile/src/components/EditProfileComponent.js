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
  WarningOutlineIcon,
} from "native-base";
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, useTheme, ActivityIndicator } from "react-native-paper";
import { MaterialIcons } from "@native-base/icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../reducerStore/ActionCreators/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

import { Dimensions, ImageBackground } from "react-native";
import axios from "axios";
const { width, height } = Dimensions.get("screen");

const storeInfo = async (userInfo) => {
  try {
    await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
  } catch (err) {
    console.log(err);
  }
};

const EditProfileComponent = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { updateCurrentUser } = bindActionCreators(ActionCreators, dispatch);

  const navigation = useNavigation();

  const [validName, setValidName] = React.useState(true);
  const [loading, setLoading] = React.useState(false)

  // form values
  const [firstName, setFirstName] = React.useState(user.firstName);
  const [lastName, setLastName] = React.useState(user.lastName);
  const [description, setDescription] = React.useState(user.profileDescription);
  const [image, setImage] = React.useState(user.profilePicture);

  // dynamically check fields as the user is typing
  React.useEffect(() => {
    if (firstName == "" || lastName == "") {
      setValidName(false);
    } else {
      setValidName(true);
    }
  }, [firstName, lastName]);

  // get image from phone and upload it
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // setLoading(true)
      // console.log(loading)

      // changes the uri to a file object and uploads it to cloudinary
      setImage(
        await handleUpload({
          uri: result.uri,
          type: `image/${result.uri.split(".")[1]}`,
          name: `user-profile.${result.uri.split(".")[1]}`,
        })
      );

      // setLoading(false)
    }
  };

  // upload new image to cloudinary
  async function handleUpload(imageFile) {
    
    const data = new FormData();
    data.append("image", imageFile);

    console.log(data)

    let imageUrl;

    try {
      const res = await fetch(
        "https://myhandyman1.herokuapp.com/api/store-image",
        {
          method: "post",
          body: data,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      var response = JSON.parse(await res.text());

      imageUrl = response.imageUrl;
      console.log(imageUrl);
    } catch (error) {
      console.log(error);
    }

    return imageUrl;
  }

  // call edit profile api
  const handleSave = async () => {
    setLoading(true)

    await axios
      .post("https://myhandyman1.herokuapp.com/api/edit-profile", {
        userId: user.userId,
        newFirstName: firstName,
        newLastName: lastName,
        newProfileDescription: description,
        newProfilePicture: image,
        jwtToken: user.jwtToken,
      })
      .then(function (response) {
        const newUser = {
          userId: user.userId,
          firstName: firstName,
          lastName: lastName,
          profileDescription: description,
          profilePicture: image,
          jwtToken: response.refreshedToken,
        };
        
        updateCurrentUser(newUser);
        // async storage
        storeInfo(newUser); // store to localstorage
      })
      .catch(function (response) {
        console.log(response);
      });

    setLoading(false)
    navigation.goBack();
  };

  const { colors } = useTheme();

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
      {/* {loading ? 
        <Spinner 
          visible={true}
          customIndicator={<ActivityIndicator />}
        />
        :
        <Spinner />
      } */}
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
              <FormControl mt={"15px"} isInvalid={validName ? false : true}>
                <Center
                  display="flex"
                  flexDir={"row"}
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
                </Center>
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  First name and last name cannot be empty.
                </FormControl.ErrorMessage>
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

            <Center
              display={"flex"}
              flexDir={"row"}
              justifyContent={"space-between"}
              mt={'16px'}
            >
              <Button
                compact
                flex={1}
                mode={"outlined"}
                onPress={() => navigation.goBack()}
                color={ colors.error }
                disabled={loading}
              >
                Cancel
              </Button>

              <Button
                compact
                flex={2}
                mode={"contained"}
                onPress={handleSave}
                style={{ marginLeft: 8 }}
                loading={loading}
              >
                Save Changes
              </Button>
            </Center>
          </Box>
        </Flex>
      </ScrollView>
    </ImageBackground>
  );
};

export default EditProfileComponent;
