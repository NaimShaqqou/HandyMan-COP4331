import React from "react";

// native-base
import { Box, Center, KeyboardAvoidingView } from "native-base";

// components
import LoginBox from "../components/LoginBox.js";
import Logo from "../components/Logo.js";
import { useTheme } from "react-native-paper";

const Login = () => {
  const { colors } = useTheme();
  return (
    <KeyboardAvoidingView
      behavior="padding"
      flex={1}
      w="100%"
      alignItems={"center"}
    >
      <Box w="100%" flex={1} safeAreaTop backgroundColor={colors.primary}>
        <Center flexGrow={1}>
          <Logo size="2xl" />
        </Center>
        <Box
          flex={10}
          backgroundColor={"gray.100"}
          justifyContent="flex-start"
          alignItems={"center"}
          borderTopRadius="35"
        >
          <LoginBox />
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default Login;
