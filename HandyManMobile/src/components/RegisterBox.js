import { React, useState } from "react";
import {
  Box,
  Center,
  Heading,
  FormControl,
  WarningOutlineIcon,
} from "native-base";
import { Button, TextInput, Headline, Subheading } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

const RegisterBox = () => {
  const navigation = useNavigation();

  const doRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setValid(true);
    setPassValid(true);
    setUserValid(true);
    setEmailValid(true);

    if (password != passwordRepeat) {
      setPassValid(false);
      setMsg("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    // call register api
    var obj = {
      email: email.toLowerCase(),
      username: username,
      password: password,
      firstName: fName,
      lastName: lName,
    };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(
        "https://myhandyman1.herokuapp.com/api/register",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );
      var res = JSON.parse(await response.text());

      if (res.error == "") {
        navigation.navigate("confirmEmail");
      } else if (
        res.error ==
        "Username already exists. Please enter a different username."
      ) {
        setUserValid(false);
        setUserMsg(res.error);
      } else if (
        res.error == "Email already exists. Please enter a different email."
      ) {
        setEmailValid(false);
        setEmailMsg(res.error);
      } else {
        // everything invalid
        setEmailValid(false);
        setUserValid(false);
        setPassValid(false);
        setValid(false);
        setMsg(res.error);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e.toString());
      setLoading(false);
      return;
    }

    // if successful navigate to confirm email page
    // if error, then determine type of error and display it
  };

  const onLoginTransition = () => {
    navigation.navigate("Login");
  };

  // email: email the user inputs
  // username: username the user inputs
  // password: password the user inputs
  // passwordRepeat: repeated password the user inputs
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");

  // logic for forms
  const [showPass, setShowPass] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [userValid, setUserValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [valid, setValid] = useState(true);
  const [passValid, setPassValid] = useState(true);
  const [msg, setMsg] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");

  return (
    <Box w="90%" p="2" py="8" justifyContent="center">
      <Headline style={{ fontFamily: "ComfortaaBold" }}>
        Welcome to Handler
      </Headline>
      <Subheading>
        Register to continue!
      </Subheading>

      <Center mt={"32px"} w="100%">
        <FormControl isInvalid={!valid}>
          <TextInput
            error={!valid}
            onChangeText={(newFName) => setFName(newFName)}
            label="First Name"
            placeholder="John"
            left={<TextInput.Icon name="account" />}
          />
          <TextInput
            error={!valid}
            onChangeText={(newLName) => setLName(newLName)}
            label="Last Name"
            placeholder="Doe"
            left={<TextInput.Icon name="account" />}
            style={{ marginTop: 16 }}
          />
        </FormControl>

        <FormControl mt={"16px"} isInvalid={!emailValid}>
          <TextInput
            error={!emailValid}
            label="Email"
            placeholder="johndoe@mail.com"
            left={<TextInput.Icon name="email" />}
            onChangeText={(newEmail) => {
              setEmail(newEmail);
            }}
          />
          <FormControl.ErrorMessage
            _text={{ fontFamily: "ComfortaaRegular" }}
            leftIcon={<WarningOutlineIcon size="xs" />}
          >
            {emailMsg}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl mt={"16px"} isInvalid={!userValid}>
          <TextInput
            error={!userValid}
            onChangeText={(newUsername) => setUsername(newUsername)}
            label="Username"
            placeholder={"johnnyboi69"}
            left={<TextInput.Icon name="account" />}
          />
          <FormControl.ErrorMessage
            _text={{ fontFamily: "ComfortaaRegular" }}
            leftIcon={<WarningOutlineIcon size="xs" />}
          >
            {userMsg}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl mt={"16px"} isInvalid={!passValid}>
          <TextInput
            error={!passValid}
            onChangeText={(newPassword) => setPassword(newPassword)}
            label="Password"
            secureTextEntry={showPass ? false : true}
            left={<TextInput.Icon name="lock" />}
            right={
              <TextInput.Icon
                name={showPass ? "eye" : "eye-off"}
                forceTextInputFocus={false}
                onPress={() => setShowPass(!showPass)}
              />
            }
          />
        </FormControl>

        <FormControl mt={"16px"} isInvalid={!passValid}>
          <TextInput
            error={!passValid}
            onChangeText={(newPasswordRepeat) =>
              setPasswordRepeat(newPasswordRepeat)
            }
            label="Confirm Password"
            secureTextEntry={!showRepeat}
            left={<TextInput.Icon name="lock" />}
            right={
              <TextInput.Icon
                name={showRepeat ? "eye" : "eye-off"}
                forceTextInputFocus={false}
                onPress={() => setShowRepeat(!showRepeat)}
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

        <Button
          onPress={doRegister}
          mode="contained"
          disabled={loading}
          loading={loading}
          style={{
            width: "100%",
            marginTop: 20,
          }}
        >
          Register
        </Button>

        <Button
          onPress={onLoginTransition}
          mode="outlined"
          style={{
            width: "100%",
            marginTop: 20,
          }}
        >
          Already have an account?
        </Button>
      </Center>
    </Box>
  );
};

export default RegisterBox;
