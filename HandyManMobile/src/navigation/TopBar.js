import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";

const TopBar = ({ navigation, back, route }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    switch (route.name) {
      case "ProfileScreen":
        setName("My Profile");
        break;
      case "EditProfile":
        setName("Edit my Profile");
        break;
      case "ServicesScreen":
        setName("My Services");
        break;
      case "EditService":
        setName("Edit Service");
        break;
      case "AddService":
        setName("Add Service")
        break;
      case "RequestedServices":
        setName("Service Requests")
        break;
      default:
        setName("default");
        break;
    }
  }, [route.name]);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        title={name}
      />
      {name == "My Services" && <Appbar.Action icon="plus-circle-outline" onPress={() => {navigation.navigate("AddService")}} />}
    </Appbar.Header>
  );
};

export default TopBar;
