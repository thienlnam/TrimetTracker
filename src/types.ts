

// Type for region
export type Region = {
    latitude: number, 
    latitudeDelta: number, 
    longitude: number, 
    longitudeDelta: number
}

/*
"expires": 1670129692230,
                "signMessage": "Blue to Gresham",
                "serviceDate": 1670054400000,
                "loadPercentage": null,
                "latitude": 45.5300508,
                "nextStopSeq": 29,
                "source": "tab",
                "type": "rail",
                "blockID": 9021,
                "signMessageLong": "MAX  Blue Line to Gresham",
                "lastLocID": 8342,
                "nextLocID": 8343,
                "locationInScheduleDay": 74190,
                "newTrip": false,
                "longitude": -122.6544005,
                "direction": 0,
                "inCongestion": null,
                "routeNumber": 100,
                "bearing": 90,
                "garage": "ELMO",
                "tripID": "12023522",
                "delay": -347,
                "extraBlockID": null,
                "messageCode": 1012,
                "lastStopSeq": 28,
                "vehicleID": 102,
                "time": 1670128937538,
                "offRoute": false
                */
// Type for vehicle

export type TrimetVehicle = {
    expires: number,
    signMessage: string,
    serviceDate: number,
    loadPercentage: number | null,
    latitude: number,
    nextStopSeq: number,
    source: string,
    type: string,
    blockID: number,
    signMessageLong: string,
    lastLocID: number,
    nextLocID: number,
    locationInScheduleDay: number,
    newTrip: boolean,
    longitude: number,
    direction: number,
    inCongestion: boolean | null,
    routeNumber: number,
    bearing: number,
    garage: string,
    tripID: string,
    delay: number,
    extraBlockID: number | null,
    messageCode: number,
    lastStopSeq: number,
    vehicleID: number,
    time: number,
    offRoute: boolean
}

export type TrimetStop = {
    stop_id: string,
    stop_code: string,
    stop_name: string,
    tts_stop_name: string,
    stop_desc: string,
    stop_lat: number,
    stop_lon: number,
    zone_id: string,
    stop_url: string,
    location_type: string,
    parent_station: string,
    direction: string,
    position: string
}