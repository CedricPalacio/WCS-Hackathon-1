import React, { useState, useEffect } from "react";
import "./Booking.scss";
import axios from "axios";
import StarRatings from "react-star-ratings";
import CardTitle from "../CardTitle/CardTitle";

function Booking({ destinationResult }) {
  //defining restaurant and hotels results
  const [restaurantResults, setRestaurantResults] = useState([]);
  const [hotelResults, setHotelResults] = useState([]);

  //two isloaded states for restaurant and hotels results
  const [isLoadedRestaurants, setIsLoadedRestaurants] = useState(false);
  const [isLoadedHotels, setIsLoadedHotels] = useState(false);

  // defining the options for the request

  //13065 category is for restaurants, 19014 for the hotels, we fetch results for the 5 best rated in a circle of 5km radius around given coordinates

  const restaurantsOptions = {
    method: "GET",

    url: `https://api.foursquare.com/v3/places/search?ll=${destinationResult.coordinates[0]}%2C${destinationResult.coordinates[1]}&radius=5000&categories=13065&fields=rating%2Cdescription%2Clocation%2Cfsq_id%2Cname%2Ctel%2Cphotos%2Cstats%2Cwebsite&sort=RATING&limit=5`,
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_APP_FOURSQUARE_API_KEY,
    },
  };

  const hotelsOptions = {
    method: "GET",
    url: `https://api.foursquare.com/v3/places/search?ll=${destinationResult.coordinates[0]}%2C${destinationResult.coordinates[1]}&radius=5000&categories=19014&fields=rating%2Cdescription%2Clocation%2Cfsq_id%2Cname%2Ctel%2Cphotos%2Cstats%2Cwebsite&sort=POPULARITY&limit=5`,
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_APP_FOURSQUARE_API_KEY,
    },
  };

  //fetching the results from the API and removing the unicode characters from the address
  useEffect(() => {
    axios
      .request(restaurantsOptions)
      .then(function (response) {
        const temporaryResults = response.data.results.map((restaurant) => {
          // removing
          return {
            ...restaurant,
            location: {
              ...restaurant.location,
              formatted_address: restaurant.location.formatted_address
                .replace(/\\u0026/g, "&")
                .replace(/\\u00e9s/g, "és"),
            },
          };
        });
        setRestaurantResults(temporaryResults);
        setIsLoadedRestaurants(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [destinationResult]);

  useEffect(() => {
    axios
      .request(hotelsOptions)
      .then(function (response) {
        const temporaryResults = response.data.results.map((hotel) => {
          return {
            ...hotel,
            location: {
              ...hotel.location,
              formatted_address: hotel.location.formatted_address
                .replace(/\\u0026/g, "&")
                .replace(/\\u00e9s/g, "és"),
            },
          };
        });
        setHotelResults(temporaryResults);
        setIsLoadedHotels(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [destinationResult]);

  if (isLoadedHotels && isLoadedRestaurants) {
    return (
      <div className="booking-container" id="booking">
        <CardTitle title="Où manger / dormir ?" icon="shop-window" />
        <div id="restaurants-hotels-buttons">
          {/* two buttons, one for restaurants, one for hotels. if restaurants button is clicked, hotels classname div is not displayed. if hotels button is clicked, restaurants classname div is not displayed */}
          <button
            className="restaurants-button active"
            onClick={() => {
              document.querySelector(".restaurants").classList.remove("hidden");
              document.querySelector(".hotels").classList.add("hidden");
              document
                .querySelector(".restaurants-button")
                .classList.add("active");
              document
                .querySelector(".hotels-button")
                .classList.remove("active");
            }}
          >
            Restaurants
          </button>
          <button
            className="hotels-button"
            onClick={() => {
              document.querySelector(".restaurants").classList.add("hidden");
              document.querySelector(".hotels").classList.remove("hidden");
              document
                .querySelector(".restaurants-button")
                .classList.remove("active");
              document.querySelector(".hotels-button").classList.add("active");
            }}
          >
            Hôtels
          </button>
        </div>
        {restaurantResults && (
          <div className="restaurants">
            <div className="restaurants-list">
              {restaurantResults.map((restaurant) => (
                <div
                  key={restaurant.fsq_id}
                  // if restaurant has a website, className is restaurant-displayed website-included, else it is restaurant-displayed
                  className={`restaurant-displayed ${
                    restaurant.website ? "website-included" : ""
                  }`}
                  onClick={() => {
                    restaurant.website &&
                      window.open(restaurant.website, "_blank");
                  }}
                >
                  {restaurant.photos && restaurant.photos[0] ? (
                    <img
                      src={`${restaurant.photos[0].prefix}300x300${restaurant.photos[0].suffix}`}
                      alt="restaurant"
                    />
                  ) : (
                    <img
                      src="../../assets/Booking/restaurant.jpeg"
                      alt="restaurant"
                    />
                  )}
                  <div id="restaurant-name-location-rating">
                    <h3>{restaurant.name}</h3>
                    <p>
                      {restaurant.location &&
                        restaurant.location.formatted_address}
                    </p>
                    <div id="restaurant-rating-total-ratings">
                      {restaurant.rating && (
                        <StarRatings
                          rating={restaurant.rating / 2}
                          starRatedColor="#0d9488"
                          numberOfStars={5}
                          name="rating"
                          starDimension="20px"
                          starSpacing="1px"
                        />
                      )}
                      {restaurant.stats && (
                        <p>
                          <i className="bi bi-hand-thumbs-up" />{" "}
                          {restaurant.stats.total_ratings}
                        </p>
                      )}
                    </div>
                    {restaurant.website && (
                      <button className="website-button">
                        En savoir plus
                        <i className="bi bi-chevron-right" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {hotelResults && (
          <div className="hotels hidden">
            <div className="hotels-list">
              {hotelResults.map((hotel) => (
                <div
                  key={hotel.fsq_id}
                  className={`hotel-displayed ${
                    hotel.website ? "website-included" : ""
                  }`}
                  onClick={() => {
                    hotel.website && window.open(hotel.website, "_blank");
                  }}
                >
                  {hotel.photos && hotel.photos[0] ? (
                    <img
                      src={`${hotel.photos[0].prefix}300x300${hotel.photos[0].suffix}`}
                      alt="hotel"
                    />
                  ) : (
                    <img src="../../assets/Booking/hotel.jpeg" alt="hotel" />
                  )}
                  <div id="hotel-name-location-rating">
                    <h3>{hotel.name}</h3>
                    <p>{hotel.location && hotel.location.formatted_address}</p>
                    <div id="hotel-rating-total-ratings">
                      {hotel.rating && (
                        <StarRatings
                          rating={hotel.rating / 2}
                          starRatedColor="#0d9488"
                          numberOfStars={5}
                          name="rating"
                          starDimension="20px"
                          starSpacing="1px"
                        />
                      )}
                      {hotel.stats && (
                        <p>
                          <i className="bi bi-hand-thumbs-up" />{" "}
                          {hotel.stats.total_ratings}
                        </p>
                      )}
                    </div>
                    {hotel.website && (
                      <button className="website-button">
                        En savoir plus
                        <i className="bi bi-chevron-right" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
}

export default Booking;
