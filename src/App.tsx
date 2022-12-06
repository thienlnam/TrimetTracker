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
import { Marker } from 'react-native-maps';
import { TrimetVehicle, Region, TrimetStop } from './types/types';
import DestinationSearch from './components/DestinationSearch';
import Geolocation from '@react-native-community/geolocation';



const App = () => {

    useEffect(() => {
        requestLocationPermission();
        Geolocation.getCurrentPosition(
            (position) => {
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
            (error) => console.error(error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        fetch('http://localhost:3000/vehicles')
            .then((response) => response.json())
            .then((json) => {
                setVehicles(json);
            }
        )
        .catch((error) => console.error(error));

        fetch('http://localhost:3000/stops')
            .then((response) => response.json())
            .then((json) => {
                setStops(json);
            }
        )
        .catch((error) => console.error(error));

    }, []);

    const [location, setLocation] = useState({
        latitude: 45,
        longitude: -122,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const [desiredDestination, setDesiredDestination] = useState('');

    const [vehicles, setVehicles] = useState([]);
    const [stops, setStops] = useState([]);

    const onRegionChange = (region: Region) => {
        console.log(region);
    };

    const mapRef = useRef<MapView>(null);

    const vehicleMarkers = vehicles.map((vehicle: TrimetVehicle) => {
        return (
            <Marker
                key={vehicle.vehicleID}
                coordinate={{latitude: vehicle.latitude, longitude: vehicle.longitude}}
                title={vehicle.routeNumber.toString()}
                description={vehicle.signMessageLong}
            />
        );
    });

    const stopMarkers = stops.map((stop: TrimetStop) => {
        return (
            <Marker
                key={stop.stop_id}
                coordinate={{latitude: stop.stop_lat, longitude: stop.stop_lon}}
                title={stop.stop_name}
                description={stop.stop_desc}
            />
        );
    });

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFillObject}
                region={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: location.latitudeDelta,
                    longitudeDelta: location.longitudeDelta,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                onRegionChangeComplete={onRegionChange}
            >

              
            </MapView>
            <View style={{ position: 'absolute', top: 50, left: 0, right: 0, width: '100%' }}>
                <DestinationSearch 
                    onDestinationSelected={setDesiredDestination}
                />
            </View>
        </View>
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
