import React, { useState, useEffect } from "react";
import "./Events.scss";
import axios from "axios";

function Events() {
  //coordinates of Toulouse city center
  const coordinates = [43.6043, 1.4437];

  //defining restaurant and hotels results
  const [restaurantResults, setRestaurantResults] = useState([]);
  const [hotelResults, setHotelResults] = useState([]);

  // defining the options for the request

  //13065 category is for restaurants, 19014 for the hotels, we fetch results for the 5 best rated in a circle of 5km radius around given coordinates

  const restaurantsOptions = {
    method: "GET",

    url: `https://api.foursquare.com/v3/places/search?ll=${coordinates[0]}%2C${coordinates[1]}&radius=5000&categories=13065&sort=RATING&limit=5`,
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_APP_FOURSQUARE_API_KEY,
    },
  };

  const hotelsOptions = {
    method: "GET",
    url: `https://api.foursquare.com/v3/places/search?ll=${coordinates[0]}%2C${coordinates[1]}&radius=5000&categories=19014&sort=RATING&limit=5`,
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_APP_FOURSQUARE_API_KEY,
    },
  };

  //fetching the results from the API
  useEffect(() => {
    axios
      .request(restaurantsOptions)
      .then(function (response) {
        setRestaurantResults(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .request(hotelsOptions)
      .then(function (response) {
        setHotelResults(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div className="events-container">
      <div className="restaurants">
        <h2>Restaurants</h2>
        <div className="restaurants-list">
          {restaurantResults.map((restaurant) => (
            <div key={restaurant.fsq_id} className="restaurant-displayed">
              <p>{restaurant.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="hostels">
        <h2>Hotels</h2>
        <div className="hostels-list">
          {hotelResults.map((hotel) => (
            <div key={hotel.fsq_id} className="hotel-displayed">
              <p>{hotel.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
