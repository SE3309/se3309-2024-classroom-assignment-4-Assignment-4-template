import React, { useState } from 'react';

function CheckAvailableFlights() {
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState(null);

    const handleSearchFlights = async (e) => {
        e.preventDefault();
        
        /*
        try {
            const response = await fetch('/api/check-available-flights', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ departureAirport, arrivalAirport, startDate, endDate }),
            });
            if (!response.ok) throw new Error('Failed to fetch flights');
            const data = await response.json();
            setFlights(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setFlights([]);
        }
        */
        
        // TEST DATA
        const data = [
            {
                flightID: 0,
                airlineName: 'AirCanada',
                departureTime: '1pm',
                arrivalTime: '2pm',
                price: 100000
            },
            {
                flightID: 1,
                airlineName: 'AirCanada',
                departureTime: '1pm',
                arrivalTime: '2pm',
                price: 100000
            }
        ]
        
        setFlights(data);
        
    };

    return (
        <div className="container">
            <h2>Check Available Flights</h2>
            <div className='userInput'>
                <form onSubmit={handleSearchFlights}>
                    <div>
                        <input
                            type="text"
                            placeholder="Departure Airport Code"
                            value={departureAirport}
                            onChange={(e) => setDepartureAirport(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Arrival Airport Code"
                            value={arrivalAirport}
                            onChange={(e) => setArrivalAirport(e.target.value)}
                            required
                        />
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

            {flights.length > 0 && (
                <div>
                    <h3>Available Flights</h3>
                    <ul>
                        {flights.map((flight) => (
                            <li key={flight.flightID}>
                                <p><strong>Flight ID:</strong> {flight.flightID}</p>
                                <p><strong>Airline:</strong> {flight.airlineName}</p>
                                <p><strong>Departure:</strong> {flight.departureTime}</p>
                                <p><strong>Arrival:</strong> {flight.arrivalTime}</p>
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
