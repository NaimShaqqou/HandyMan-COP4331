import { Center, ScrollView } from "native-base";
import React, { useEffect } from "react";
import { Text, Card, Button, Headline, TextInput } from "react-native-paper";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../reducerStore/ActionCreators/index";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Dimensions, StyleSheet } from "react-native";
import { colors } from "react-native-elements";
import UserRequestedService from "../components/UserRequestedService";
import EmptyBoxArt from "../components/EmptyBoxArt";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { AirbnbRating } from "react-native-ratings";

const windowHeight = Dimensions.get("window").height;
const { width, height } = Dimensions.get("screen");

const storeInfo = async (userInfo) => {
  try {
    await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
  } catch (err) {
    console.log(err);
  }
};

const Bookings = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { updateCurrentUser, logoutUser, logoutServices } = bindActionCreators(
    ActionCreators,
    dispatch
  );

  const [bookings, setBookings] = React.useState([]);
  const [requestedService, setRequestedService] = React.useState(null);
  const [fetchedData, setFetchedData] = React.useState(false);

  useEffect(() => {
    let mounted = true;
    axios
      .post("https://myhandyman1.herokuapp.com/api/services-user-booked", {
        requesterId: user.userId,
        jwtToken: user.jwtToken,
      })
      .then((response) => {
        if (mounted) {
          setBookings(response.data.results);
          setFetchedData(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => (mounted = false);
  }, []);

  const addReview = async () => {
    setLoading(true);
    let flag = false;
    if (msg === "") {
      return;
    } else {
      await axios
        .post("https://myhandyman1.herokuapp.com/api/add-review", {
          serviceId: requestedService.ServiceId,
          userId: user.userId,
          reviewerProfilePic: user.profilePicture,
          reviewText: msg,
          rating: stars,
          jwtToken: user.jwtToken,
        })
        .then((response) => {
          if (response.data.jwtToken === "") {
            flag = true;
            logoutUser();
            logoutServices();
            storeInfo({ ...user, jwtToken: "" });
          } else {
            if (response.data.error === "") {
              console.log("added review");
              updateCurrentUser({
                ...user,
                jwtToken: response.data.refreshedToken,
              });
            } else {
              console.log(response.data.error);
            }
          }
        })
        .catch((error) => {
          console.log(error.message);
        });

      setLoading(false);
      bottomSheetModalRef.current?.close();

      if (flag) {
        return;
      } else {
        await axios
          .post("https://myhandyman1.herokuapp.com/api/reviewed-request", {
            requestedServiceId: requestedService._id,
            jwtToken: user.jwtToken,
          })
          .then((response) => {
            let serviceToChange = bookings.findIndex(
              (service) => service._id === requestedService._id
            );
            setRequestedService({
              ...bookings[serviceToChange],
              Reviewed: true,
            });

            const newArray = [...bookings];
            newArray[serviceToChange] = {
              ...newArray[serviceToChange],
              Reviewed: true,
            };
            setBookings(newArray);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const bottomSheetModalRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["100%"], []);
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = React.useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const [msg, setMsg] = React.useState("");
  const [stars, setStars] = React.useState(3);
  const [loading, setLoading] = React.useState(false);

  //const renderItem = useCallback(({ item }) => <Booking review={item} />);
  return (
    <>
      {bookings.length !== 0 && fetchedData ? (
        <>
          <ScrollView
            bgColor={"#003b801a"}
          >
            {bookings.map((item, index) => (
              <UserRequestedService
                item={item}
                key={index.toString()}
                AddReviewButton={
                  <Button
                    color={"#16a34a"}
                    mode="outlined"
                    style={{ marginRight: 8 }}
                    onPress={() => {
                      handlePresentModalPress();
                      setRequestedService(item);
                    }}
                  >
                    Add Review
                  </Button>
                }
              />
            ))}
          </ScrollView>
          <BottomSheetModalProvider>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
            >
              <ScrollView p={"16px"}>
                <Headline style={{ fontFamily: "ComfortaaBold" }}>
                  Add Review
                </Headline>
                <AirbnbRating
                  reviewColor="#003c80"
                  selectedColor="#003c80"
                  unSelectedColor="#003c801a"
                  onFinishRating={(rating) => setStars(rating)}
                />
                <TextInput
                  label={"Review"}
                  multiline={true}
                  onChangeText={(review) => setMsg(review)}
                  left={<TextInput.Icon name="star" />}
                  style={{ marginTop: 16 }}
                />
                <Button
                  onPress={() => addReview()}
                  loading={loading}
                  disabled={loading}
                  mode="contained"
                  style={{ marginTop: 16 }}
                >
                  Add Review
                </Button>
              </ScrollView>
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </>
      ) : (
        <Center h={"100%"} bgColor={"#003b801a"}>
          <EmptyBoxArt text={"You have not booked any services yet!"} />
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

export default Bookings;
