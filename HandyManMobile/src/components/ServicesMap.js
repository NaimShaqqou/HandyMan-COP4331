import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import MapView, { Callout } from 'react-native-maps'

import { useNavigation } from "@react-navigation/native";
import { View } from 'native-base';

const ServicesMap = forwardRef((props, ref) => {
  const navigation = useNavigation();
  const [services, setServices] = useState([]);

  useEffect(() => {
    console.log(services);
  }, [services]);

  // Call this to change the services. This will force refresh the render.
  // handleChange = e => this.setState({services: e});
  useImperativeHandle(ref, () => ({

    setServicesFromParent(s)
    {
      setServices(s);
    }
  }));

  return (
    <MapView style={styles.map}
    // onPress={(e) => this.setState({ services: e.nativeEvent.coordinate })}
    >
    {
        services.map((marker, index) => (
          <View>
            <MapView.Marker
                key = {index}
                coordinate = {{
                    latitude: parseFloat(marker.Latitude),
                    longitude: parseFloat(marker.Longitude)
                }}
                title = { marker.Title }
                description = { marker.Description }
                // When pressing the little bubble, takes u to the correct screen
                onCalloutPress={() =>
                   navigation.navigate("ServiceInfoScreen", { service: marker })
                }
            />
          </View>
        ))
    }
    </MapView>
  );
})

const styles = StyleSheet.create({
  map: {
    // ...StyleSheet.absoluteFill,
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

export default ServicesMap;
