import React, { useCallback, useMemo, useRef, Dimensions } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  List,
} from "react-native-paper";

const BottomSheetComponent = () => {
  const services = useSelector((state) => state.services).services;

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["3%", "25%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    // <View style={styles.container}>
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {/* to map over list of services*/}
        {/* replace "Object.values(services)" with "Object.values(searchResultsArray)" */}
        {Object.values(services).map((item) => (
          <List.Accordion
            key={item.id}
            title={item.Title}
            description={item.Description}
            left={() => (
              <Avatar.Image source={{ uri: "https://picsum.photos/700" }} />
            )}
            style={styles.list}
            theme={{ colors: {background: 'white'}}}
          >
            <List.Item
              title={"Price: $" + item.Price}
              left={() => (
                <List.Icon
                  icon="credit-card-outline"
                  style={{ marginRight: 0 }}
                />
              )}
              style={{ marginVertical: -18 }}
            />
            <List.Item
              title={"Category: " + item.Category}
              left={() => (
                <List.Icon icon="toolbox-outline" style={{ marginRight: 0 }} />
              )}
              style={{ marginVertical: -18 }}
            />
            <List.Item
              title={"Days Available: " + item.DaysAvailable}
              style={{ marginVertical: -18 }}
              left={() => (
                <List.Icon icon="calendar" style={{ marginRight: 0 }} />
              )}
            />
            <List.Item
              title={"Address: " + item.Address}
              style={{ marginVertical: -18 }}
              left={() => (
                <List.Icon
                  icon="map-marker-outline"
                  style={{ marginRight: 0 }}
                />
              )}
            />
            <Button>Learn More</Button>
          </List.Accordion>
        ))}
      </BottomSheetScrollView>
    </BottomSheet>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    width: "100%",
    // backgroundColor: "grey",
  },
  contentContainer: {
    // flex: 1,
    // justifyContent: "center",
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    // backgroundColor: "#eee",
  },
  list: {
    // borderRadius: 35,
    backgroundColor: "white",
    marginTop: 16,
    alignSelf: "center",
    // borderColor: 'gray',
    // borderWidth: 1,
    width: "95%",
  },
});

export default BottomSheetComponent;
