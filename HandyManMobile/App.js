import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Center, Text } from "native-base";
import { ActivityIndicator, Colors } from "react-native-paper";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navigation/AuthStack";
import AppStack from "./src/navigation/AppStack";

// Redux
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "./src/reducerStore/ActionCreators/index";

import axios from "axios";

export default function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { updateCurrentUser, loginServices } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // try to see if user is already logged in
  useEffect(() => {
    setTimeout(async () => {
      let userInfo = null;
      let serviceInfo = null;
      try {
        userInfo = await AsyncStorage.getItem("userInfo");
        serviceInfo = await AsyncStorage.getItem("serviceInfo");
      } catch (e) {
        console.log(e);
      }

      if (userInfo == null) {
        userInfo = {
          userId: "",
          firstName: "",
          lastName: "",
          profileDescription: "",
          profilePicture: "",
          userName: "",
          jwtToken: "",
        };
      } else {
        userInfo = JSON.parse(userInfo);
        // checks if the user's token is expired or not
        await axios
          .post("https://myhandyman1.herokuapp.com/api/refresh-token", {
            jwtToken: userInfo.jwtToken,
          })
          .then((response) => {
            console.log("checking jwtToken");
            if (response.data.refreshedToken === "") {
              console.log("jwtToken invalid");
              userInfo = { ...userInfo, jwtToken: "" };
            }
          })
          .catch((response) => {
            console.log(response);
          });
      }

      serviceInfo = JSON.parse(serviceInfo);

      console.log(userInfo.jwtToken);

      updateCurrentUser(userInfo);
      loginServices(serviceInfo);
    }, 1000);
  }, []);

  if (user.isLoading) {
    return (
      <NativeBaseProvider>
        <Center flex={1}>
          <ActivityIndicator size="large" />
        </Center>
      </NativeBaseProvider>
    );
  }

  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        {user.jwtToken != "" ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
