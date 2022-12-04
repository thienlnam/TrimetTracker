import {StyleSheet, View, Text, Button, PermissionsAndroid} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

export const requestLocationPermission = async () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
        console.log(result);
    });
}

export const getLocation = () => {
    
    let position = {};
    Geolocation.getCurrentPosition(
        (position) => {
            position = position;
        },
        (error) => {
            console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
    );

    return position;
  };