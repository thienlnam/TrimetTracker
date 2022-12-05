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
                const stopData = stop.split(',');
                
                return {
                    stop_id: stopData[0],
                    stop_code: stopData[1],
                    stop_name: stopData[2],
                    tts_stop_name: stopData[3],
                    stop_desc: stopData[4],
                    stop_lat: stopData[5],
                    stop_lon: stopData[6],
                    zone_id: stopData[7],
                    stop_url: stopData[8],
                    location_type: stopData[9],
                    parent_station: stopData[10],
                    direction: stopData[11],
                    position: stopData[12]
                }
            });
    
            return resolve(stopsData);
        });
    });
}
