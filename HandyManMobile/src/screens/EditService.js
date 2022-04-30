import { Center, ScrollView, Box, Icon, Divider, View } from "native-base";
import { MaterialIcons } from "@native-base/icons";
import React, { useEffect } from "react";
import { Title, Button, useTheme, TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../reducerStore/ActionCreators/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

import GooglePlacesInput from "../components/LocationSearchBar.js";
import ImageSwiper from "../components/ImageSwiper";

import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import CustomMultiPicker from "react-native-multiple-select-list";
import CurrencyInput from "react-native-currency-input";

import { StyleSheet } from "react-native";

const storeInfo = async (userInfo, serviceInfo) => {
  try {
    await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

    if (serviceInfo != null) {
    await AsyncStorage.getItem("serviceInfo").then((data) => {
      // Update whats already in the storage
      data = JSON.parse(data);
      const index = data.findIndex(
        (service) => service._id === serviceInfo._id
      );
      data[index] = serviceInfo;

      AsyncStorage.setItem("serviceInfo", JSON.stringify(data));
    });
  }
  } catch (err) {
    console.log(err);
  }
};

// For our multiselect Days Available
const days = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
};

const EditService = ({ route }) => {
  const { colors } = useTheme();

  const user = useSelector((state) => state.user);

  // Redux stuff
  const dispatch = useDispatch();
  const { updateServices, updateCurrentUser } = bindActionCreators(
    ActionCreators,
    dispatch
  );

  const navigation = useNavigation();
  const { service } = route.params;

  const [currentService, setCurrentService] = React.useState(service);
  const [loading, setLoading] = React.useState(false);

  const updateService = (name, value) => {
    if (value) {
      // Terrible, but lets us use the same function for everything
      if (name != "Category") {
        value = Object.values(value);

        if (name != "DaysAvailable") value = value[0];
      }

      setCurrentService({ ...currentService, [name]: value });
    }
  };

  // get image from phone and upload it
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // setLoading(true)
      // console.log(loading)

      let images = currentService.Images;

      // changes the uri to a file object and uploads it to cloudinary
      await handleUpload({
        uri: result.uri,
        type: `image/${result.uri.split(".")[1]}`,
        name: `user-profile.${result.uri.split(".")[1]}`,
      }).then((response) => {
        images.push(response);
        updateService("Images", { images: images });
      });
    }
  };

  // upload new image to cloudinary
  async function handleUpload(imageFile) {
    const data = new FormData();
    data.append("image", imageFile);

    // console.log(data);

    let imageUrl;

    try {
      const res = await fetch(
        "https://myhandyman1.herokuapp.com/api/store-image",
        {
          method: "post",
          body: data,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      var response = JSON.parse(await res.text());

      imageUrl = response.imageUrl;
      // console.log(imageUrl);
    } catch (error) {
      console.log(error);
    }

    return imageUrl;
  }

  const googleAutocompleteRef = React.useRef(null);

  // Setup page
  React.useEffect(() => {
    googleAutocompleteRef.current.setText(service.Address);
  }, []);

  // Get the user's information
  // React.useEffect(() => {
  //   console.log(currentService);
  // }, [currentService]);

  const saveChanges = async () => {
    setLoading(true);

    console.log("saving edited service! \n" + currentService.Images);
    await axios
      .post("https://myhandyman1.herokuapp.com/api/edit-service", {
        serviceId: currentService._id,
        newTitle: currentService.Title,
        newImages: currentService.Images,
        newAddress: currentService.Address,
        newDescription: currentService.Description,
        newPrice: currentService.Price,
        newDaysAvailable: currentService.DaysAvailable,
        newCategory: currentService.Category,
        jwtToken: user.jwtToken,
      })
      .then((response) => {
        if (response.data.jwtToken === "") {
          storeInfo({...user, jwtToken: ""}, null)
          logoutUser()
          logoutServices()
        } else {
          const newUser = {
            ...user,
            jwtToken: response.data.refreshedToken,
          };
          
          // redux
          updateServices(currentService);
          updateCurrentUser(newUser);
          
          // async storage
          storeInfo(newUser, currentService); // store to localstorage
          
          console.log("Saved successfully!");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(false);
    navigation.goBack();
  };

  return (
    <>
      <KeyboardAwareScrollView style={{ marginBottom: 20 }}>
        <Button onPress={() => pickImage()} mode="contained">
          Pick images
        </Button>

        <ImageSwiper images={currentService.Images} service={currentService} serviceSetter={(ret) => setCurrentService(ret)} edit={true}/>
        <Box w={"90%"} alignSelf={"center"}>
          <Title style={styles.header}>Title:</Title>
          <TextInput
            style={styles.textInput}
            onChangeText={(title) => updateService("Title", { title })}
            defaultValue={service.Title}
            label="Title"
          />

          <Divider style={{ marginTop: 16 }} />

          <Title style={styles.header}>Description:</Title>
          <TextInput
            style={styles.textInput}
            defaultValue={service.Description}
            onChangeText={(description) =>
              updateService("Description", { description })
            }
            label="Description"
            multiline={true}
          />

          <Divider style={{ marginTop: 16 }} />

          <Title style={styles.header}>Address:</Title>
          <Box mx={"8px"} mt={"16px"}>
            <GooglePlacesInput
              style={{ fontFamily: "ComfortaaRegular" }}
              ref={googleAutocompleteRef}
              passLocation={(address) => updateService("Address", { address })}
              mode="flat"
            />
          </Box>
          <Divider style={{ marginTop: 16 }} />

          <Title style={styles.header}>Category:</Title>
          <RNPickerSelect
            onValueChange={(category) => updateService("Category", category)}
            items={[
              { label: "Baking", value: "Baking" },
              { label: "Teaching", value: "Teaching" },
              { label: "Fixing", value: "Fixing" },
            ]}
            Icon={() => (
              <Icon
                mt="6"
                mr="1"
                size={8}
                as={<MaterialIcons name="arrow-drop-down" />}
                Color="muted.400"
              />
            )}
            value={currentService.Category}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            textInputProps={{
              borderWidth: 1,
              borderRadius: 5,
              height: 50,
              borderColor: "lightgray",
              padding: 6,
              backgroundColor: colors.background,
            }}
          />
          <Divider style={{ marginTop: 16 }} />
          <Title style={styles.header}>Days Available:</Title>
          <CustomMultiPicker
            options={days}
            search={false} // should show search bar?
            multiple={true} //
            callback={(daysAvailable) => {
              updateService("DaysAvailable", daysAvailable);
            }} // callback, array of selected items
            rowBackgroundColor={"#fff"}
            rowHeight={50}
            rowRadius={4}
            iconColor={"#00a2dd"}
            iconSize={30}
            selectedIconName={"ios-checkmark-circle-outline"}
            unselectedIconName={"ios-radio-button-off-outline"}
            scrollViewHeight={390}
            selected={currentService.DaysAvailable} // list of options which are selected by default
          />

          <Divider style={{ marginTop: 16 }} />

          <Title style={styles.header}>Price:</Title>

          <TextInput
            label="Price"
            style={styles.textInput}
            render={(props) => (
              <CurrencyInput
                {...props}
                onChangeValue={(price) => updateService("Price", { price })}
                value={currentService.Price}
                prefix="$"
                delimiter=","
                separator="."
                precision={0}
                keyboardType="number-pad"
              />
            )}
          />

          <Button
            disabled={
              currentService.Title == "" || 
              currentService.Description == "" || 
              currentService.Address == "" || 
              currentService.Price == null || 
              currentService.Category == "" ||
              currentService.DaysAvailable == [] ||
              currentService.Images == []}
            style={{ marginTop: 20, marginLeft: 8 }}
            onPress={() => saveChanges()}
            loading={loading}
            mode="contained"
          >
            Save
          </Button>
        </Box>
      </KeyboardAwareScrollView>
    </>
  );
};

export default EditService;

const styles = StyleSheet.create({
  textInput: {
    // fontSize: 16,
    // fontFamily: "ComfortaaRegular",
    marginHorizontal: 8,
    marginTop: 16,
    // borderWidth: 1,
    // borderRadius: 4,
    // height: 60,
    // color: "black",
    // borderColor: "gray",
    // backgroundColor: "#fff"
  },
  header: {
    fontSize: 20,
    fontFamily: "ComfortaaBold",
    paddingHorizontal: 8,
    marginTop: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontFamily: "ComfortaaRegular",
    backgroundColor: "#fff",
    fontSize: 16,
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontFamily: "ComfortaaRegular",
    backgroundColor: "#fff",
    fontSize: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
