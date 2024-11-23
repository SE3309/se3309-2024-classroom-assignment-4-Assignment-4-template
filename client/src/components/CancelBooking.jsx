import React, { useState } from 'react';

function CancelBooking() {
    const [text, setText] = useState('');
    const [bookingID, setBookingID] = useState('');
    const [confirmation, setConfirmation] = useState(null);

    const handleCancelBooking = async (e) => {
        e.preventDefault();
        setBookingID(text);

        /*
        const response = await fetch('/api/cancel-booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingID: text }),
        });
        const data = await response.json();
        */
        const data = { success: true };

        setConfirmation(data);
    };

    return (
        <div className="container">
            <h2>Cancel Booking</h2>
            <div className="userInput">
                <form onSubmit={handleCancelBooking}>
                    <input
                        type="text"
                        placeholder="Booking ID"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                    <div>
                        <button type="submit">Cancel Booking</button>
                    </div>
                </form>
            </div>

            {confirmation && (
                <p>
                    {confirmation.success
                        ? `Booking with ID ${bookingID} was successfully canceled.`
                        : `Error: ${confirmation.message}`}
                </p>
            )}
        </div>
    );
}

export default CancelBooking;