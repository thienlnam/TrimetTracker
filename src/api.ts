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