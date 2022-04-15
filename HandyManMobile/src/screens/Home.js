import { Center, Box, Button, Icon, Input } from 'native-base'
import { MaterialIcons } from "@native-base/icons"
import React, { useState } from 'react'
import {StyleSheet, View, Picker } from 'react-native'

import { Modal, RadioButton, Text } from 'react-native-paper';

import ServicesMap from '../components/ServicesMap.js'
import GooglePlacesInput from '../components/LocationSearchBar.js'

const Home = () => {

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("java");
  const [maxDist, setMaxDist] = React.useState('5');

  return (
    <Center flex={1}>
      <ServicesMap />
      <Box w="100%" position={'absolute'} safeAreaTop alignSelf='flex-start' top={-40}>
        <Box style={styles.searchContainer}>
          <GooglePlacesInput />
          <Button style={styles.filterButton} onPress={showModal}>
          <View>
              <Icon alignSelf="center" size="8" ml="0" as={<MaterialIcons name="filter-list" />} Color="muted.400" />
          </View>
          </Button>
        </Box>
      </Box>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Input 
          placeholder="I need..."
          w="80%"
          h='30%'
          borderRadius="4"
          InputLeftElement={<Icon size="5" ml="2" as={<MaterialIcons name="search" />} Color="muted.400" />}
          variant="filled"
          fontSize={14}
          backgroundColor={'white'}
          onChangeText={(newSearch) => setSearch(newSearch)}
          defaultValue={search}
        />
        
        <RadioButton.Group onValueChange={newValue => setMaxDist(newValue)} value={maxDist}>
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
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </Modal>
    </Center>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 15,
    width: "95%",
    padding: 5
  },
  filterButton: {
    alignSelf: "flex-start",
    flex: 0,
    height: 25,
    width: 25,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: "white"
  },
  radioButton: {
    display: "flex",
    flexDirection: "row",
  }
});

export default Home