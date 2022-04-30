import React, { useState } from "react";
import {
  Box,
  Heading,
  Center,
  FormControl,
  useToast,
  WarningOutlineIcon,
  VStack,
  HStack,
  Text,
  IconButton,
  CloseIcon,
  Alert,
} from "native-base";
import { Button, TextInput, Headline, Subheading } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordBox = () => {
  const toast = useToast();

  const ToastAlert = ({
    id,
    status,
    variant,
    title,
    description,
    isClosable,
    ...rest
  }) => (
    <Alert
      maxWidth="90%"
      alignSelf="center"
      flexDirection="row"
      status={status ?? "info"}
      variant={variant}
      {...rest}
    >
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text
              fontFamily={"ComfortaaBold"}
              fontSize="md"
              fontWeight="medium"
              flexShrink={1}
              color={
                variant === "solid"
                  ? "lightText"
                  : variant !== "outline"
                  ? "darkText"
                  : null
              }
            >
              {title}
            </Text>
          </HStack>
          {isClosable ? (
            <IconButton
              variant="unstyled"
              icon={<CloseIcon size="3" />}
              _icon={{
                color: variant === "solid" ? "lightText" : "darkText",
              }}
              onPress={() => toast.close(id)}
            />
          ) : null}
        </HStack>
        <Text
          px="6"
          color={
            variant === "solid"
              ? "lightText"
              : variant !== "outline"
              ? "darkText"
              : null
          }
          fontFamily={"ComfortaaRegular"}
        >
          {description}
        </Text>
      </VStack>
    </Alert>
  );

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
            return <ToastAlert id={id} {...item} />
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
            return <ToastAlert id={id} {...item} />;
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
