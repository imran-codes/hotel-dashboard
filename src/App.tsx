import React from "react";
import { Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import Create from "./components/Create";
import Details from "./components/Details";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/create" element={<Create />} />
      <Route path="/hotels/:id" element={<Details />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Card />} />
    </Routes>
  );
}

export default App;
