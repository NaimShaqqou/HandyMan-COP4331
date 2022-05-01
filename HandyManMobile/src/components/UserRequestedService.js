import { View } from "native-base";
import React, { useState, useEffect } from "react";
import { Text, Title, Button, Card, } from "react-native-paper";
//import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import ImageSwiper from "./ImageSwiper";
import { colors, Icon } from "react-native-elements";


const windowHeight = Dimensions.get("window").height;
const { width, height } = Dimensions.get("screen");

export default function UserRequestedService(props) {
    const [requestedService, setRequestedService] = useState(props.item);
    const [serviceId, setServiceId] = useState(requestedService.ServiceId);
    const [service, setService] = useState([]);
    console.log(serviceId);

    useEffect(() => {
      console.log("hii");
        let mounted = true;
        axios
          .post("https://myhandyman1.herokuapp.com/api/get-service", {
            serviceId: serviceId
          })
          .then((response) => {
            if (mounted) {
              console.log("success");
              setService(response.data.service);
            }
            console.log(response.data.service)
          })
          .catch((error) => {
            console.log("failure")
            console.log(error);
          });
        return () => (mounted = false);
    }, [requestedService]);

  return (
    <Card style={styles.menuContainer}>
      <Card.Title
        titleStyle={{ justifyContent: "center", alignItems: "center" }}
        title={service.Title}
        subtitle={service.Description}
      />

      <Card.Cover style={{ borderRadius: 13 }}>
        <ImageSwiper images={service.Images} />
      </Card.Cover>

      <Card.Content>
        <Title></Title>
        <View style={styles.cardContentView}>
          <Icon name="credit-card" style={{ marginRight: 0 }} />
          <Text> Price: ${service.Price}</Text>
        </View>
        <View style={styles.cardContentView}>
          <Icon name="home-repair-service" style={{ marginRight: 0 }} />
          <Text> Category: {service.Category}</Text>
        </View>
        <View style={styles.cardContentView}>
          <Icon name="event" style={{ marginRight: 0 }} />
          <Text> Days Available: 
            {service.DaysAvailable.map((day) => (
              <Text key={day}> {day}</Text>
            ))}
          </Text>
        </View>
        <View style={styles.cardContentView}>
          <Icon name="place" style={{ marginRight: 0 }} />
          <Text> Address: {service.Address}</Text>
        </View>
      </Card.Content>

      <Card.Actions>
        <Button>
          Edit
        </Button>

        <Button>
          Delete
        </Button>
      </Card.Actions>

    </Card>
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