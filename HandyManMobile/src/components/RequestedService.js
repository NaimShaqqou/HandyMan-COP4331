import {
  Text,
  Card,
  Avatar,
  Paragraph,
  IconButton,
  Button,
} from "react-native-paper";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../reducerStore/ActionCreators/index";

import axios from "axios";
import { ScrollView, Center, Divider, Box, View } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeInfo = async (userInfo) => {
  try {
    await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
  } catch (err) {
    console.log(err);
  }
};

const RequestedService = (props) => {
  const myUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { updateCurrentUser, logoutUser, logoutServices } = bindActionCreators(
    ActionCreators,
    dispatch
  );
  const [user, setUser] = useState(null);
  const [requestedService, setRequestedService] = useState(
    props.requestedService
  );

  async function acceptRequest() {
    await axios
      .post("https://myhandyman1.herokuapp.com/api/accept-request", {
        requestedServiceId: requestedService._id,
        jwtToken: myUser.jwtToken,
      })
      .then((response) => {
        if (response.data.jwtToken === "") {
          storeInfo({ ...myUser, jwtToken: "" });
          logoutUser();
          logoutServices();
        } else {
          // updateCurrentUser({...myUserInfo, jwtToken: response.data.refreshedToken});
          setRequestedService({ ...requestedService, Accepted: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function completeRequest() {
    await axios
      .post("https://myhandyman1.herokuapp.com/api/complete-request", {
        requestedServiceId: requestedService._id,
        jwtToken: myUser.jwtToken,
      })
      .then((response) => {
        if (response.data.jwtToken === "") {
          storeInfo({ ...myUser, jwtToken: "" });
          logoutUser();
          logoutServices();
        } else {
          // updateCurrentUser({...myUserInfo, jwtToken: response.data.refreshedToken});
          setRequestedService({ ...requestedService, Completion: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function denyRequest() {
    await axios
      .post("https://myhandyman1.herokuapp.com/api/deny-request", {
        requestedServiceId: requestedService._id,
        jwtToken: myUser.jwtToken,
      })
      .then((response) => {
        if (response.data.jwtToken === "") {
          storeInfo({ ...myUser, jwtToken: "" });
          logoutUser();
          logoutServices();
        } else {
          // updateCurrentUser({...myUserInfo, jwtToken: response.data.refreshedToken});
          setRequestedService(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    let mounted = true;
    if (requestedService !== null) {
      axios
        .post("https://myhandyman1.herokuapp.com/api/get-user", {
          userId: requestedService.RequesterId,
        })
        .then((response) => {
          if (mounted) {
            setUser(response.data.user);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => (mounted = false);
  }, []);

  

  const ServiceAcceptance = () =>
    !requestedService.Accepted ? (
      <Box flexDir={"row"}>
        <IconButton icon="check" onPress={() => acceptRequest()} />
        <IconButton icon="close" onPress={() => denyRequest()} />
      </Box>
    ) : (
      <ServiceCompletion />
    );

  const ServiceCompletion = () =>
    requestedService.Completion ? (
      <Button mode="outlined" style={{ marginRight: 8 }}>
        Completed
      </Button>
    ) : (
      <Button mode="contained" style={{ marginRight: 8 }} onPress={() => completeRequest()} >Complete</Button>
    );

  return (
    <View>
      {user !== null && requestedService !== null && (
        <Card style={{ marginTop: 16, width: "95%", alignSelf: "center" }}>
          <Card.Title
            title={user.FirstName + " " + user.LastName}
            titleNumberOfLines={4}
            left={() => (
              <Avatar.Image size={48} source={{ uri: user.ProfilePicture }} />
            )}
            right={() => <ServiceAcceptance />}
          />

          <Card.Content>
            <Paragraph>
              {"Their Request: " + requestedService.DescriptionFromRequester}
            </Paragraph>
            <Divider mt={"16px"} />
            <Center flexDir={"row"} mt={"8px"} justifyContent={"space-evenly"}>
              <Text>
                {new Date(requestedService.Dates[0]).toLocaleDateString(
                  "en-US"
                )}{" "}
                -{" "}
                {new Date(requestedService.Dates[1]).toLocaleDateString(
                  "en-US"
                )}
              </Text>
              <Divider orientation="vertical" mx="3" />
              <Text>${requestedService.Price}</Text>
            </Center>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

export default RequestedService;
