import React, { useState, useEffect } from 'react';

function UserBookingHistory() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token')

    String.prototype.toTitleCase = function () {
        return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();});
    };

    const handleFetchHistory = async () => {
        
        try {
            const response = await fetch(`/api/booking-history`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch booking history');
            const data = await response.json();
            setBookings(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setBookings([]);
        }
    };

    useEffect(() => {
        handleFetchHistory();
    }, [bookings]);

    return (
        <div className='container'>
            {/* <h2>User Booking History</h2>
            <div className='userInput'>
                <form onSubmit={handleFetchHistory}>
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        required
                    />
                    <div>
                        <button type='submit'>Fetch Booking History</button>
                    </div>
                </form>
            </div> */}

            {error && <p>Error: {error}</p>}

            {bookings.length > 0 && (
                <div>
                    <h2>User Booking History</h2>
                    <ul>
                        {bookings.map((booking) => (
                            <li key={booking.bookingID}>
                                {/* Render differently if flight vs hotel. For purpose of demo, this will always be a hotel. */}
                                <p><strong>Booking ID:</strong> {booking.bookingID}</p>
                                <p><strong>Status:</strong> {(booking.bookingStatus).toTitleCase()}</p>
                                <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                                <p><strong>Cost:</strong> ${booking.cost}</p>
                                {booking.flightID && (
                                    <div>
                                        <p><strong>Departure Airport:</strong> {booking.departureAirport}</p>
                                        <p><strong>Arrival Airport:</strong> {booking.arrivalAirport}</p>
                                        <p><strong>Airline:</strong> {booking.airline}</p>
                                    </div>
                                )}
                                {booking.hotelID && (
                                    <div>
                                        <p><strong>Hotel:</strong> {booking.hotelName}</p>
                                    </div>
                                )}
                                
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserBookingHistory;