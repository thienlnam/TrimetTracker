
export const getVehicles = async () => {
    return await fetch(`https://developer.trimet.org/ws/v2/vehicles?appID=${process.env.TRIMET_APP_ID}`)
    .then((response) => response.json())
}
