import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.scss";

function Weather(destinationResult) {
  const [cityWeather, setCityWeather] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(destinationResult.coordinates[0]);

    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=5d427f4d1d0e43b1b1d92206231105&q=43.61062,1.504072&days=5&aqi=no&alerts=no`
      )
      .then((response) => {
        setCityWeather(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [destinationResult]);

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
          <div className="mainDataWeatherCity">
            <div className="tempRainWindNow">
              <p>Température: {cityWeather.current.temp_c}°C </p>
              <p>
                Précipitations :{" "}
                {cityWeather.forecast.forecastday[0].day.daily_chance_of_rain}%{" "}
              </p>{" "}
              <p>Vent : {speedWindKmH(cityWeather.current.wind_mph)} km/h </p>
            </div>{" "}
            <div className="sunriseSunsetDay">
              <div className="logoTextsunrise">
                <i class="bi bi-sunrise"></i>
                <p>{cityWeather.forecast.forecastday[0].astro.sunrise}</p>
              </div>
              <div className="logoTextsunset">
                <i className="bi bi-sunset"></i>
                <p> {cityWeather.forecast.forecastday[0].astro.sunset}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="weatherAllDaysCity">
          <div className="weatherDayCity">
            <h4>Matinée</h4>
            <div className="iconThermoAndText">
              <i class="bi bi-thermometer-half"></i>
              <p>{cityWeather.forecast.forecastday[0].hour[9].temp_c}</p>
            </div>
            <div className="iconRainAndText">
              <i class="bi bi-umbrella"></i>
              <p>
                {cityWeather.forecast.forecastday[0].hour[9].chance_of_rain}%{" "}
              </p>
            </div>
          </div>
          <div className="weatherDayCity">
            <h4>Après-midi</h4>
            <div className="iconThermoAndText">
              <i class="bi bi-thermometer-half"></i>
              <p>{cityWeather.forecast.forecastday[0].hour[15].temp_c}</p>
            </div>
            <div className="iconRainAndText">
              <i class="bi bi-umbrella"></i>
              <p>
                {cityWeather.forecast.forecastday[0].hour[15].chance_of_rain}%{" "}
              </p>
            </div>
          </div>
          <div className="weatherDayCity">
            <h4>Soirée</h4>
            <div className="iconThermoAndText">
              <i class="bi bi-thermometer-half"></i>
              <p>{cityWeather.forecast.forecastday[0].hour[23].temp_c}</p>
            </div>
            <div className="iconRainAndText">
              <i class="bi bi-umbrella"></i>
              <p>
                {cityWeather.forecast.forecastday[0].hour[23].chance_of_rain}%{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="weatherAllNextDays">
          <h4>Météo des prochains jours</h4>
          <div className="weatherNextDay">
            {/* <h4>
              {" "}
              {cityWeather.forecast.forecastday[1].date
                .split("-")
                .reverse()
                .join("/")}
            </h4> */}
            {/* transform date from "2023-05-12" like into "12/05" */}
            <h4>
              {cityWeather.forecast.forecastday[1].date
                .split("-")
                .reverse()
                .join("/")
                .slice(0, -5)}
            </h4>

            <img
              src={cityWeather.forecast.forecastday[1].day.condition.icon}
              alt=""
            />
            <div className="temperatureMinMax">
              <i class="bi bi-thermometer-half"></i>
              <div className="temMintempMax">
                <p className="tempMin">
                  {cityWeather.forecast.forecastday[1].day.mintemp_c}°C /
                </p>{" "}
                <p className="tempMax">
                  {cityWeather.forecast.forecastday[1].day.maxtemp_c}°C
                </p>
              </div>
            </div>
            <div className="iconRainAndText">
              <i class="bi bi-umbrella"></i>
              <p>
                {cityWeather.forecast.forecastday[1].day.daily_chance_of_rain}%
              </p>
            </div>
            <div className="logoAndTextWind">
              <i class="bi bi-wind"></i>
              <p>
                {speedWindKmH(
                  cityWeather.forecast.forecastday[1].day.maxwind_mph
                )}
                km/h{" "}
              </p>
            </div>
          </div>
          <div className="weatherNextDay">
            <h4>
              {cityWeather.forecast.forecastday[2].date
                .split("-")
                .reverse()
                .join("/")
                .slice(0, -5)}
            </h4>
            <img
              src={cityWeather.forecast.forecastday[2].day.condition.icon}
              alt=""
            />
            <div className="temperatureMinMax">
              <i class="bi bi-thermometer-half"></i>
              <div className="temMintempMax">
                <p className="tempMin">
                  {cityWeather.forecast.forecastday[2].day.mintemp_c}°C /
                </p>{" "}
                <p className="tempMax">
                  {cityWeather.forecast.forecastday[2].day.maxtemp_c}°C
                </p>
              </div>
            </div>
            <div className="iconRainAndText">
              <i class="bi bi-umbrella"></i>
              <p>
                {cityWeather.forecast.forecastday[2].day.daily_chance_of_rain}%
              </p>
            </div>
            <div className="logoAndTextWind">
              <i class="bi bi-wind"></i>
              <p>
                {speedWindKmH(
                  cityWeather.forecast.forecastday[2].day.maxwind_mph
                )}
                km/h{" "}
              </p>
            </div>
          </div>
          <div className="weatherNextDay">
            <h4>
              {cityWeather.forecast.forecastday[3].date
                .split("-")
                .reverse()
                .join("/")
                .slice(0, -5)}
            </h4>
            <img
              src={cityWeather.forecast.forecastday[3].day.condition.icon}
              alt=""
            />
            <div className="temperatureMinMax">
              <i class="bi bi-thermometer-half"></i>
              <div className="temMintempMax">
                <p className="tempMin">
                  {cityWeather.forecast.forecastday[3].day.mintemp_c}°C /
                </p>{" "}
                <p className="tempMax">
                  {cityWeather.forecast.forecastday[3].day.maxtemp_c}°C
                </p>
              </div>
            </div>
            <div className="iconRainAndText">
              <i class="bi bi-umbrella"></i>
              <p>
                {cityWeather.forecast.forecastday[3].day.daily_chance_of_rain}%
              </p>
            </div>
            <div className="logoAndTextWind">
              <i class="bi bi-wind"></i>
              <p>
                {speedWindKmH(
                  cityWeather.forecast.forecastday[3].day.maxwind_mph
                )}
                km/h{" "}
              </p>
            </div>
          </div>
          <div className="weatherNextDay">
            <h4>
              {cityWeather.forecast.forecastday[4].date
                .split("-")
                .reverse()
                .join("/")
                .slice(0, -5)}
            </h4>
            <img
              src={cityWeather.forecast.forecastday[4].day.condition.icon}
              alt=""
            />
            <div className="temperatureMinMax">
              <i class="bi bi-thermometer-half"></i>
              <div className="temMintempMax">
                <p className="tempMin">
                  {cityWeather.forecast.forecastday[4].day.mintemp_c}°C /
                </p>{" "}
                <p className="tempMax">
                  {cityWeather.forecast.forecastday[4].day.maxtemp_c}°C
                </p>
              </div>
            </div>
            <div className="iconRainAndText">
              <i class="bi bi-umbrella"></i>
              <p>
                {cityWeather.forecast.forecastday[4].day.daily_chance_of_rain}%
              </p>
            </div>
            <div className="logoAndTextWind">
              <i class="bi bi-wind"></i>
              <p>
                {speedWindKmH(
                  cityWeather.forecast.forecastday[4].day.maxwind_mph
                )}
                km/h{" "}
              </p>
            </div>
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
