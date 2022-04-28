import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'

// EXAMPLE OF A SERVICE OBJECT
// MOST OF THESE ARE THINGS WE CAN EDIT
// Object {
//     "Address": "600 SE BIRMAN BRANFORD FL 32008-5113 USA",
//     "Category": "Baking",
//     "DaysAvailable": Array [
//       "Monday",
//     ],
//     "Description": "My Bakery is so cool",
//     "Images": Array [
//       "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg",
//       "image2",
//     ],
//     "Latitude": "29.9385471",
//     "Longitude": "-82.9660713",
//     "Price": "5",
//     "Title": "Bakery",
//     "UserId": "6234c4d39a050a36555a6942",
//     "__v": 0,
//     "_id": "623d06bcf0d7561302cefa47",
//   }

const EditService = ({ route }) => {
    const { service } = route.params

    const [currentService, setCurrentService] = useState(service)

    // EXAMPLE OF EDITING A SERVICE
    const saveChanges = () => {
        // changing the description and title
        setCurrentService({ ...currentService, Title: "mynewtitle", Description: "mynewdescription"})

        // edited service to pass into api:
            // currentService
            // ^^^^^^^^^^^^^^ that thing should contain all of the edits if you use the method I gave
    }

  return (
    <View>
      <Text>service title: {currentService.Title}</Text>
      <Text>service description: {currentService.Description}</Text>
      <Button onPress={() => saveChanges()}>edit stuff</Button>
    </View>
  )
}

export default EditService