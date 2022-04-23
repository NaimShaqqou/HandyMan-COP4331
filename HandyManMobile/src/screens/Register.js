import { Center, Box, View } from "native-base";
import React from "react";

import RegisterBox from "../components/RegisterBox.js";
import Logo from "../components/Logo.js";
import { useTheme } from "react-native-paper";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Register = () => {
  const { colors } = useTheme();

  return (
    <KeyboardAwareScrollView>
      <Box w="100%" flex={1} safeAreaTop backgroundColor={colors.primary}>
        <Center safeAreaY>
          <Logo size="xl" />
        </Center>
        <View
          safeAreaTop
          alignItems="center"
          backgroundColor={"gray.100"}
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          borderTopRadius="35"
        >
          <RegisterBox />
        </View>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default Register;
