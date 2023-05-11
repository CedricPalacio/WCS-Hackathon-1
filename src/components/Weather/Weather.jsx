import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.scss";

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
    const speedWindKmH = (windMph) => {
      let speedWind = 0;
      speedWind = Math.round(windMph * 1.609);
      return speedWind;
    };
    return (
      <div id="weather">
        <h2>Météo {cityWeather.location.name}</h2>
        <h3>
          {cityWeather.location.region}, {cityWeather.location.country}
        </h3>
        <div className="weatherNowCity">
          <h4>Météo Actuelle</h4>
          <img src={cityWeather.current.condition.icon} alt="icon weather" />
          <div className="tempRainWindNow">
            <p>
              Température actuelle : {cityWeather.current.temp_c}°C /{" "}
              {cityWeather.current.temp_f}°F
            </p>
            <p>
              Précipitations :{" "}
              {cityWeather.forecast.forecastday[0].day.daily_chance_of_rain}%{" "}
            </p>
            <p>Vent : {speedWindKmH(cityWeather.current.wind_mph)} km/h </p>
          </div>
          <div className="sunriseSunsetDay">
            <p>
              Lever du soleil :
              {cityWeather.forecast.forecastday[0].astro.sunrise}
            </p>
            <p>
              Coucher du soleil :
              {cityWeather.forecast.forecastday[0].astro.sunset}
            </p>
          </div>
        </div>
        <div className="weatherDayCity">
          <h4>Ce matin</h4>
          <p>
            Température : {cityWeather.forecast.forecastday[0].hour[9].temp_c}°C
            / {cityWeather.forecast.forecastday[0].hour[9].temp_f}°F
          </p>
          <p>
            Précipitations :{" "}
            {cityWeather.forecast.forecastday[0].hour[9].chance_of_rain}%{" "}
          </p>
        </div>
        <div className="weatherDayCity">
          <h4>Cet après-midi</h4>
          <p>
            Température : {cityWeather.forecast.forecastday[0].hour[15].temp_c}
            °C / {cityWeather.forecast.forecastday[0].hour[15].temp_f}°F
          </p>
          <p>
            Précipitations :{" "}
            {cityWeather.forecast.forecastday[0].hour[15].chance_of_rain}%{" "}
          </p>
        </div>
        <div className="weatherDayCity">
          <h4>Ce soir</h4>
          <p>
            Température : {cityWeather.forecast.forecastday[0].hour[23].temp_c}
            °C / {cityWeather.forecast.forecastday[0].hour[23].temp_f}°F
          </p>
          <p>
            Précipitations :{" "}
            {cityWeather.forecast.forecastday[0].hour[23].chance_of_rain}%{" "}
          </p>
        </div>
        <div className="weatherNextDay">
          <div>
            <h4> Météo {cityWeather.forecast.forecastday[1].date}</h4>
            <img
              src={cityWeather.forecast.forecastday[1].day.condition.icon}
              alt=""
            />
            <p>T° min :{cityWeather.forecast.forecastday[1].day.mintemp_c}°C</p>
            <p>T° max :{cityWeather.forecast.forecastday[1].day.maxtemp_c}°C</p>
            <p>
              Précipitations :{" "}
              {cityWeather.forecast.forecastday[1].day.daily_chance_of_rain}%
            </p>
            <p>
              Vent :{" "}
              {speedWindKmH(
                cityWeather.forecast.forecastday[1].day.maxwind_mph
              )}
              km/h{" "}
            </p>
            <p>
              Lever du soleil :{" "}
              {cityWeather.forecast.forecastday[1].astro.sunrise}
            </p>
            <p>
              Coucher du soleil :
              {cityWeather.forecast.forecastday[1].astro.sunset}
            </p>
          </div>
          <div>
            <h4> Météo {cityWeather.forecast.forecastday[2].date}</h4>
            <img
              src={cityWeather.forecast.forecastday[2].day.condition.icon}
              alt=""
            />
            <p>T° min :{cityWeather.forecast.forecastday[2].day.mintemp_c}°C</p>
            <p>T° max :{cityWeather.forecast.forecastday[2].day.maxtemp_c}°C</p>
            <p>
              Précipitations :{" "}
              {cityWeather.forecast.forecastday[2].day.daily_chance_of_rain}%
            </p>
            <p>
              Vent :{" "}
              {speedWindKmH(
                cityWeather.forecast.forecastday[2].day.maxwind_mph
              )}
              km/h{" "}
            </p>
            <p>
              Lever du soleil :{" "}
              {cityWeather.forecast.forecastday[2].astro.sunrise}
            </p>
            <p>
              Coucher du soleil :
              {cityWeather.forecast.forecastday[2].astro.sunset}
            </p>
          </div>
          <div>
            <h4> Météo {cityWeather.forecast.forecastday[3].date}</h4>
            <img
              src={cityWeather.forecast.forecastday[3].day.condition.icon}
              alt=""
            />
            <p>T° min :{cityWeather.forecast.forecastday[3].day.mintemp_c}°C</p>
            <p>T° max :{cityWeather.forecast.forecastday[3].day.maxtemp_c}°C</p>
            <p>
              Précipitations :{" "}
              {cityWeather.forecast.forecastday[3].day.daily_chance_of_rain}%
            </p>
            <p>
              Vent :{" "}
              {speedWindKmH(
                cityWeather.forecast.forecastday[3].day.maxwind_mph
              )}
              km/h{" "}
            </p>
            <p>
              Lever du soleil :{" "}
              {cityWeather.forecast.forecastday[3].astro.sunrise}
            </p>
            <p>
              Coucher du soleil :
              {cityWeather.forecast.forecastday[3].astro.sunset}
            </p>
          </div>
          <div>
            <h4> Météo {cityWeather.forecast.forecastday[4].date}</h4>
            <img
              src={cityWeather.forecast.forecastday[4].day.condition.icon}
              alt=""
            />
            <p>T° min :{cityWeather.forecast.forecastday[4].day.mintemp_c}°C</p>
            <p>T° max :{cityWeather.forecast.forecastday[4].day.maxtemp_c}°C</p>
            <p>
              Précipitations :{" "}
              {cityWeather.forecast.forecastday[4].day.daily_chance_of_rain}%
            </p>
            <p>
              Vent :{" "}
              {speedWindKmH(
                cityWeather.forecast.forecastday[4].day.maxwind_mph
              )}
              km/h{" "}
            </p>
            <p>
              Lever du soleil :{" "}
              {cityWeather.forecast.forecastday[4].astro.sunrise}
            </p>
            <p>
              Coucher du soleil :
              {cityWeather.forecast.forecastday[4].astro.sunset}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
{
  /*  */
}
