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
      const token = localStorage.getItem("token");

      const response = await fetch("/api/airports", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      setAirportCodes(data.map((airport) => airport.airportCode));
    };

    fetchAirportCodes();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // QUERY DATABASE
    const response = await fetch("/api/search-flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

          <table>
            <thead>
              <tr>
                <th>Flight #</th>
                <th>Departure Location</th>
                <th>Arrival Location</th>
                <th>Airline</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {results.map((flight) => (
                <tr key={flight.flightID}>
                  <td>Flight {flight.flightID}</td>
                  <td>
                    {flight.departureAirportName} - {flight.departureAirport} (
                    {new Date(flight.departureTime).toLocaleString()})
                  </td>
                  <td>
                    {flight.arrivalAirportName} - {flight.arrivalAirport} (
                    {new Date(flight.arrivalTime).toLocaleString()})
                  </td>
                  <td>{flight.airlineName}</td>
                  <td>${flight.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SearchFlights;
