import React, { useState } from 'react';

function BookHotelRoom() {
    const [hotelID, setHotelID] = useState('');
    const [roomType, setRoomType] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [confirmation, setConfirmation] = useState(null);

    const handleBooking = async () => {

        // QUERY DATABASE
        /*
        const response = await fetch('/api/book-hotel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hotelID, roomType, checkInDate, checkOutDate }),
        });
        const data = await response.json();
        */

        // TEMPORARY TEST DATA
        const testData = [
            {
                hotelID: 0,
                roomType: 'Suite',
                checkInDate: 'Friday',
                checkOutDate: 'Monday'
            },
            {
                hotelID: 1,
                roomType: 'Suite',
                checkInDate: 'Friday',
                checkOutDate: 'Monday'
            }
        ];

        const data = {
            message: `Success: Booked ${testData[0].roomType} from ${testData[0].checkInDate} to ${testData[0].checkOutDate}`
        }

        setConfirmation(data);
    };

    return (
        <div className='container'>

            <h2>Book a Hotel Room</h2>

            <div className='userInput'>
                <input
                    type="text"
                    placeholder="Hotel ID"
                    value={hotelID}
                    onChange={(e) => setHotelID(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Room Type"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                />
                <p>Check-In Date:</p>
                <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                />
                <p>Check-Out Date:</p>
                <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                />

                <div>
                    <button onClick={handleBooking}>Book</button>
                </div>

            </div>

            {confirmation && <p>Booking Confirmation: {confirmation.message}</p>}
        </div>
    );
}

export default BookHotelRoom;