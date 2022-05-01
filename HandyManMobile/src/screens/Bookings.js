import { Center, Box, Divider, View } from "native-base";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, Card } from "react-native-paper";
//import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { colors } from "react-native-elements";
import UserRequestedService from "../components/UserRequestedService";

const windowHeight = Dimensions.get("window").height;
const { width, height } = Dimensions.get("screen");

const Bookings = () => {
  const user = useSelector((state) => state.user);
  const [bookings, setBookings] = React.useState([]);
  const [requestedService, setRequestedService] = React.useState([]);
  const [service, setService] = React.useState([]);
  //const [serviceId, setServiceId] = React.useState([]);
  const [fetchedData, setFetchedData] = React.useState(false);

  useEffect(() => {
    let mounted = true;
    axios
      .post("https://myhandyman1.herokuapp.com/api/services-user-booked", {
          requesterId: user.userId,
          jwtToken: user.jwtToken
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

  //const renderItem = useCallback(({ item }) => <Booking review={item} />);
  return (
    <View style={{ flex: 1, backgroundColor: "#003b801a" }}>
    <ScrollView
      contentContainerStyle={styles.viewContainer}
    >
      {Object.values(bookings).map((item, index) => (
        <Text key={item._id}>
          <UserRequestedService item={item} key={index.toString()}/>
          {"\n"}
        </Text>
      ))}
      <Text>
        hi
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

export default Bookings;