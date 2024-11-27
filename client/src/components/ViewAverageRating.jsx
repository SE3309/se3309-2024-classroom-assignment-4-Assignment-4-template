import React, { useState } from 'react';

function ViewAverageRating() {
    const [airlineID, setAirlineID] = useState('');
    const [hotelID, setHotelID] = useState('');
    const [averageRating, setAverageRating] = useState(null);

    const handleViewRating = async (e) => {
        e.preventDefault();
        if (airlineID == '' && hotelID == '') return alert('Enter either an AirlineID or HotelID!')
        
        const response = await fetch('/api/view-rating', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ airlineID, hotelID }),
        });
        const data = await response.json();
        
        setAverageRating(data.averageRating);
    };

    return (
        <div className='container viewavg'>
            <h2>View Average Rating</h2>
            <div className='userInput'>
                <form onSubmit={handleViewRating}>
                    <input
                        type="text"
                        placeholder="Airline ID (leave blank for hotel)"
                        value={airlineID}
                        onChange={(e) => {
                            setAirlineID(e.target.value);
                            setHotelID('');
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Hotel ID (leave blank for airline)"
                        value={hotelID}
                        onChange={(e) => {
                            setHotelID(e.target.value);
                            setAirlineID('');
                        }}
                    />
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