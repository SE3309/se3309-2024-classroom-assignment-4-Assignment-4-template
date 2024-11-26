import React, { useState, useEffect } from "react";

function SearchFlights() {
  const [departureAirportCode, setDepartureAirportCode] = useState("");
  const [arrivalAirportCode, setArrivalAirportCode] = useState("");
  const [startDepartureTime, setStartDepartureTime] = useState("");
  const [endArrivalTime, setEndArrivalTime] = useState("");
  const [results, setResults] = useState([]);
  const [airportCodes, setAirportCodes] = useState([]);

  useEffect(() => {
    const fetchAirportCodes = async () => {
      const response = await fetch("/api/airports");
      const data = await response.json();
      setAirportCodes(data.map((airport) => airport.airportCode));
    };

    fetchAirportCodes();
  }, []);

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
            <label htmlFor="departureAirport">Departure Airport:</label>
            <select
              id="departureAirport"
              value={departureAirportCode}
              onChange={(e) => setDepartureAirportCode(e.target.value)}
              required
            >
              <option value="">Select Departure Airport</option>
              {airportCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>

            <label htmlFor="arrivalAirport">Arrival Airport:</label>
            <select
              id="arrivalAirport"
              value={arrivalAirportCode}
              onChange={(e) => setArrivalAirportCode(e.target.value)}
              required
            >
              <option value="">Select Arrival Airport</option>
              {airportCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
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
            <div className="resultHeader">
              <strong>Flight #</strong>
              <strong>Departure Location</strong>
              <strong>Arrival Location</strong>
              <strong>Price</strong>
            </div>

            {results.map((flight) => (
              <li key={flight.flightID}>
                <p>Flight {flight.flightID}</p>
                <p>
                  {flight.departureAirportName} - {flight.departureAirport} (
                  {new Date(flight.departureTime).toLocaleString()}) →{" "}
                  {flight.arrivalAirportName} - {flight.arrivalAirport} (
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
