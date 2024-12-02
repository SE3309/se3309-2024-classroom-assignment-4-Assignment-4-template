import React, { useState, useEffect } from "react";

function CheckAvailableFlights() {
  const [airline, setAirline] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [error, setError] = useState(null);
  const [noFlightsMessage, setNoFlightsMessage] = useState("");

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User is not authenticated.");
        }

        const response = await fetch("/api/airlines", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error || "Failed to fetch airlines.");
        }

        const data = await response.json();
        setAirlines(data.map((airline) => airline.name));
      } catch (err) {
        console.error("Error fetching airlines:", err);
        setError(err.message);
      }
    };

    fetchAirlines();
  }, []);

  const handleSearchFlights = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated.");
      }

      const response = await fetch("/api/check-available-flights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ airline, startDate, endDate }),
      });

      if (response.status === 404) {
        setNoFlightsMessage("No flights available for the selected dates.");
        setFlights([]);
        setError(null);
        return;
      }

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to fetch flights.");
      }

      const data = await response.json();
      setFlights(data);
      setError(null);
      setNoFlightsMessage("");
    } catch (err) {
      setError(err.message);
      setFlights([]);
      setNoFlightsMessage("");
    }
  };

  return (
    <div className="container">
      <h2>Check Available Flights</h2>
      <div className="userInput">
        <form onSubmit={handleSearchFlights}>
          <div>
            <select
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              required
            >
              <option value="">Select Airline</option>
              {airlines.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <p>Start Date:</p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <p>End Date:</p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <div>
            <button type="submit">Search Flights</button>
          </div>
        </form>
      </div>

      {error && <p>Error: {error}</p>}
      {noFlightsMessage && <p>{noFlightsMessage}</p>}
      {flights.length > 0 && (
        <div>
          <h3>Available Flights</h3>
          <ul style={{ fontSize: "0.8rem" }}>
            {flights.map((flight) => (
              <li
                key={flight.flightID}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <p>
                  <strong>Flight ID:</strong> {flight.flightID}
                </p>
                <p>
                  <strong>Airline:</strong> {flight.airlineName}
                </p>
                <p>
                  <strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}
                </p>
                <p>
                  <strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}
                </p>
                <p>
                  <strong>Price:</strong> ${flight.price}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CheckAvailableFlights;
