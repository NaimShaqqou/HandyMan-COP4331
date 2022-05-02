import { Divider, Center, Box, ScrollView } from "native-base";
import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  Card,
  Avatar,
  Paragraph,
  useTheme,
} from "react-native-paper";
import axios from "axios";
import { Dimensions, StyleSheet } from "react-native";

import { colors } from "react-native-elements";

const { width } = Dimensions.get("screen");

export default function UserRequestedService(props) {
  const { colors } = useTheme();
  const requestedService = props.item;
  const serviceId = requestedService.ServiceId;
  const [service, setService] = useState(null);
  const [fetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    let mounted = true;
    axios
      .post("https://myhandyman1.herokuapp.com/api/get-service", {
        serviceId: serviceId,
      })
      .then((response) => {
        if (mounted) {
          console.log("success");
          setService(response.data.service);
          setFetchedData(true);
        }
        console.log(response.data.service);
      })
      .catch((error) => {
        console.log("failure");
        console.log(error);
      });
    return () => (mounted = false);
  }, [requestedService]);

  const Status = () =>
    requestedService.Accepted ? (
      <CompletionButtons />
    ) : (
      <Button color={colors.error} mode="outlined" style={{ marginTop: 8, marginRight: 8, flexDirection: "column" }} >
        {/* Hasn't{"\n"}been{"\n"}accepted */}
        <Box m="0px" p={"0px"}>
          <Button color={colors.error}>Hasn't</Button>
          <Button color={colors.error}>Been</Button>
          <Button color={colors.error}>Accepted</Button>

        </Box>
      </Button>
    );

  const CompletionButtons = () =>
    requestedService.Completion ? (
      <Box>
        <Button
          color={"#16a34a"}
          mode="outlined"
          style={{ marginRight: 8, marginBottom: 8 }}
        >
          Completed
        </Button>
        <ReviewButtons />
      </Box>
    ) : (
      <Button mode="outlined" style={{ marginRight: 8 }}>
        In Progress
      </Button>
    );

  const ReviewButtons = () =>
    requestedService.Reviewed ? (
      <Button color={"#16a34a"} mode="contained" style={{ marginRight: 8 }}>
        Reviewed
      </Button>
    ) : (
      props.AddReviewButton
    );

  return (
    <>
      {service !== null && fetchedData && (
        <Card style={{ width: "95%", marginTop: 16, alignSelf: "center" }}>
          <Card.Title
            title={service.Title}
            titleNumberOfLines={4}
            left={() => (
              <Avatar.Image
                size={48}
                source={{
                  uri: service.Images === null ? "" : service.Images[0],
                }}
              />
            )}
            subtitle={service.Address}
            subtitleNumberOfLines={4}
            right={() => <Status />}
          />
          <Card.Content>
            <Box mt={"8px"}>
              <Paragraph>
                {"Service Description: " + service.Description}
              </Paragraph>
            </Box>
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
            <Divider mt={"8px"} />
            <Center mt={"8px"}>
              <Paragraph>
                {"Your request: " + requestedService.DescriptionFromRequester}
              </Paragraph>
            </Center>
          </Card.Content>
        </Card>
      )}
    </>
  );
}

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

// <Card style={styles.menuContainer}>
//           <Card.Title
//             titleStyle={{ justifyContent: "center", alignItems: "center" }}
//             title={service.Title}
//             subtitle={service.Description}
//           />

//           <Card.Cover style={{ borderRadius: 13 }}>
//             <ImageSwiper images={service.Images} />
//           </Card.Cover>

//           <Card.Content>
//             <Title></Title>
//             <View style={styles.cardContentView}>
//               <Icon name="credit-card" style={{ marginRight: 0 }} />
//               <Text> Price: ${service.Price}</Text>
//             </View>
//             <View style={styles.cardContentView}>
//               <Icon name="home-repair-service" style={{ marginRight: 0 }} />
//               <Text> Category: {service.Category}</Text>
//             </View>
//             <View style={styles.cardContentView}>
//               <Icon name="event" style={{ marginRight: 0 }} />
//               <Text>
//                 {" "}
//                 Days Available:
//                 {service.DaysAvailable.map((day) => (
//                   <Text key={day}> {day}</Text>
//                 ))}
//               </Text>
//             </View>
//             <View style={styles.cardContentView}>
//               <Icon name="place" style={{ marginRight: 0 }} />
//               <Text> Address: {service.Address}</Text>
//             </View>
//           </Card.Content>

//           <Card.Actions>
//             <Button>Edit</Button>

//             <Button>Delete</Button>
//           </Card.Actions>
//         </Card>
