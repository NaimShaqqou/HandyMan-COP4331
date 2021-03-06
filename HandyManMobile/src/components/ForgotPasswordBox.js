import React, { useState } from "react";
import {
  Box,
  Center,
  FormControl,
  useToast,
  WarningOutlineIcon,
} from "native-base";
import { Button, TextInput, Headline, Subheading } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import ToastAlert from "./ToastAlert";

const ForgotPasswordBox = () => {
  const toast = useToast();

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    setValid(true);
    setLoading(true);

    if (email == "") {
      setValid(false);
      setLoading(false);
      return;
    }

    var obj = { email: email.toLowerCase() };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(
        "https://myhandyman1.herokuapp.com/api/forgot-password-email",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );

      var res = JSON.parse(await response.text());

      setLoading(false);
      if (res.error == "") {
        const item= {
          title: "Email Sent",
          status: "success",
          description:
            "We have sent an email to the address you provided with instructions on how to reset your password.",
          isClosable: true,
        }
        toast.show({
          render: ({id}) => {
            return <ToastAlert toast={toast} id={id} {...item} />
          },
        });
      } else {
        const item = {
          title: "Error",
          status: "error",
          description: res.error,
          isClosable: true,
        };
        toast.show({
          render: ({ id }) => {
            return <ToastAlert toast={toast} id={id} {...item} />;
          },
        });
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  return (
    <Box safeArea w="90%" justifyContent="center">
      <Headline style={{ fontFamily: "ComfortaaBold" }}>
        Reset your Password
      </Headline>
      <Subheading>Please enter your email below to continue.</Subheading>

      <Center mt={10} w="100%">
        <FormControl isInvalid={!valid}>
          <TextInput
            error={!valid}
            label="Email"
            left={<TextInput.Icon name="email" />}
            onChangeText={(newEmail) => {
              setEmail(newEmail);
              setValid(true);
            }}
          />

          <FormControl.ErrorMessage
            leftIcon={<WarningOutlineIcon size="xs" />}
            _text={{ fontFamily: "ComfortaaRegular" }}
          >
            You must enter an email to continue.
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          onPress={onSubmit}
          mode="contained"
          loading={loading}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: 24,
          }}
        >
          Submit
        </Button>

        <Button
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            width: "100%",
            marginTop: 16,
          }}
        >
          Back to Login
        </Button>
      </Center>
    </Box>
  );
};

export default ForgotPasswordBox;
