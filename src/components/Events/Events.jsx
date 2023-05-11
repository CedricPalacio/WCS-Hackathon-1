import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import "./Events.scss";

function Events({ destinationResult }) {
  console.log(destinationResult);
  //defining event and landmarks results
  const [landmarkResults, setLandmarkResults] = useState([]);

  //two isloaded states for event and landmarks results
  const [isLoadedLandmarks, setIsLoadedLandmarks] = useState(false);

  // defining the options for the request

  //16000 category for the landmarks, we fetch results for the 5 best rated in a circle of 20km radius around given coordinates

  const landmarksOptions = {
    method: "GET",
    url: `https://api.foursquare.com/v3/places/search?ll=${destinationResult.coordinates[0]}%2C${destinationResult.coordinates[1]}&radius=20000&categories=16000&fields=rating%2Cdescription%2Clocation%2Cfsq_id%2Cname%2Ctel%2Cphotos%2Cstats&sort=RATING&limit=5`,
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_APP_FOURSQUARE_API_KEY,
    },
  };

  useEffect(() => {
    axios
      .request(landmarksOptions)
      .then(function (response) {
        const temporaryResults = response.data.results.map((landmark) => {
          return {
            ...landmark,
            location: {
              ...landmark.location,
              formatted_address: landmark.location.formatted_address
                .replace(/\\u0026/g, "&")
                .replace(/\\u00e9s/g, "és"),
            },
          };
        });
        console.log(temporaryResults);
        setLandmarkResults(temporaryResults);
        setIsLoadedLandmarks(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  if (isLoadedLandmarks) {
    return (
      <div className="events-container" id="events">
        <h2 id="event-title">A découvrir</h2>
        {landmarkResults && (
          <div className="landmarks">
            <h2>Les endroits préférés des internautes</h2>
            <div className="landmarks-list">
              {landmarkResults.map((landmark) => (
                <div key={landmark.fsq_id} className="landmark-displayed">
                  {landmark.photos && landmark.photos[0] ? (
                    <img
                      src={`${landmark.photos[0].prefix}300x300${landmark.photos[0].suffix}`}
                      alt="landmark"
                    />
                  ) : (
                    <img
                      src="../../assets/Events/landmark.jpeg"
                      alt="landmark"
                    />
                  )}
                  <div id="landmark-name-location-rating">
                    <h3>{landmark.name}</h3>
                    <p>
                      {landmark.location && landmark.location.formatted_address}
                    </p>
                    <div id="landmark-rating-total-ratings">
                      {landmark.rating && (
                        <StarRatings
                          rating={landmark.rating / 2}
                          starRatedColor="#f8ce0b"
                          numberOfStars={5}
                          name="rating"
                          starDimension="20px"
                          starSpacing="1px"
                        />
                      )}
                      <p>{landmark.stats && landmark.stats.total_ratings}</p>
                    </div>
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

export default Events;
