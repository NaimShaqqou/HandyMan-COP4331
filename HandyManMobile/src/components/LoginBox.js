import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

// react redux imports
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../reducerStore/ActionCreators/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Box,
  Center,
  FormControl,
  Link,
  WarningOutlineIcon,
} from "native-base";
import {
  Button,
  Headline,
  Subheading,
  TextInput,
} from "react-native-paper";

// to store user info in global variable
//const context = useContext(AppContext)

const storeInfo = async (userInfo, serviceInfo) => {
  try {
    await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    await AsyncStorage.setItem("serviceInfo", JSON.stringify(serviceInfo));
  } catch (err) {
    console.log(err);
  }
};

const LoginBox = () => {
  const dispatch = useDispatch();
  const { updateCurrentUser, loginServices } = bindActionCreators(
    ActionCreators,
    dispatch
  );

  // call the login api
  const doLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    var obj = { login: username, password: pass };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(
        "https://myhandyman1.herokuapp.com/api/login",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );
      var res = JSON.parse(await response.text());

      if (res.error != "") {
        setValid(false);
        setMsg(res.error);
      } else {
        setValid(true);
        console.log("login success!");

        const user = {
          userId: res.userId,
          firstName: res.firstName,
          lastName: res.lastName,
          profilePicture: res.profilePicture,
          profileDescription: res.profileDescription,
          jwtToken: res.jwtToken,
        };

        loginServices(res.services);
        updateCurrentUser(user); // update redux state
        storeInfo(user, res.services); // store to localstorage
      }

      setLoading(false);
    } catch (e) {
      console.log(e.toString());
      setLoading(false);
      return;
    }
  };

  // to navigate between pages
  // refer to the "navigation" folder for more info
  const navigation = useNavigation();

  // sends a reset password email to the user
  const onForgotPasswordPressed = async (event) => {
    navigation.navigate("forgotPassword");
  };

  const onRegisterTransition = () => {
    navigation.navigate("Register");
  };

  // username: contains username typed by the user
  // password: contains password typed by the user
  // email: contains the email to reset the password
  const [username, setUsername] = useState("");
  const [pass, setPassword] = useState("");

  // form things
  const [show, setShow] = useState(false);
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  return (
    <Box w="90%" p="2" py="8" justifyContent="center">
      <Headline style={{ fontFamily: "ComfortaaBold" }}>
        Welcome to Handler
      </Headline>
      <Subheading>Login to continue!</Subheading>

      <Center mt={"32px"} w="100%">
          <FormControl isInvalid={valid ? false : true}>
            <TextInput
              error={!valid}
              onChangeText={(newUsername) => setUsername(newUsername)}
              label="Username"
              left={<TextInput.Icon name="account" />}
            />
          </FormControl>

          <FormControl mt={"16px"} isInvalid={!valid}>
            <TextInput
              error={!valid}
              onChangeText={(newPassword) => setPassword(newPassword)}
              label="Password"
              secureTextEntry={show ? false : true}
              left={<TextInput.Icon name="lock" />}
              right={
                <TextInput.Icon
                  name={show ? "eye" : "eye-off"}
                  forceTextInputFocus={false}
                  onPress={() => setShow(!show)}
                />
              }
            />

            <FormControl.ErrorMessage
              _text={{ fontFamily: "ComfortaaRegular" }}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {msg}
            </FormControl.ErrorMessage>
          </FormControl>

          <Link
            _text={{
              fontWeight: "500",
              fontFamily: "ComfortaaBold",
              color: "secondary.500",
            }}
            alignSelf="flex-end"
            mt="1"
            onPress={onForgotPasswordPressed}
          >
            Forgot Password?
          </Link>

          <Button
            onPress={doLogin}
            mode="contained"
            loading={loading ? true : false}
            style={{
              width: "100%",
              marginTop: 20,
            }}
          >
            Login
          </Button>

          <Button
            onPress={onRegisterTransition}
            mode="outlined"
            style={{
              width: "100%",
              marginTop: 20,
            }}
          >
            Don't have an account?
          </Button>
      </Center>
    </Box>
  );
};

export default LoginBox;
