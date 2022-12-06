import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDimensions } from '@react-native-community/hooks'
import { GOOGLE_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const DestinationSearch = ({onDestinationSelected}: any) => {


    const [isExpanded, setIsExpanded] = useState(false);
    const [destination, setDestination] = useState('');

    const openPopup = () => {
        setIsExpanded(true);
        console.log("Open popup", GOOGLE_API_KEY);
    }

    const onSelect = (data: any, details: any) => {
        console.log("onSelect", data, details);
        onDestinationSelected(data);
    }

    const key = GOOGLE_API_KEY;
    return (
        <GooglePlacesAutocomplete
            query={{
                key: GOOGLE_API_KEY,
                language: 'en', // language of the results
                components: 'country:us',
            }}
            placeholder='Search'
            onPress={(data, details) => onSelect(data, details)}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no results')}
            listEmptyComponent={() => (
              <View style={{flex: 1}}>
                <Text>No results were found</Text>
              </View>
            )}
            styles={{
                container: {
                  flex: 0,
                },
                description: {
                  color: '#000',
                  fontSize: 16,
                },
                predefinedPlacesDescription: {
                  color: '#3caf50',
                },
              }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
});

export default DestinationSearch;