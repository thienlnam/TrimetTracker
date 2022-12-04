
export const getVehicles = async () => {
    const response = await fetch(`https://developer.trimet.org/ws/v2/vehicles?appID=${process.env.TRIMET_APP_ID}`);
    const data = await response.json();
    return data.resultSet.vehicle;
}
