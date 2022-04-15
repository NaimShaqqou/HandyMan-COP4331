import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

export default class ServicesMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            // CHANGE THIS IF YOU WANT TO MANUALLY TEST INPUT.
            services : [
              {
                "_id": "623a99227131da5da110fa58",
                "UserId": "6234c4d39a050a36555a6942",
                "Title": "Bakery1",
                "Images": [
                  "image1",
                  "image2"
                ],
                "Address": "14330 Alafaya Oak Bend",
                "Longitude": "-81.1705685",
                "Latitude": "30.510048",
                "Description": "My Bakery is so cool",
                "Price": "5",
                "DaysAvailable": [
                  "Monday"
                ],
                "Category": "Baking",
                "__v": 0
              },
              {
                "_id": "623a9d0667f7fad761e06f9e",
                "UserId": "6234c4d39a050a36555a6942",
                "Title": "Bakery2",
                "Images": [
                  "image1",
                  "image2"
                ],
                "Address": "14330 Alafaya Oak Bend",
                "Longitude": "-81.1705685",
                "Latitude": "28.510048",
                "Description": "My Bakery is so cool",
                "Price": "5",
                "DaysAvailable": [
                  "Monday"
                ],
                "Category": "Baking",
                "__v": 0
              }
            ]
        };
    }

    // Call this to change the services. This will force refresh the render.
    SetServices(newServices)
    {
      this.setState({services: newServices});
    }

    render() {
      return (
        <MapView style={styles.map}
        // onPress={(e) => this.setState({ services: e.nativeEvent.coordinate })}
        >
        {
            this.state.services.map((marker, index) => (
            <MapView.Marker
                key = {index}
                coordinate = {{
                    latitude: parseFloat(marker.Latitude),
                    longitude: parseFloat(marker.Longitude)
                }}
                title = { marker.Title }
                description = { marker.Description }
            />
            ))
        }
        </MapView>
      );
    }
}

const styles = StyleSheet.create({
  map: {
    // ...StyleSheet.absoluteFill,
    flex: 1,
    width: Dimensions.get('window').width,
  },
});