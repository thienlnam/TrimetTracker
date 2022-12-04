import React, {useEffect, useState, useRef} from 'react';
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
import { Marker } from 'react-native-maps';

const App = () => {

    useEffect(() => {
        requestLocationPermission();
        Geolocation.getCurrentPosition(
            (position) => {
                // Add in custom position for a random portland address right now since it seems to be taking simulator location from SF
                const region = {
                    //latitude: position.coords.latitude,
                    //longitude: position.coords.longitude,
                    latitude: 45.452493,
                    longitude: -122.745651,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                };
                setLocation(region);
                if (mapRef.current) {
                    mapRef.current.animateToRegion(region, 1000);
                }

            },
            (error) => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        );
    }, []);

    const [location, setLocation] = useState({});

    const mapRef = useRef<MapView>(null);
    
    return (
        <MapView
            ref={mapRef}
            style={{flex: 1}}
            region={{
                latitude: 45.452493,
                longitude: -122.745651,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >

            <Marker
                coordinate={{
                    latitude: 45.452493,
                    longitude: -122.745651,
                }}
                title="Test"
                description="Test"
            />
        </MapView>
    );
    

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
