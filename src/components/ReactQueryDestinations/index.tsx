import React, { useState } from "react";
import { useQuery } from "react-query";
import { FlightType } from "../../types/flight";
import FlightCard from "../FlightCard";
import { addFlights, fetchData, removeFlights } from "./index.logic";

function ReactQueryDestinations() {
  const [favourites, setFavourites] = useState<FlightType[]>([]);

  const {
    data: flights,
    isLoading,
    isFetching,
  } = useQuery("locations", fetchData);

  if (isLoading) return <p>Loading react query...</p>;
  if (isFetching) return <p>Fetching...</p>;

  return (
    <>
      <FlightCard title="Trending Destination">
        {flights.length &&
          flights?.map((item: FlightType) => (
            <div
              key={item.id}
              className="destination"
              onClick={() => addFlights(item, favourites, setFavourites)}
            >
              <li>{item.address.city}</li>
              <button>+</button>
            </div>
          ))}
      </FlightCard>
      <FlightCard title="My Destination List">
        {favourites.length ? (
          favourites?.map((item) => (
            <div
              key={item.id}
              className="destination"
              onClick={() => removeFlights(item, favourites, setFavourites)}
            >
              <li>{item.address.city}</li>
              <button>-</button>
            </div>
          ))
        ) : (
          <p>Nothing added to your list yet</p>
        )}
      </FlightCard>
    </>
  );
}

export default ReactQueryDestinations;
