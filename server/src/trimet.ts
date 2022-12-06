import { Console } from 'console';
import fs from 'fs';
import path from 'path';

export const getVehicles = async () => {
    const response = await fetch(`https://developer.trimet.org/ws/v2/vehicles?appID=${process.env.TRIMET_APP_ID}`);
    const data = await response.json();
    return data.resultSet.vehicle;
}

export const getStops = async () => {
    return await new Promise((resolve, reject) => {
        return fs.readFile(path.resolve(__dirname, './trimetGTFS/stops.txt'), (err, data) => {
            if (err) {
                return reject(err);
            }
    
            // stop_id,stop_code,stop_name,tts_stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url,location_type,parent_station,direction,position
            const stops = data.toString().split('\n');
         
            // Remove the header values
            stops.shift();
    
            const stopsData = stops.map(stop => {
                // Some of the stop descriptions have commas in them, so this regex will split the string on commas, but only if they are not inside of quotes
                // https://stackoverflow.com/a/53774647
                const stopData = stop.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

                // If the stopdata[0] contains landmarks, we want to remove them from the stop data for now
                // They have a different format, and we're not sure what they are used for right now
                if (stopData[0].includes('landmark')) {
                    return null;
                }
                
                return {
                    stop_id: stopData[0],
                    stop_code: stopData[1],
                    stop_name: stopData[2],
                    tts_stop_name: stopData[3],
                    stop_desc: stopData[4],
                    stop_lat: Number(stopData[5]),
                    stop_lon: Number(stopData[6]),
                    zone_id: stopData[7],
                    stop_url: stopData[8],
                    location_type: stopData[9],
                    parent_station: stopData[10],
                    direction: stopData[11],
                    position: stopData[12]
                }
            });

            // Remove any null values
            const filteredStops = stopsData.filter(stop => stop !== null);
    
            return resolve(filteredStops);
        });
    });
}
