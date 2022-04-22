import React, { useState } from "react";
import {
  Box,
  Heading,
  Center,
  Icon,
  FormControl,
  Input,
  useToast,
} from "native-base";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@native-base/icons";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordBox = () => {
  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

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
        toast.show({
          title: "Email Sent",
          status: "success",
          description:
            "We have sent an email to the address you provided with instructions on how to reset your password.",
          duration: null,
          width: "90%",
        });
      } else {
        toast.show({
          title: "Error",
          status: "error",
          description: res.error,
          duration: null,
          w: "90%",
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
  const toast = useToast();

  return (
    <Box safeArea w="90%" justifyContent="center">
      <Heading size="xl" fontWeight="600">
        Reset your Password
      </Heading>
      <Heading mt="1" fontWeight="medium" size="sm">
        Please enter your email below to continue.
      </Heading>

      <Center mt={10} w="100%">
        <FormControl isInvalid={valid ? false : true}>
          <Input
            variant="underlined"
            placeholder="Email"
            size="2xl"
            w="100%"
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="email" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            onChangeText={(newEmail) => setEmail(newEmail)}
          />
        </FormControl>

        <Button
          onPress={onSubmit}
          mode="contained"
          loading={loading ? true : false}
          style={{
            width: "100%",
            marginTop: 30,
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
            marginTop: 12,
          }}
        >
          Back to Login
        </Button>
      </Center>
    </Box>
  );
};

export default ForgotPasswordBox;
