import React, { useState } from 'react';

function UserBookingHistory() {
    const [userID, setUserID] = useState('');
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    const handleFetchHistory = async (e) => {
        e.preventDefault();
        /*
        try {
            const response = await fetch(`/api/booking-history?userID=${userID}`);
            if (!response.ok) throw new Error('Failed to fetch booking history');
            const data = await response.json();
            setBookings(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setBookings([]);
        }
        */
       
        const data = [
            {
                bookingID: 0,
                status: 'Complete',
                bookingDate: 'Friday',
                cost: '$1,000,000'
            },
            {
                bookingID: 1,
                status: 'Complete',
                bookingDate: 'Friday',
                cost: '$1,000,000'
            }
        ]
        
        setBookings(data);


    };

    return (
        <div className='container'>
            <h2>User Booking History</h2>
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
            </div>

            {error && <p>Error: {error}</p>}

            {bookings.length > 0 && (
                <div>
                    <h3>Booking History</h3>
                    <ul>
                        {bookings.map((booking) => (
                            <li key={booking.bookingID}>
                                <p><strong>Booking ID:</strong> {booking.bookingID}</p>
                                <p><strong>Status:</strong> {booking.status}</p>
                                <p><strong>Date:</strong> {booking.bookingDate}</p>
                                <p><strong>Cost:</strong> {booking.cost}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserBookingHistory;