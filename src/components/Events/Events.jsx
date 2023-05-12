import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import "./Events.scss";
import CardTitle from "../CardTitle/CardTitle";

function Events({ destinationResult }) {
    //defining event and landmarks results
    const [landmarkResults, setLandmarkResults] = useState([]);

    //two isloaded states for event and landmarks results
    const [isLoadedLandmarks, setIsLoadedLandmarks] = useState(false);

    // defining the options for the request

    //16000 category for the landmarks, we fetch results for the 5 best rated in a circle of 40km radius around given coordinates

  const landmarksOptions = {
    method: "GET",
    url: `https://api.foursquare.com/v3/places/search?ll=${destinationResult.coordinates[0]}%2C${destinationResult.coordinates[1]}&radius=20000&categories=16000&fields=rating%2Cdescription%2Clocation%2Cfsq_id%2Cname%2Ctel%2Cphotos%2Cstats%2Cwebsite&sort=POPULARITY&limit=5`,
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
                //first letter into uppercase
                .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                  letter.toUpperCase()
                )
                .replace(/\\u0026/g, "&")
                .replace(/\\u00e9s/g, "és"),
            },
          };
        });
        setLandmarkResults(temporaryResults);
        setIsLoadedLandmarks(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [destinationResult]);

    if (isLoadedLandmarks) {
        return (
            <div className="events-container" id="events">
                <CardTitle title="À découvrir" icon="ticket" />
                {landmarkResults && (
                    <div className="landmarks">
                        <h3 className="landmarks-title">Les endroits préférés des internautes</h3>
                        <div className="landmarks-list">
                            {landmarkResults.map((landmark) => (
                                <div
                                    key={landmark.fsq_id}
                                    className={`landmark-displayed ${landmark.website ? "website-included" : ""}`}
                                    onClick={() => {
                                        landmark.website && window.open(landmark.website, "_blank");
                                    }}>
                                    {landmark.photos && landmark.photos[0] ? <img src={`${landmark.photos[0].prefix}300x300${landmark.photos[0].suffix}`} alt="landmark" /> : <img src="../../assets/Events/landmark.jpeg" alt="landmark" />}
                                    <div id="landmark-name-location-rating">
                                        <h3>{landmark.name}</h3>
                                        <p>{landmark.location && landmark.location.formatted_address}</p>
                                        <div id="landmark-rating-total-ratings">
                                            {landmark.rating && <StarRatings rating={landmark.rating / 2} starRatedColor="#0d9488" numberOfStars={5} name="rating" starDimension="20px" starSpacing="1px" />}
                                            {landmark.stats && (
                                                <p>
                                                    <i className="bi bi-hand-thumbs-up" /> {landmark.stats.total_ratings}
                                                </p>
                                            )}
                                        </div>
                                        {/* if contains website, displays button */}
                                        {landmark.website && (
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

export default Events;
