import React, { useState } from 'react';

function CancelBooking() {
    const [text, setText] = useState('');
    const [submittedBookingID, setSubmittedBookingID] = useState('');
    const [confirmation, setConfirmation] = useState(null);

    const handleCancelBooking = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('User is not authenticated.');
            }

            setSubmittedBookingID(text);
            const response = await fetch('/api/cancel-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ bookingID: text }),
            });

            const data = await response.json();
            setConfirmation(data);
        } catch (error) {
            console.error("Error:", error);
            setConfirmation({ success: false, message: "Failed to cancel booking." });
        }
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
                        ? `Booking with ID ${submittedBookingID} was successfully canceled.`
                        : `${confirmation.message}`}
                </p>
            )}
        </div>
    );
}

export default CancelBooking;
