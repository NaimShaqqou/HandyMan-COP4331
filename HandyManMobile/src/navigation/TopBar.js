import { View, Text } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";

const TopBar = ({ navigation, back, route }) => {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        title={route.name == "ProfileScreen" ? "My Profile" : "Edit my Profile"}
      />
    </Appbar.Header>
  );
};

export default TopBar;
