import React, { useState, useEffect } from 'react';

function ViewAverageRating() {
    const [hotels, setHotels] = useState([]);
    const [airlines, setAirlines] = useState([]);
    const [hotelName, setHotelName] = useState('');
    const [airlineName, setAirlineName] = useState('');
    const [averageRating, setAverageRating] = useState(null);

    const handleViewRating = async (e) => {
        e.preventDefault();
        if (airlineName === '' && hotelName === '') return alert('Enter either an Airline or Hotel!')
        if (airlineName !== '' && hotelName !== '') return alert('Enter one of an Airline or Hotel!')
        
        const response = await fetch('/api/view-rating', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ airlineName, hotelName }),
        });
        const data = await response.json();
        
        setAverageRating(data.averageRating);
    };

    const fetchHotels = async () => {
        const token = localStorage.getItem("token");
  
        const response = await fetch("/api/hotels", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setHotels(data);
      };
      const fetchAirlines = async () => {
        const token = localStorage.getItem("token");
  
        const response = await fetch("/api/airlines", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setAirlines(data);
      };

      useEffect(() => {
        fetchHotels();
        fetchAirlines()
      }, []);

    return (
        <div className='container viewavg'>
            <h2>View Average Rating</h2>
            <div className='userInput'>
                <form onSubmit={handleViewRating}>
                <select
                    id="hotel"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    
                >
                    <option value="">-- Select a Hotel --</option>
                    {hotels.map((hotel) => (
                    <option key={hotel.hotelID} value={hotel.hotelID}>
                        {hotel.hotelName}
                    </option>
                    ))}
                </select>
                <select
                    id="airline"
                    value={airlineName}
                    onChange={(e) => setAirlineName(e.target.value)}
                    
                >
                    <option value="">-- Select an Airline --</option>
                    {airlines.map((airline) => (
                    <option key={airline.airlineID} value={airline.airlineID}>
                        {airline.name}
                    </option>
                    ))}
                </select>
                    <div>
                        <button onClick={handleViewRating}>View Rating</button>
                    </div>
                </form>
            </div>

            {averageRating !== null && (
                <p>
                    Average Rating: <strong>{averageRating}</strong>
                </p>
            )}
        </div>
    );
}

export default ViewAverageRating;