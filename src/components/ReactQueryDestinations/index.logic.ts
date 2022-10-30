import { FlightType } from "../../types/flight";

export const addFlights = (
  flight: FlightType,
  favourites: FlightType[],
  setFavourites: React.Dispatch<React.SetStateAction<FlightType[]>>
) => {
  if (!favourites.includes(flight)) {
    setFavourites([...favourites, flight]);
  } else {
    setFavourites([...favourites.filter((item) => item !== flight)]);
  }
};

export const removeFlights = (
  flight: FlightType,
  favourites: FlightType[],
  setFavourites: React.Dispatch<React.SetStateAction<FlightType[]>>
) => {
  setFavourites([...favourites.filter((item) => item !== flight)]);
};

export const fetchData = async () => {
  try {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url).then((res) => res.json());
    return response;
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
