import { Center, ScrollView, Box, Icon, Divider, View } from "native-base";
import { MaterialIcons } from "@native-base/icons";
import React, { useEffect } from "react";
import {
  Title,
  Button
} from "react-native-paper";

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
import MultiSelect from 'react-native-multiple-select';
import CurrencyInput from 'react-native-currency-input';

import { TextInput, StyleSheet } from "react-native"

const storeInfo = async (userInfo, serviceInfo) => {
  try {
    await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    await AsyncStorage.getItem("serviceInfo").then(data => {
      
      // Update whats already in the storage
      data = JSON.parse(data);
      const index = data.findIndex(service => service._id === serviceInfo._id);
      data[index] = serviceInfo;
      
      AsyncStorage.setItem("serviceInfo", JSON.stringify(data));
    });
  } catch (err) {
    console.log(err);
  }
};

// For our multiselect Days Available
const days = [{
    id: 'Monday',
    name: 'Monday'
  }, {
    id: 'Tuesday',
    name: 'Tuesday'
  }, {
    id: 'Wednesday',
    name: 'Wednesday'
  }, {
    id: 'Thursday',
    name: 'Thursday'
  }, {
    id: 'Friday',
    name: 'Friday'
  }, {
    id: 'Saturday',
    name: 'Saturday'
  }, {
    id: 'Sunday',
    name: 'Sunday'
  }
];

const EditService = ({ route }) => {
  
  const user = useSelector((state) => state.user);
  
  // Redux stuff
  const dispatch = useDispatch();
  const { updateServices, updateCurrentUser } = bindActionCreators(ActionCreators, dispatch);
  
  const navigation = useNavigation();
  const { service } = route.params;

  const [currentService, setCurrentService] = React.useState(service)
  const [loading, setLoading] = React.useState(false)

  const updateService = (name, value) => {
    if (value)
    {
      value = Object.values(value);

      // Terrible, but allows us to use the same type of funciton for everything
      if (name != "DaysAvailable")
        value = value[0];

      setCurrentService({ ...currentService, [name]: value})
    } 
  }

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
        updateService("Images", {"images" : images});
      });
    }
  };

  // upload new image to cloudinary
  async function handleUpload(imageFile) {
    const data = new FormData();
    data.append("image", imageFile);

    console.log(data);

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
      console.log(imageUrl);
    } catch (error) {
      console.log(error);
    }

    return imageUrl;
  }

  const googleAutocompleteRef = React.useRef(null);

  // Setup page
  React.useEffect(() =>
  {
    googleAutocompleteRef.current.setText(service.Address);
  }, []);

  // Get the user's information
  React.useEffect(() => {
    console.log(currentService);
  }, [currentService]);

  const saveChanges = async () =>
  {
    setLoading(true);

    console.log("saving edited service! \n" + currentService.Images);
    await axios
      .post("https://myhandyman1.herokuapp.com/api/edit-service", 
      {
        serviceId: currentService._id,
        newTitle: currentService.Title, 
        newImages: currentService.Images,
        newAddress: currentService.Address, 
        newDescription: currentService.Description, 
        newPrice: currentService.Price, 
        newDaysAvailable: currentService.DaysAvailable, 
        newCategory: currentService.Category,
        jwtToken: user.jwtToken
      })
      .then((response) => {
        
        const newUser = {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          profileDescription: user.profileDescription,
          profilePicture: user.profilePicture,
          jwtToken: response.data.refreshedToken,
        };
        
        // redux
        updateServices(currentService);
        updateCurrentUser(newUser);

        // async storage
        storeInfo(newUser, currentService); // store to localstorage

        console.log("Saved successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
      
      setLoading(false);
      navigation.goBack();
    }
    
    return (
      <Center flex={1}>
      <ScrollView mb={"20px"} keyboardShouldPersistTaps='always' listViewDisplayed={false}>
        
        <Button onPress={() => pickImage()} mode="contained">Pick images</Button>
        
        <ImageSwiper images={service.Images} />
        <Box w={"90%"} alignSelf={"center"}>
          <Title style={styles.header} >
            Title:
          </Title>
          <TextInput
            style={styles.textInput}
            onChangeText={(title) => updateService("Title", { title })}
            defaultValue={service.Title}
            name="Title"
          />

          <Divider style={{ marginTop: 16 }} />

          <Title style={styles.header} >
            Description:
          </Title>
          <TextInput
            style={styles.textInput}
            defaultValue={service.Description}
            onChangeText={(description) => updateService("Description", { description })}
            name="Description"
          />

          <Divider style={{ marginTop: 16 }} />

          <Title style={styles.header} >
            Address:
          </Title>
          <GooglePlacesInput 
            ref={googleAutocompleteRef}
            passLocation={(address) => updateService("Address", { address })}
            name="Address"
          />

          <Divider style={{ marginTop: 16 }} />

          <Title style={styles.header} >
            Category:
          </Title>
          <RNPickerSelect
              onValueChange={(category) => updateService("Category", category)}
              items={[
                { label: "Baking", value: {category: "Baking"} },
                { label: "Teaching", value: {category: "Teaching"} },
                { label: "Fixing", value: {category: "Fixing"} },
              ]}
              Icon={() => (
                <Icon
                  mt="2.5"
                  mr="1"
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
                backgroundColor: "colors.background",
              }}
            />
          <Divider style={{ marginTop: 16 }} />
          <Title style={styles.header} >
            Days Available:
          </Title>
          <MultiSelect
            hideTags
            items={days}
            uniqueKey="id"
            onSelectedItemsChange={(daysAvailable) => updateService("DaysAvailable", daysAvailable)}
            selectedItems={currentService.DaysAvailable}
            selectText="Select days available"
            onChangeInput={ (text)=> console.log(text)}
            altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
          />      

          <Divider style={{ marginTop: 16 }} />

          <Title style={styles.header}>
            Price:
          </Title>
          <CurrencyInput
            style={[styles.textInput, { marginBottom: 20 }]}
            onChangeValue={(price) => updateService("Price", { price })}
            value={currentService.Price}
            prefix="$"
            delimiter=","
            separator="."
            precision={2}
            name="Price"
            keyboardType="number-pad"
          />

          <Button onPress={() => saveChanges()} loading={loading} mode="contained">Save</Button>
        </Box>
      </ScrollView>
    </Center>
  );
};

export default EditService;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    fontFamily: "ComfortaaBold",
    paddingLeft: 8,
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 4,
    height: 60,
    color: "black",
    borderColor: "gray"
  },
  header: {
    fontSize: 20,
    fontFamily: "ComfortaaBold",
    paddingLeft: 8,
    marginTop: 16,
  }
});