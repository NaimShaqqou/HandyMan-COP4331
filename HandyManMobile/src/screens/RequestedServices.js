import { View, Text } from "react-native";
import React, { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../reducerStore/ActionCreators/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { ScrollView } from "native-base";

import RequestedService from "../components/RequestedService";

const storeInfo = async (userInfo) => {
  try {
    await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
  } catch (err) {
    console.log(err);
  }
};

const RequestedServices = ({ route }) => {
  const { service } = route.params;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { updateCurrentUser, logoutUser, logoutServices } = bindActionCreators(
    ActionCreators,
    dispatch
  );

  const [requestedServicesArray, setRequestedServicesArray] = React.useState(
    []
  );
  const [fetchedData, setFetchedData] = React.useState(false);

  useEffect(() => {
    console.log("IN USE EFFECT");
    let mounted = true;
    axios
      .post("https://myhandyman1.herokuapp.com/api/requested-service-history", {
        serviceId: service._id,
        jwtToken: user.jwtToken,
      })
      .then((response) => {
        if (mounted) {
          if (response.data.jwtToken === "") {
            logoutUser();
            logoutServices();
            storeInfo({ ...user, jwtToken: "" });
          } else {
            setFetchedData(true);
            if (response.data.error === "") {
              let refreshedToken = response.data.refreshedToken;
              let array = response.data.results;

              // sort array by dates
              array.sort((a, b) => {
                let da = new Date(a.Dates[1]);
                let db = new Date(b.Dates[1]);
                return db - da;
              });

              setRequestedServicesArray(array);
              storeInfo({ ...user, jwtToken: refreshedToken });
              updateCurrentUser({ ...user, jwtToken: refreshedToken });
            } else {
              console.log(response.data.error);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => (mounted = false);
  }, []);

  return (
    <ScrollView>
      {requestedServicesArray.length !== 0 && fetchedData ? (
        requestedServicesArray.map((requestedService, index) => (
          <RequestedService
            requestedService={requestedService}
            key={index.toString()}
          />
        ))
      ) : (
        <Text>You don't have any bookings</Text>
      )}
    </ScrollView>
  );
};

export default RequestedServices;