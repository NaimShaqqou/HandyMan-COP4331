import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";
import { Avatar, Button, Divider, List } from "react-native-paper";

import { FlatList } from "react-native-gesture-handler";

const BottomSheetComponent = () => {
  const services = useSelector((state) => state.services).services;

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["3%", "25%", "50%", "80%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <List.Accordion
        key={item.id}
        title={item.Title}
        description={item.Description}
        left={() => (
          <Avatar.Image source={{ uri: "https://picsum.photos/700" }} />
        )}
        style={styles.list}
        theme={{ colors: { background: "white" } }}
      >
        <List.Item
          title={"Price: $" + item.Price}
          left={() => (
            <List.Icon icon="credit-card-outline" style={{ marginRight: 0 }} />
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
          left={() => <List.Icon icon="calendar" style={{ marginRight: 0 }} />}
        />
        <List.Item
          title={"Address: " + item.Address}
          style={{ marginVertical: -18 }}
          left={() => (
            <List.Icon icon="map-marker-outline" style={{ marginRight: 0 }} />
          )}
        />
        <Button>Learn More</Button>
      </List.Accordion>
    ),
    []
  );

  // renders
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <FlatList
        data={services}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    width: "100%",
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
  },
  list: {
    backgroundColor: "white",
    marginVertical: 8,
    alignSelf: "center",
    width: "95%",
  },
});

export default BottomSheetComponent;
