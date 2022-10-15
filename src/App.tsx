import React from "react";
import { Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import Create from "./components/Create";
import Destinations from "./components/Destinations";
import Details from "./components/Details";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/create" element={<Create />} />
      <Route path="/hotels/:id" element={<Details />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Card />} />
      <Route path="/destinations" element={<Destinations />} />
    </Routes>
  );
}

export default App;
