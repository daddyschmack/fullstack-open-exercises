import { useState, useEffect } from "react";
import weatherService from "../services/weatherService.js";

const CurrentWeather = ({ capitalInfo }) => {
   const [current, setCurrent] = useState(null);
   const lat = capitalInfo.latlng[0]
   const long = capitalInfo.latlng[1]

   useEffect(() => {
       // 1. Define the async function inside the effect
       const fetchWeather = async () => {
           try {
              //const { latitude, longitude } = await weatherService.getGeoLocation(capitalCity);
              const weather = await weatherService.getTempInfo({ lat, long });
               
               // 2. Save the result to local state
               setCurrent(weather.data.current);
           } catch (error) {
               console.error("Failed to fetch weather", error);
           }
       };

       // 3. Immediately call it!
       if (capitalInfo) {
           fetchWeather();
       }
   }, [capitalInfo]); // Re-run if the city changes

   // Don't try to render the HTML until the data has successfully arrived
   if (!current) return <div>Loading weather...</div>;

   return (
        <article>
            <dl>
                <dt>Time:</dt>
                <dd>{current.time}</dd>
                <dt>Interval:</dt>
                <dd>{current.interval}</dd>
                <dt>Temperature:</dt>
                <dd>{current.temperature_2m}</dd>
                <dt>Wind Speed:</dt>
                <dd>{current.wind_speed_10m}</dd>
            </dl>
        </article>
   )
}

export default CurrentWeather