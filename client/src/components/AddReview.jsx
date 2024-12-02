import React, { useState, useEffect } from 'react';

function AddReview() {
    const [hotels, setHotels] = useState([]);
    const [airlines, setAirlines] = useState([]);
    const [hotelName, setHotelName] = useState('');
    const [airlineName, setAirlineName] = useState('');
    const [rating, setRating] = useState('');
    const [reviewComment, setReviewComment] = useState('');
    const [confirmation, setConfirmation] = useState(null);
    const token = localStorage.getItem('token')

    const handleAddReview = async (e) => {
        e.preventDefault();
        if (airlineName === '' && hotelName === '') return alert('Enter either an Airline or Hotel!')
        if (airlineName !== '' && hotelName !== '') return alert('Enter one of an Airline or Hotel!')
        
        const response = await fetch('/api/add-review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
             },
            
            body: JSON.stringify({airlineName, hotelName, rating, reviewComment }),
        });
        const data = await response.json();
        setConfirmation(data);
        setAirlineName('');
        setHotelName('');
        setRating('');
        setReviewComment('');
        fetchHotels();
   
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
        <div className='container addReview'>
            <h2>Add a Review</h2>
            <div className='userInput'>
                <form onSubmit={handleAddReview}>
                <label htmlFor="hotel">Select Hotel:</label>
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
                    <input
                        type="number"
                        min="1"
                        max="5"
                        placeholder="Rating (1-5)"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                    <div>
                        <textarea
                            placeholder="Review Comment"
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <button type='submit'>Submit Review</button>
                    </div>
                </form>
            </div>

            {confirmation && <p>{confirmation.message}</p>}
        </div>
    );
}

export default AddReview;