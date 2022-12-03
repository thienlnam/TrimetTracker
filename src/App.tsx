import React, {useEffect, useState} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import MapView from 'react-native-maps';
import RNPermissions, {NotificationOption, Permission, PERMISSIONS} from 'react-native-permissions';
import {requestLocationPermission, getLocation} from './LocationUtils';
import Geolocation from 'react-native-geolocation-service';

const App = () => {

    useEffect(() => {
        requestLocationPermission();
        Geolocation.getCurrentPosition(
            (position) => {
                setLocation(position);
            },
            (error) => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        );
    }, []);

    const [location, setLocation] = useState({
        coords: {
            latitude: 0,
            longitude: 0,
        },
    });


    if (location.coords.latitude === 0 || location.coords.longitude === 0) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    } else {
        console.log('What are the coordinates', location.coords);
        return (
            <MapView
                style={{flex: 1}}
                region={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
      );
    }

};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
