import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import BottomSheet, { BottomSheetVirtualizedList } from "@gorhom/bottom-sheet";
import {
  Avatar,
  Button,
  Card,
  Headline,
  List,
  Subheading,
  Text,
  IconButton,
} from "react-native-paper";

import { FlatList, ScrollView } from "react-native-gesture-handler";

import { Box, Center, View, Divider, } from "native-base";

import { useNavigation } from "@react-navigation/native";
import EmptyBoxArt from "./EmptyBoxArt";
import { Icon } from "react-native-elements";

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
    bottomSheetRef.current.snapToIndex(2);
  }, [searchResults]);

  const renderItem = useCallback(
    ({ item }) => (
      <Card
        style={{ marginVertical: 16, width: "95%", alignSelf: "center" }}
        onPress={() =>
          navigation.navigate("ServiceInfoScreen", { service: item })
        }
      >
        <Card.Title
          titleStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          title={item.Title}
          subtitle={item.Description}
          titleNumberOfLines={4}
          subtitleNumberOfLines={4}
          right={() => (
            <Button
              icon="arrow-right"
              onPress={() =>
                navigation.navigate("ServiceInfoScreen", { service: item })
              }
            >
              Book Now!
            </Button>
          )}
        />
        <Card.Cover source={{ uri: item.Images[0] }} />
        <Card.Content>
          <Box flexDir={"row"} alignItems={"center"} mt={"16px"}>
            <Icon name="credit-card" style={{ marginRight: 0 }} />
            <Text style={{ marginLeft: 8 }}>Price: ${item.Price}</Text>
          </Box>
          <Box flexDir={"row"} alignItems={"center"} mt={"8px"}>
            <Icon name="home-repair-service" style={{ marginRight: 0 }} />
            <Text style={{ marginLeft: 8 }}>Category: {item.Category}</Text>
          </Box>
          <Box flexDir={"row"} alignItems={"center"} mt={"8px"}>
            <Icon name="event" style={{ marginRight: 0 }} />
            <Text style={{ marginLeft: 8 }}>
              Days Available:
              {item.DaysAvailable.map((day) => (
                <Text key={day}> {day}</Text>
              ))}
            </Text>
          </Box>
          <Box flexDir={"row"} alignItems={"center"} mt={"8px"}>
            <Icon name="place" style={{ marginRight: 0 }} />
            <Text style={{ marginLeft: 8 }}>Address: {item.Address}</Text>
          </Box>
        </Card.Content>
      </Card>
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
        <Center h={"365"}>
          <EmptyBoxArt text={"No search results found!"} />
        </Center>
      ) : (
        <View h={height}>
          <Headline style={{ marginLeft: 10 }}>Search Results:</Headline>
          <Divider w={'95%'} alignSelf={"center"} mt={'8px'} />
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <Divider />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </BottomSheet>
  );
};

export default BottomSheetComponent;
