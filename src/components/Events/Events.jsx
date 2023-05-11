import React, { useState, useEffect } from "react";
import "./Events.scss";
import axios from "axios";

function Events() {
  //coordinates of Toulouse city center
  const coordinates = [43.6043, 1.4437];

  //defining event and landmarks results
  const [eventResults, setEventResults] = useState([]);
  const [landmarkResults, setLandmark] = useState([]);

  //two isloaded states for event and landmarks results
  const [isLoadedEvents, setIsLoadedEvents] = useState(false);
  const [isLoadedLandmarks, setIsLoadedLandmarks] = useState(false);

  // defining the options for the request

  //14000 category is for events, 16000 for the landmarks, we fetch results for the 5 best rated in a circle of 5km radius around given coordinates

  const eventsOptions = {
    method: "GET",

    url: `https://api.foursquare.com/v3/places/search?ll=${coordinates[0]}%2C${coordinates[1]}&radius=20000&categories=14000&fields=rating%2Cdescription%2Clocation%2Cfsq_id%2Cname%2Ctel%2Cphotos&sort=RATING&limit=5`,
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_APP_FOURSQUARE_API_KEY,
    },
  };

  const landmarksOptions = {
    method: "GET",
    url: `https://api.foursquare.com/v3/places/search?ll=${coordinates[0]}%2C${coordinates[1]}&radius=20000&categories=16000&fields=rating%2Cdescription%2Clocation%2Cfsq_id%2Cname%2Ctel%2Cphotos&sort=RATING&limit=5`,
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_APP_FOURSQUARE_API_KEY,
    },
  };

  //fetching the results from the API
  useEffect(() => {
    axios
      .request(eventsOptions)
      .then(function (response) {
        const temporaryResults = response.data.results.map((event) => {
          return {
            ...event,
            location: {
              ...event.location,
              formatted_address: event.location.formatted_address
                .replace(/\\u0026/g, "&")
                .replace(/\\u00e9s/g, "és"),
            },
          };
        });
        setEventResults(temporaryResults);
        setIsLoadedEvents(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

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
        setLandmark(temporaryResults);
        setIsLoadedLandmarks(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    isLoadedLandmarks &&
    isLoadedEvents && (
      <div className="events-container">
        <div className="events">
          <h2>Events</h2>
          <div className="events-list">
            {eventResults.map((event) => (
              <div key={event.fsq_id} className="event-displayed">
                <p>{event.name}</p>
                <p>{event.location.formatted_address}</p>
                <p>{event.description}</p>
                <p>{event.tel}</p>
                <p>{event.rating}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hostels">
          <h2>A voir</h2>
          <div className="hostels-list">
            {landmarkResults.map((landmark) => (
              <div key={landmark.fsq_id} className="landmark-displayed">
                <p>{landmark.name}</p>
                <p>{landmark.location.formatted_address}</p>
                <p>{landmark.description}</p>
                <p>{landmark.rating}</p>
                <img
                  src={`${landmark.photos[0].prefix}100x100${landmark.photos[0].suffix}`}
                  alt="landmark"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Events;
