import React, { useEffect, useState } from "react";
import { FlightType } from "../../types/flight";
import FlightCard from "../FlightCard";
import toast, { Toaster } from "react-hot-toast";

function Destinations() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<FlightType[]>([]);
  const [favourites, setFavourites] = useState<FlightType[]>([]);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";
    // Allows us to intercept an API request so we can cancel anytime - sending signal in fetch will destroy immediately
    const controller = new AbortController();
    const { signal } = controller;
    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal }).then((res) => res.json());
        setData(response);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            console.log("api request has been cancelled");
          }
          console.log(err.name);
        } else {
          console.log("This is an unknown error");
        }
      }
    };
    fetchData();
    return () => {
      // cleanup the abort controller
      controller.abort();
    };
  }, []);

  const addFlights = (flight: FlightType) => {
    if (!favourites.includes(flight)) {
      toast.success("Added to favourites");
      setFavourites([...favourites, flight]);
    } else {
      toast.success("Removed from favourites");
      setFavourites([...favourites.filter((item) => item !== flight)]);
    }
  };

  const removeFlights = (flight: FlightType) => {
    toast.success("Removed from favourites");
    setFavourites([...favourites.filter((item) => item !== flight)]);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <FlightCard title="Trending Destination">
        {data.length &&
          data?.map((item) => (
            <div
              key={item.id}
              className="destination"
              onClick={() => addFlights(item)}
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
              onClick={() => removeFlights(item)}
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

export default Destinations;
