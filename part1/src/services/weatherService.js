import axios from "axios";



const getGeoLocation = async(capitalCity) => {
     const geoCodeURL =  `https://geocoding-api.open-meteo.com/v1/search?name=${capitalCity}&count=10&language=en&format=json`;
     const geocode = await axios.get(geoCodeURL);
     const { lat, long } = geocode.data.results[0];
     return { lat, long };
}

const getTempInfo = async({lat, long}) => {
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    const weather = await axios.get(weatherURL);
    return weather
}


export default {
    getGeoLocation, getTempInfo
}