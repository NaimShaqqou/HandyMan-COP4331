import { Center, Box, Icon, Input } from "native-base";
import { MaterialIcons } from "@native-base/icons";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../reducerStore/ActionCreators/index";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { Divider, Headline, useTheme, TextInput, Button } from "react-native-paper";
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
    console.log("use effect");
    var obj = {
      numOfServices: "4",
    };

    await axios
      .post("https://myhandyman1.herokuapp.com/api/best-reviewed-services", obj)
      .then(function (response) {
        let newArray = [...response.data.topServices];

        newArray.forEach((element, index) => {
          newArray[index] = { ...newArray[index].service };
        });
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

      let newArray = [...data.results];

      if (sort == "Title")
        newArray.sort((a, b) =>
          b.Title.localeCompare(a.Title) == -1 ? 1 : -1
        );
      else if (sort == "Price Increasing") {
        console.log("sorting...");
        newArray.sort((a, b) => (parseInt(b.Price) < parseInt(a.Price) ? 1 : -1));
      } else if (sort == "Price Decreasing")
        newArray.sort((a, b) => (parseInt(b.Price) > parseInt(a.Price) ? 1 : -1));

      setBottomSheetList(newArray);
    });
  };

  // stuff for filter modal
  const bottomSheetModalRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["94%"], []);
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = React.useCallback((index) => {
    setSearchFilter(search);
    setCategoryFilter(category);
    setMaxDistFilter(maxDist);
    setSortFilter(sort);
    setValueChanged(false);
    setCategoryValueChanged(false)
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
  const [sort, setSort] = useState("Title");

  const [sortFilter, setSortFilter] = useState("Title");
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [maxDistFilter, setMaxDistFilter] = React.useState("5");
  const [valueChanged, setValueChanged] = useState(false)
  const [categoryValueChanged, setCategoryValueChanged] = useState(false)

  // When any of the listed filters change, execute a search
  useEffect(() => {
    doSearchHelper();
  }, [
    search, category, maxDist,
    location, sort
  ]);

  const handleFilterChange = () => {
    setSearch(searchFilter);
    setCategory(categoryFilter);
    setMaxDist(maxDistFilter);
    setSort(sortFilter);
    setValueChanged(false)
    setCategoryValueChanged(false)
    bottomSheetModalRef.current?.close();
  };

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

      <BottomSheet
        searchResults={bottomSheetList}
        popularServices={popularServices}
      />

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
              onChangeText={(newSearch) => setSearchFilter(newSearch)}
              defaultValue={searchFilter == search ? searchFilter : search}
              left={<TextInput.Icon name="magnify" />}
            />

            <Divider style={{ marginVertical: 16 }} />

            <Headline style={{ marginBottom: 16 }}>Select Distance</Headline>
            <SwitchSelector
              initial={maxDist == 1 ? 0 : maxDist / 5}
              hasPadding
              selectedColor={colors.white}
              buttonColor={colors.primary}
              options={[
                { label: "1 Mile", value: 1 },
                { label: "5 Miles", value: 5 },
                { label: "10 Miles", value: 10 },
                { label: "15 Miles", value: 15 },
              ]}
              testID="mile-switch-selector"
              accessibilityLabel="mile-switch-selector"
              onPress={(value) => setMaxDistFilter(value)}
              borderRadius={6}
              borderColor={"lightgray"}
              backgroundColor={colors.background}
            />

            <Divider style={{ marginVertical: 16 }} />
            <Headline style={{ marginBottom: 16 }}>Sort By</Headline>
            <RNPickerSelect
              onValueChange={(value) => {setSortFilter(value); setValueChanged(true)}}
              // value={sort}
              value={valueChanged ? sortFilter : sort}
              items={[
                { label: "Title", value: "Title" },
                { label: "Price Increasing", value: "Price Increasing" },
                { label: "Price Decreasing", value: "Price Decreasing" },
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
            <Divider style={{ marginVertical: 16 }} />
            <Headline style={{ marginBottom: 16 }}>Select Category</Headline>
            <RNPickerSelect
              value={categoryValueChanged ? categoryFilter : category}
              onValueChange={(value) => {setCategoryFilter(value); setCategoryValueChanged(true);}}
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
            <Button disabled={location == "" ? true : false} style={{ marginTop: 16 }} mode={"contained"} onPress={() => handleFilterChange()}>Apply Fiters</Button>
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
