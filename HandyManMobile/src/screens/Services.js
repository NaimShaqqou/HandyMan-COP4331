import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  Title,
  useTheme,
  Text,
  IconButton,
} from "react-native-paper";
import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, Icon } from "react-native-elements";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../reducerStore/ActionCreators/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmptyBoxArt from "../components/EmptyBoxArt";
import { Box, Center, ScrollView } from "native-base";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const { width, height } = Dimensions.get("screen");

const storeInfo = async (userInfo) => {
  try {
    await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
  } catch (err) {
    console.log(err);
  }
};

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
      { text: "Delete", style: "destructive", onPress: () => deleteAPI(item) },
    ]);

  return (
    // <View style={{ flex: 1, backgroundColor: "#003b801a" }}>
    <>
      {services.length !== 0 ? (
        <ScrollView
          bgColor={"#003b801a"}
        // contentContainerStyle={styles.viewContainer}
        >
          {services.map((item) => (
            <Card
              key={item._id}
              // style={styles.menuContainer}
              style={{ marginTop: 16, width: "95%", alignSelf: "center" }}
            >
              <Card.Title
                titleStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
                title={item.Title}
                subtitle={item.Description}
                titleNumberOfLines={4}
                subtitleNumberOfLines={4}
                right={() => (
                  <Box flexDir={"row"}>
                    {" "}
                    <IconButton
                      icon="pencil"
                      onPress={() => onEditServiceTransition(item)}
                    />
                    <IconButton
                      icon="delete"
                      onPress={() => deleteConfirmation(item)}
                    />
                  </Box>
                )}
              />
              <Card.Cover
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
                  <Text>
                    {" "}
                    Days Available:
                    {item.DaysAvailable.map((day) => (
                      <Text key={day}> {day}</Text>
                    ))}
                  </Text>
                </View>
                <View style={styles.cardContentView}>
                  <Icon name="place" style={{ marginRight: 0 }} />
                  <Text> Address: {item.Address}</Text>
                </View>
              </Card.Content>
              <Card.Actions style={{ justifyContent: "flex-end" }}>
                <Button
                  icon="briefcase-clock"
                  onPress={() =>
                    navigation.navigate("RequestedServices", {
                      service: item,
                    })
                  }
                  mode="contained"
                >
                  Service Requests
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </ScrollView>
      ) : (
        <Center
          // m={"10px"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
          bgColor={"#003b801a"}
        >
          <EmptyBoxArt
            text={"Create your first service by clicking the plus icon above!"}
          />
        </Center>
      )}
    </>
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
    // margin: 10,
    // width: width,
    // maxWidth: "95%",
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
