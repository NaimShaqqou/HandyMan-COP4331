import {
  Center,
  Image,
  Box,
  Flex,
  ScrollView,
  FormControl,
  WarningOutlineIcon,
  View,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-loading-spinner-overlay";
import {
  Button,
  useTheme,
  ActivityIndicator,
  TextInput,
  Headline,
  Divider,
} from "react-native-paper";
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
  const { updateCurrentUser, logoutUser, logoutServices } = bindActionCreators(ActionCreators, dispatch);

  const navigation = useNavigation();

  const [validName, setValidName] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

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

    console.log(data);

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
    setLoading(true);

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
        if (response.data.jwtToken === "") {
          storeInfo({...user, jwtToken: ""})
          logoutUser()
          logoutServices()
        } else {
          const newUser = {
            userId: user.userId,
            firstName: firstName,
            lastName: lastName,
            profileDescription: description,
            profilePicture: image,
            jwtToken: response.data.refreshedToken,
          };
  
          updateCurrentUser(newUser);
          
          // async storage
          storeInfo(newUser); // store to localstorage
        }
      })
      .catch(function (response) {
        console.log(response);
      });

    setLoading(false);
    navigation.goBack();
  };

  const { colors } = useTheme();

  return (
    <KeyboardAwareScrollView>
      <Flex
        p="16px"
        mx="16px"
        mt="30%"
        borderRadius={6}
        backgroundColor="white"
        shadow="6"
      >
        <Center position="relative" mt="-80px">
          <Image
            source={{ uri: image }}
            h="150px"
            w="150px"
            borderRadius="40"
            alt="profile picture"
          />
          <Button onPress={pickImage}>edit profile picture</Button>
        </Center>

        <Box display="flex" flex="1">
          <Center mt={"35px"}>
            <Headline style={{ fontFamily: "ComfortaaBold" }}>
              Edit your Name
            </Headline>
            <FormControl mt={"15px"} isInvalid={!validName}>
              <Center
                display="flex"
                flexDir={"row"}
                justifyContent={"space-between"}
              >
                <TextInput
                  defaultValue={user.firstName}
                  left={<TextInput.Icon name="account" />}
                  onChangeText={(newFirstName) => setFirstName(newFirstName)}
                  style={{ width: "48%" }}
                  label={"First Name"}
                  error={!validName}
                />
                <TextInput
                  defaultValue={user.lastName}
                  onChangeText={(newLastName) => setLastName(newLastName)}
                  style={{ width: "48%" }}
                  left={<TextInput.Icon name="account" />}
                  label={"Last Name"}
                  error={!validName}
                />
              </Center>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
                _text={{ fontFamily: "ComfortaaRegular" }}
              >
                First name and last name cannot be empty.
              </FormControl.ErrorMessage>
            </FormControl>
          </Center>
          <Divider style={{ marginTop: 32, marginBottom: 16 }} />
          <Box alignItems={"center"}>
            <Headline style={{ fontFamily: "ComfortaaBold" }}>
              Edit your Description
            </Headline>

            <TextInput
              label="Description"
              multiline={true}
              defaultValue={user.profileDescription}
              onChangeText={(newDescription) => setDescription(newDescription)}
              style={{ marginTop: 16, width: "100%" }}
            />
          </Box>

          <Center
            display={"flex"}
            flexDir={"row"}
            justifyContent={"space-between"}
            mt={"32px"}
          >
            <Button
              compact
              flex={1}
              mode={"outlined"}
              onPress={() => navigation.goBack()}
              color={colors.error}
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
    </KeyboardAwareScrollView>
  );
};

export default EditProfileComponent;

// {loading ?
//   <Spinner
//     visible={true}
//     customIndicator={<ActivityIndicator />}
//   />
//   :
//   <Spinner />
// }
