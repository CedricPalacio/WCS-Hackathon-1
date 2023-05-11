import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Weather() {
  const [cityWeather, setCityWeather] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "http://api.weatherapi.com/v1/forecast.json?key=5d427f4d1d0e43b1b1d92206231105&q=Toulouse&days=5&aqi=no&alerts=no"
      )
      .then((response) => {
        setCityWeather(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!isLoading) {
    console.log(cityWeather);
  }
  if (!isLoading) {
    return (
      <div>
        {/* <h2>{cityWeather.location.name}</h2>
        <h3>
          {cityWeather.location.region}, {cityWeather.location.country}
        </h3> */}
        <p>Ciel : {cityWeather.current.condition.text}</p>
        <p>
          Température actuelle : {cityWeather.current.temp_c}°C /{" "}
          {cityWeather.current.temp_f}°F
        </p>
        <p>
          "Chance" de pluie :{" "}
          {cityWeather.forecast.forecastday[0].day.daily_chance_of_rain}{" "}
        </p>
        <p>
          Température en matinée :{" "}
          {cityWeather.forecast.forecastday[0].hour[9].temp_c}°C /{" "}
          {cityWeather.forecast.forecastday[0].hour[9].temp_f}°F
        </p>
        <p>
          "Chance" de pluie en matinée:{" "}
          {cityWeather.forecast.forecastday[0].hour[9].chance_of_rain}{" "}
        </p>

        <p>
          Température en journée :{" "}
          {cityWeather.forecast.forecastday[0].hour[15].temp_c}°C /{" "}
          {cityWeather.forecast.forecastday[0].hour[15].temp_f}°F
        </p>
        <p>
          "Chance" de pluie en journée:{" "}
          {cityWeather.forecast.forecastday[0].hour[15].chance_of_rain}{" "}
        </p>
        <p>
          Température en soirée :{" "}
          {cityWeather.forecast.forecastday[0].hour[23].temp_c}°C /{" "}
          {cityWeather.forecast.forecastday[0].hour[23].temp_f}°F
        </p>
        <p>
          "Chance" de pluie en soirée:{" "}
          {cityWeather.forecast.forecastday[0].hour[23].chance_of_rain}{" "}
        </p>
        <p>Vent : {cityWeather.current.wind_mph}</p>
        <p>
          Lever du soleil :{cityWeather.forecast.forecastday[0].astro.sunrise}
        </p>
        <p>
          Coucher du soleil :{cityWeather.forecast.forecastday[0].astro.sunset}
        </p>
      </div>
    );
  }
}

export default Weather;
{
  /* <img src={cityWeather.current.condition.icon} alt="icon weather" /> */
}
{
  /* attention à convertir le mph (miles per hour) en km/h (*1.609) */
}
