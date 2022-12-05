export const getVehicles = async () => {
    return fetch('localhost:3000/vehicles')
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.error('Unable to get vehicles: ', error);
        });
};

export const getStops = async () => {
    return fetch('localhost:3000/stops')
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.error('Unable to get stops: ', error);
        });
}