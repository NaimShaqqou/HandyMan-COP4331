import React, { useCallback, useMemo, useRef, Dimensions } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

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
      {/* <View style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </View> */}
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {/* to map over list of services*/}
        {/* replace "Object.values(services)" with "Object.values(searchResultsArray)" */}
        {Object.values(services).map((item) => (
          <Card style={styles.menuContainer} key={item.id}>
            <Card.Title
              titleStyle={{ justifyContent: "center", alignItems: "center" }}
              title={item.Title}
              subtitle={item.Description}
            />
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            <Card.Content>
              <Title></Title>
              <Paragraph>
                <Text>
                  Price: {"$"}
                  {item.Price}
                  {"\n"}
                  Category: {item.Category}
                  {"\n"}
                  Days Available: {item.DaysAvailable}
                  {"\n"}
                  Address: {item.Address}
                </Text>
              </Paragraph>
            </Card.Content>
          </Card>
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
    backgroundColor: "grey",
  },
  contentContainer: {
    // flex: 1,
    // alignItems: "center",
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  menuContainer: {
    display: "flex",
    padding: 15,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    borderColor: "blue",
    borderWidth: 3,
    elevation: 5,
    shadowColor: "#470000",
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    justifyContent: "center",
    alignItems: "stretch",
    // width: Dimensions.get('window').width,
    maxWidth: "100%",
  },
});

export default BottomSheetComponent;
