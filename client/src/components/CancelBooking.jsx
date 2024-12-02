import React, { useState, useEffect } from "react";

function CancelBooking() {
  const [bookingIDs, setBookingIDs] = useState([]);
  const [selectedBookingID, setSelectedBookingID] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const handleCancelBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated.");
      }

      const response = await fetch("/api/cancel-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingID: selectedBookingID }),
      });

      const data = await response.json();
      setConfirmation(data);
    } catch (error) {
      console.error("Error:", error);
      setConfirmation({ success: false, message: "Failed to cancel booking." });
    }
  };

  useEffect(() => {
    const fetchActiveBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User is not authenticated.");
        }

        const response = await fetch("/api/bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch active bookings.");
        }

        const data = await response.json();
        const activeBookings = data.filter(
          (booking) => booking.bookingStatus === "confirmed"
        );
        setBookingIDs(activeBookings.map((booking) => booking.bookingID));
      } catch (error) {
        console.error("Error fetching active bookings:", error);
      }
    };

    fetchActiveBookings();
  }, [handleCancelBooking]);

  return (
    <div className="container">
      <h2>Cancel Booking</h2>
      <div className="userInput">
        <form onSubmit={handleCancelBooking}>
          <select
            value={selectedBookingID}
            onChange={(e) => setSelectedBookingID(e.target.value)}
            required
          >
            <option value="">Select Booking ID</option>
            {bookingIDs.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
          <div>
            <button type="submit">Cancel Booking</button>
          </div>
        </form>
      </div>

      {confirmation && (
        <p>
          {confirmation.success
            ? `Booking with ID ${selectedBookingID} was successfully canceled.`
            : `${confirmation.message}`}
        </p>
      )}
    </div>
  );
}

export default CancelBooking;
