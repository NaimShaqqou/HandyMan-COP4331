import {
  Center,
  Image,
  Heading,
  Box,
  Flex,
  ScrollView,
} from "native-base";
import { Button, Headline, Text, useTheme } from "react-native-paper";
import React from "react";

import { Dimensions, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../reducerStore/ActionCreators/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");

const deleteInfo = async () => {
  try {
    await AsyncStorage.removeItem("userInfo");
  } catch (err) {
    console.log(err);
  }
};

const ProfileComponent = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { logoutUser, logoutServices } = bindActionCreators(
    ActionCreators,
    dispatch
  );

  const navigation = useNavigation();

  const doLogout = () => {
    logoutServices();
    deleteInfo();
    logoutUser();
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
              source={{ uri: user.profilePicture }}
              h="150px"
              w="150px"
              borderRadius="40"
            />
          </Center>

          <Box display="flex">
            <Center mt={"35px"}>
              <Headline style={{fontFamily: "ComfortaaBold"}}>{user.firstName + " " + user.lastName}</Headline>
            </Center>

            <Center mt="30px" mb="16px">
              <Box w="90%" borderWidth={1} borderColor="#E9ECEF" />
            </Center>
            <Center>
              <Text>
                {user.profileDescription}
                {"\n"}
              </Text>
            </Center>
            <Center>
              <Button
                mode="contained"
                onPress={() => navigation.navigate("EditProfile")}
                style={{ marginTop: 16 }}
              >
                Edit Profile
              </Button>
              <Button
                mode="outlined"
                color={colors.error}
                onPress={doLogout}
                style={{ marginTop: 16 }}
              >
                Logout
              </Button>
            </Center>
          </Box>
        </Flex>
      </ScrollView>
    </ImageBackground>
  );
};

export default ProfileComponent;
