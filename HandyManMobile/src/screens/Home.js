import { Center, Box, Button, Icon, Input } from "native-base";
import { MaterialIcons } from "@native-base/icons";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../reducerStore/ActionCreators/index";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { Divider, Headline, useTheme, TextInput } from "react-native-paper";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import SwitchSelector from "react-native-switch-selector";
import RNPickerSelect from "react-native-picker-select";

import ServicesMap from "../components/ServicesMap.js";
import GooglePlacesInput from "../components/LocationSearchBar.js";
import BottomSheet from "../components/BottomSheet.js";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { updateCurrentUser } = bindActionCreators(ActionCreators, dispatch);
  const { colors } = useTheme();

  const [popularServices, setPopularServices] = React.useState("");

  React.useEffect(async () => {
    console.log("use effect")
    var obj = {
      numOfServices: "4",
    };

    await axios
      .post("https://myhandyman1.herokuapp.com/api/best-reviewed-services", obj)
      .then(function (response) {
        let newArray = [...response.data.topServices]

        newArray.forEach((element, index) => {
          newArray[index] = {...newArray[index].service}
        })
        setPopularServices(newArray);
        
      })
      .catch(function (response) {
        console.log(response);
      });

      // bottomSheetRef.current.snapToIndex(2);
  }, []);

  // Can be called to actually call the search api
  const doSearch = async (filters, _event) => {
    try {
      // call register api
      var obj = {
        search: filters.search,
        category: filters.category,
        location: filters.location,
        maxDist: filters.maxDist,
      };
      var js = JSON.stringify(obj);
      console.log("input: " + js);

      const response = await fetch(
        "https://myhandyman1.herokuapp.com/api/search-services",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );

      // refresh token if necessary
      await axios
        .post("https://myhandyman1.herokuapp.com/api/refresh-token", {
          jwtToken: user.jwtToken,
        })
        .then((resp) => {
          console.log("checking jwtToken");
          if (resp.data.refreshedToken === "") {
            console.log("jwtToken invalid");
            updateCurrentUser({ ...user, jwtToken: "" });
          } else {
            console.log("updated jwtToken");
            updateCurrentUser({ ...user, jwtToken: resp.data.refreshedToken });
          }
        })
        .catch((resp) => {
          console.log(resp);
        });
      await AsyncStorage.setItem("userInfo", JSON.stringify(user));

      return JSON.parse(await response.text());
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  const mapViewRef = React.useRef(null);
  const [bottomSheetList, setBottomSheetList] = React.useState("");

  const doSearchHelper = () => {
    // We don't do a search unless a location is specified.
    // Everything else is optional
    if (location == "") return;

    doSearch({
      search: search,
      category: category,
      location: location,
      maxDist: maxDist,
    }).then((data) => {
      mapViewRef.current.setServicesFromParent(data.results);
      setBottomSheetList(data.results);
    });
  };

  // stuff for filter modal
  const bottomSheetModalRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["60%"], []);
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = React.useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  // filters to use in search api:
  //  search - contains string of service to search
  //  location - the place where we search for services
  //  category - contains string of category of service
  //  maxDist - contains string of maximum distance of search results
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [maxDist, setMaxDist] = React.useState("5");

  // When any of the listed filters change, execute a search
  useEffect(() => {
    doSearchHelper();
  }, [search, category, maxDist, location]);

  return (
    <Center safeAreaTop display={"flex"} flex={1} justifyContent={"flex-end"}>
      <ServicesMap ref={mapViewRef} />
      <Center w="80%" position={"absolute"} safeAreaTop top={5}>
        <GooglePlacesInput
          bg="#fff"
          doSearch={doSearchHelper}
          passLocation={setLocation}
          filterIcon={
            <TextInput.Icon
              name="filter-variant"
              forceTextInputFocus={false}
              onPress={handlePresentModalPress}
            />
          }
        />
      </Center>

      <BottomSheet searchResults={bottomSheetList} popularServices={popularServices} />

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <Box flex={1} p={"16px"}>
            <Headline>Search Service</Headline>
            <TextInput
              label="Service"
              placeholder="Bakery"
              mode="outlined"
              onChangeText={(newSearch) => setSearch(newSearch)}
              defaultValue={search}
              left={<TextInput.Icon name="magnify" />}
            />

            <Divider style={{ marginVertical: 16 }} />

            <Headline style={{ marginBottom: 16 }}>Select Distance</Headline>
            <SwitchSelector
              initial={maxDist == 1 ? 0 : maxDist / 5}
              hasPadding
              selectedColor={colors.white}
              buttonColor={colors.primary}
              // borderColor={colors.primary}
              options={[
                { label: "1 Mile", value: 1 },
                { label: "5 Miles", value: 5 },
                { label: "10 Miles", value: 10 },
                { label: "15 Miles", value: 15 },
              ]}
              testID="mile-switch-selector"
              accessibilityLabel="mile-switch-selector"
              onPress={(value) => setMaxDist(value)}
              borderRadius={6}
              borderColor={"lightgray"}
              backgroundColor={colors.background}
            />

            <Divider style={{ marginVertical: 16 }} />
            <Headline style={{ marginBottom: 16 }}>Select Category</Headline>
            <RNPickerSelect
              onValueChange={(value) => setCategory(value)}
              items={[
                { label: "Baking", value: "baking" },
                { label: "Teaching", value: "teaching" },
                { label: "Fixing", value: "fixing" },
              ]}
              Icon={() => (
                <Icon
                  mt="2.5"
                  mr="1"
                  size={8}
                  as={<MaterialIcons name="arrow-drop-down" />}
                  Color="muted.400"
                />
              )}
              textInputProps={{
                borderWidth: 1,
                borderRadius: 5,
                height: 50,
                borderColor: "lightgray",
                padding: 6,
                backgroundColor: colors.background,
              }}
            />
          </Box>
        </BottomSheetModal>
      </BottomSheetModalProvider>
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
    alignSelf: "center",
    width: "80%",
  },
});

export default Home;
