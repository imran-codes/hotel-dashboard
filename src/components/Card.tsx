import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { hotelsCollection } from "../lib/controller";
import { NewHotelType } from "../types/hotel";
import Information from "./Information";

function Card() {
  const [hotels, setHotels] = useState<NewHotelType[]>([]);
  const [sort, setSort] = useState<string>("");

  useEffect(
    () =>
      onSnapshot(hotelsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
        setHotels(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
      }),
    []
  );

  const sortedHotels = hotels?.sort((a, b) => {
    if (sort === "title") {
      if (a.title && b.title) return a.title.localeCompare(b.title);
    }
    if (sort === "perNight") {
      return Number(a.perNight) - Number(b.perNight);
    }
    if (sort === "stars") {
      return Number(a.stars) - Number(b.stars);
    }
    if (sort === "review") {
      return Number(a.review) - Number(b.review);
    }
    return 0;
  });

  return (
    <div className="card">
      <h2 className="sort-title">Sort the hotels</h2>
      <select
        className="select"
        defaultValue={""}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="title">Title</option>
        <option value="perNight">Price per night</option>
        <option value="stars">Stars</option>
        <option value="review">Review</option>
      </select>
      <h2 className="title">All Hotels</h2>
      {hotels && hotels.length ? (
        <div className="individual-card">
          {sortedHotels?.map((hotel) => (
            <Information key={hotel.id} hotel={hotel} />
          ))}
        </div>
      ) : (
        <h2 className="no-hotels">There are no hotels. Please add one</h2>
      )}
    </div>
  );
}

export default Card;
