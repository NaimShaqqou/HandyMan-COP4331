import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  useTheme,
  Text,
} from "react-native-paper";
import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, Icon } from "react-native-elements";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../reducerStore/ActionCreators/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const { width, height } = Dimensions.get("screen");

const Services = () => {
  const { colors } = useTheme();

  const user = useSelector((state) => state.user);
  const services = useSelector((state) => state.services).services;
  const dispatch = useDispatch();
  const { updateCurrentUser, deleteService, logoutUser, logoutServices } =
    bindActionCreators(ActionCreators, dispatch);

  const navigation = useNavigation();

  const onEditServiceTransition = (item) => {
    console.log(item);
    // item is being passed as a prop to the edit service page
    navigation.navigate("EditService", { service: item });
  };

  const deleteAPI = async (item) => {
    await axios
      .post("https://myhandyman1.herokuapp.com/api/delete-service", {
        serviceId: item._id,
        jwtToken: user.jwtToken,
      })
      .then(function (response) {
        if (response.data.error !== "") {
          console.log(response.data.error);
          storeInfo({ ...user, jwtToken: "" });
          logoutUser();
          logoutServices();
        } else {
          updateCurrentUser({
            ...user,
            jwtToken: response.data.refreshedToken,
          });

          AsyncStorage.setItem("userInfo", JSON.stringify(user));

          deleteService(item);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  const deleteConfirmation = async (item) =>
    Alert.alert("Are you sure you want to delete this Service?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Delete", onPress: () => deleteAPI(item) },
    ]);

  return (
    <View style={{ flex: 1, backgroundColor: "#003b801a" }}>
      <ScrollView
        contentContainerStyle={styles.viewContainer}
      >
        <Text>{"\n"}</Text>
        {Object.values(services).map((item) => (
          <Text key={item._id}>
            <Card style={styles.menuContainer}>
              <Card.Title
                titleStyle={{ justifyContent: "center", alignItems: "center" }}
                title={item.Title}
                subtitle={item.Description}
              />
              <Card.Cover
                style={{ borderRadius: 13 }}
                source={{ uri: item.Images[0] }}
              />
              <Card.Content>
                <Title></Title>
                <View style={styles.cardContentView}>
                  <Icon name="credit-card" style={{ marginRight: 0 }} />
                  <Text> Price: ${item.Price}</Text>
                </View>
                <View style={styles.cardContentView}>
                  <Icon name="home-repair-service" style={{ marginRight: 0 }} />
                  <Text> Category: {item.Category}</Text>
                </View>
                <View style={styles.cardContentView}>
                  <Icon name="event" style={{ marginRight: 0 }} />
                  <Text> Days Available: {item.DaysAvailable}</Text>
                </View>
                <View style={styles.cardContentView}>
                  <Icon name="place" style={{ marginRight: 0 }} />
                  <Text> Address: {item.Address}</Text>
                </View>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => onEditServiceTransition(item)}>
                  Edit
                </Button>

                <Button
                  onPress={() => deleteConfirmation(item)}
                  color={colors.error}
                >
                  Delete
                </Button>
              </Card.Actions>
            </Card>
            {"\n"}
          </Text>
        ))}
        <Text>
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    display: "flex",
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    borderColor: colors.primary,
    borderWidth: 5,
    elevation: 5,
    shadowColor: "#470000",
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    justifyContent: "center",
    alignItems: "stretch",
    width: width,
    maxWidth: "100%",
  },

  viewContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    width: width,
    maxWidth: "95%",
  },

  addButton: {
    alignItems: "center",
  },

  cardContentView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    width: width,
    maxWidth: "95%",
  },
});

export default Services;
