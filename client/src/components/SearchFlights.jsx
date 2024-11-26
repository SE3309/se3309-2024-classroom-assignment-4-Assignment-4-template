import React, { useState } from "react";

function SearchFlights() {
  const [departureAirportCode, setDepartureAirportCode] = useState("");
  const [arrivalAirportCode, setArrivalAirportCode] = useState("");
  const [startDepartureTime, setStartDepartureTime] = useState("");
  const [endArrivalTime, setEndArrivalTime] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    // QUERY DATABASE
    const response = await fetch("/api/search-flights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        departureAirportCode,
        arrivalAirportCode,
        startDepartureTime,
        endArrivalTime,
      }),
    });
    const data = await response.json();
    
    setResults(data);
  };

  return (
    <div className="container">
      <h2>Search Flights</h2>

      <div className="userInput">
        <form onSubmit={handleSearch}>
          <div>
            <input
              type="text"
              placeholder="Departure Airport Code"
              value={departureAirportCode}
              onChange={(e) => setDepartureAirportCode(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Arrival Airport Code"
              value={arrivalAirportCode}
              onChange={(e) => setArrivalAirportCode(e.target.value)}
              required
            />
          </div>

          <div>
            <p>Departure Time:</p>
            <input
              type="datetime-local"
              value={startDepartureTime}
              onChange={(e) => setStartDepartureTime(e.target.value)}
            />
            <p>Arrival Time:</p>
            <input
              type="datetime-local"
              value={endArrivalTime}
              onChange={(e) => setEndArrivalTime(e.target.value)}
            />
          </div>

          <div>
            <button type="submit">Search</button>
          </div>
        </form>
      </div>

      {results.length > 0 && (
        <div>
          <h3>Flight Results</h3>
          <ul>
            {results.map((flight) => (
              <li key={flight.flightID}>
                <p>Flight {flight.flightID}</p>
                <p>
                  {flight.departureAirport} (
                  {new Date(flight.departureTime).toLocaleString()}) →{" "}
                  {flight.arrivalAirport} (
                  {new Date(flight.arrivalTime).toLocaleString()})
                </p>
                <p>Price: {flight.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchFlights;
