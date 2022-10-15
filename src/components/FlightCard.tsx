import React from "react";

interface IProps {
  title: string;
  children: React.ReactNode;
}

function FlightCard({ title, children }: IProps) {
  return (
    <div className="flight-card">
      <h2>{title}</h2>
      <ul>{children}</ul>
    </div>
  );
}

export default FlightCard;
