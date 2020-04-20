

const searchPlaces = (country, city, street) => {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };
    return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${country}%20${city}%20${street}.json?limit=1&access_token=${process.env.REACT_APP_MAPBOX_KEY}`, requestOptions)
        .then((response) => {
            return response.json();
        })
}


export const mapboxService = {
    searchPlaces
}