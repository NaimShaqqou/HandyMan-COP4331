import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import BottomSheet, { BottomSheetVirtualizedList } from "@gorhom/bottom-sheet";
import {
  Avatar,
  Button,
  Divider,
  Headline,
  List,
  Subheading,
} from "react-native-paper";

import { FlatList, ScrollView } from "react-native-gesture-handler";

import { Box, Center, View } from "native-base";

import { useNavigation } from "@react-navigation/native";
import EmptyBoxArt from "./EmptyBoxArt";

const BottomSheetComponent = ({ searchResults }) => {
  const navigation = useNavigation();

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["3%", "25%", "50%", "80%"], []);

  // callbacks
  const [height, setHeight] = React.useState();
  const handleSheetChanges = useCallback((index) => {
    switch (index) {
      case 1:
        setHeight("175");
        break;
      case 3:
        setHeight("100%");
        break;
      default:
        setHeight("365");
        break;
    }
  }, []);

  React.useEffect(() => {
    if (searchResults == "") bottomSheetRef.current.snapToIndex(0);
    else bottomSheetRef.current.snapToIndex(2);
  }, [searchResults]);

  const renderItem = useCallback(
    ({ item }) => (
      <List.Accordion
        title={item.Title}
        description={item.Description}
        left={() => <Avatar.Image source={{ uri: item.Images[0] }} />}
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
        <List.Item
          title=""
          onPress={() =>
            navigation.navigate("ServiceInfoScreen", { service: item })
          }
          left={() => (
            <Box
              flexDir={"row"}
              alignItems="center"
              justifyContent={"flex-end"}
            >
              <Button
                icon="information-outline"
                style={{ width: "95%" }}
                mode="outlined"
              >
                Learn More
              </Button>
            </Box>
          )}
        />
      </List.Accordion>
    ),
    []
  );

  // renders
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      {searchResults == "" ? (
        <Center>
          <EmptyBoxArt text={"No search results found!"} />
        </Center>
      ) : (
        <View h={height}>
          <FlatList
            data={searchResults}
            // getItemCount={(data) => data.length}
            // getItem={(data, index) => data[index]}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <Divider />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
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
    flex: 1,
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
