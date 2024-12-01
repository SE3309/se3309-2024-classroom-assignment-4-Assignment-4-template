import React, { useState, useEffect } from 'react';

function CheckAvailableFlights() {
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [airportCodes, setAirportCodes] = useState([]);
  const [error, setError] = useState(null);
  const [noFlightsMessage, setNoFlightsMessage] = useState('');

  useEffect(() => {
    const fetchAirportCodes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User is not authenticated.');
        }

        const response = await fetch('/api/airports', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error || 'Failed to fetch airport codes.');
        }

        const data = await response.json();
        setAirportCodes(data.map(airport => airport.airportCode));
      } catch (err) {
        console.error('Error fetching airport codes:', err);
        setError(err.message);
      }
    };

    fetchAirportCodes();
  }, []);

  const handleSearchFlights = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated.');
      }

      const response = await fetch('/api/check-available-flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ departureAirport, arrivalAirport, startDate, endDate }),
      });

      if (response.status === 404) {
        setNoFlightsMessage('No flights available for the selected dates.');
        setFlights([]);
        setError(null);
        return;
      }

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to fetch flights.');
      }

      const data = await response.json();
      setFlights(data);
      setError(null);
      setNoFlightsMessage('');
    } catch (err) {
      setError(err.message);
      setFlights([]);
      setNoFlightsMessage('');
    }
  };

  return (
    <div className="container">
      <h2>Check Available Flights</h2>
      <div className="userInput">
        <form onSubmit={handleSearchFlights}>
          <div>
            <select
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
              required
            >
              <option value="">Select Departure Airport</option>
              {airportCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>

            <select
              value={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
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
          <ul>
            {flights.map((flight) => (
              <li key={flight.flightID}>
                <p><strong>Flight ID:</strong> {flight.flightID}</p>
                <p><strong>Airline:</strong> {flight.airlineName}</p>
                <p><strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
                <p><strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
                <p><strong>Price:</strong> ${flight.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CheckAvailableFlights;
