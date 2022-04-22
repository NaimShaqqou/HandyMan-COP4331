import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

export default class ServicesMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // CHANGE THIS IF YOU WANT TO MANUALLY TEST INPUT.
            services : []
        };
    }

    // Call this to change the services. This will force refresh the render.
    // handleChange = e => this.setState({services: e});
    setServices(s) { this.setState({services : s}); }

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