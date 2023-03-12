import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { hotelsCollection } from "../../lib/controller";
import { NewHotelType } from "../../types/hotel";

const Search: React.FC = () => {
  const [hotels, setHotels] = useState<NewHotelType[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<NewHotelType[]>([]);
  //   const [search, setSearch] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);

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

  const handleSearch = () => {
    // if (search === "") return;
    if (searchRef.current?.value === null) return;
    setFilteredHotels(
      hotels.filter((hotel) => {
        return hotel
          .title!.toLowerCase()
          .includes(searchRef.current?.value as string);
      })
    );
  };

  return (
    <div className="search__page">
      <div className="search">
        <input
          type="text"
          className="inputsearch"
          placeholder="Search for a hotel"
          //   value={search}
          //   onChange={(e) => setSearch(e.target.value)}
          ref={searchRef}
        />
        <button onClick={handleSearch}>Go</button>
      </div>
      <div>
        {filteredHotels.length ? (
          filteredHotels.map((hotel) => (
            <div key={hotel.id} className="search__title">
              <Link to={`/hotels/${hotel.id}`}>
                <h1>{hotel.title}</h1>
              </Link>
            </div>
          ))
        ) : (
          <h1>No hotels found</h1>
        )}
      </div>
    </div>
  );
};

export default Search;
