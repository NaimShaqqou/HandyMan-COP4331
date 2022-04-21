import { Center, Box, Button, Icon, Input } from "native-base";
import { MaterialIcons } from "@native-base/icons";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Picker } from "react-native";

import { useSelector } from "react-redux";

import { Modal, RadioButton, Text } from "react-native-paper";

import ServicesMap from "../components/ServicesMap.js";
import GooglePlacesInput from "../components/LocationSearchBar.js";
import BottomSheet from "../components/BottomSheet.js";

const Home = () => {

  // Can be called to actually call the search api
  const doSearch = async (filters, event) => 
  {
    try {
      // call register api
      var obj = { 
        search: filters.search, 
        category: filters.category, 
        location: filters.location, 
        maxDist: filters.maxDist, 
        jwtToken: user.jwtToken
      }
      var js = JSON.stringify(obj);
      console.log("input: " + js);

      const response = await fetch('https://myhandyman1.herokuapp.com/api/search-services', {
          method: 'POST',
          body: js,
          headers: { "Content-Type": "application/json" }
      });
      var res = JSON.parse(await response.text());

      return res;
      // if (res.error == '') 
        // send the data to the map and list

    } catch (e) {
      console.log(e.toString());
      return; 
    }
  }

  const childCompRef = React.useRef(null);

  doSearchHelper = () => {
    // We don't do a search unless a location is specified.
    // Everything else is optional
    if (location == "") return;

    doSearch(
      { search: search, 
        category: category, 
        location: location, 
        maxDist: maxDist
      })
      .then((data) => {

        childCompRef.current.setServices(data.results);

        // ***********************************
        // SEND THE DATA TO THE LIST
        // ***********************************
      });
  }
  
  const user = useSelector((state) => state.user);

  // to handle opening/closing of filters modal
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // filters to use in search api:
  //  search - contains string of service to search
  //  category - contains string of category of service
  //  maxDist - contains string of maximum distance of search results
  // TODO: get the location from autocomplete search box
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [maxDist, setMaxDist] = React.useState("5");

  // When any of the listed filters change, execute a search
  useEffect(() => {
    doSearchHelper();
  }, [search, category, maxDist, location]);

  return (
    <Center safeAreaTop display={"flex"} flex={1} justifyContent={'flex-end'}>
      <ServicesMap ref={childCompRef}/>
      <Center w="80%" position={"absolute"} safeAreaTop top={5}>
        <GooglePlacesInput doSearch={this.doSearchHelper} passLocation={setLocation}
          filterIcon={
            <Button variant="unstyled" px="2" py="0" onPress={showModal}>
              <Icon
                size="6"
                ml="0"
                as={<MaterialIcons name="filter-list" />}
                Color="muted.400"
              />
            </Button>
          }
        />
      </Center>
      <BottomSheet />

      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
      >
        <Center h="10%">
          <Input
            placeholder="I need..."
            w="80%"
            h="100%"
            borderRadius="4"
            InputLeftElement={
              <Icon
                size="5"
                ml="2"
                as={<MaterialIcons name="search" />}
                Color="muted.400"
              />
            }
            variant="outline"
            fontSize={14}
            backgroundColor={"white"}
            onChangeText={(newSearch) => setSearch(newSearch)}
            defaultValue={search}
          />
        </Center>

        <RadioButton.Group
          onValueChange={(newValue) => setMaxDist(newValue)}
          value={maxDist}
        >
          <View style={styles.radioButton}>
            <Text>1</Text>
            <RadioButton value="1" />
          </View>
          <View style={styles.radioButton}>
            <Text>5</Text>
            <RadioButton value="5" />
          </View>
          <View style={styles.radioButton}>
            <Text>10</Text>
            <RadioButton value="10" />
          </View>
          <View style={styles.radioButton}>
            <Text>15</Text>
            <RadioButton value="15" />
          </View>
        </RadioButton.Group>

        <Picker
          selectedValue={category}
          // style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </Modal>
      

    </Center>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    display: "flex",
    flexDirection: "row",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    alignSelf: 'center',
    width: '80%'
  }
});

export default Home;
