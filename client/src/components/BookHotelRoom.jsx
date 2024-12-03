import React, { useState, useEffect } from "react";

function BookHotelRoom() {
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  // Fetch hotel names
  useEffect(() => {
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

    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch("/api/bookings", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setBookings(data);
    };

    fetchBookings();
  }, [confirmation, bookings]);

  const handleBooking = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // QUERY DATABASE
    const response = await fetch("/api/book-hotel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ hotelName, roomType, checkInDate, checkOutDate }),
    });
    const data = await response.json();

    setConfirmation(data);
  };

  return (
    <div className="container">
      <h2>Book a Hotel Room</h2>
      <div className="userInput">
        <form onSubmit={handleBooking}>
          <label htmlFor="hotel">Select Hotel:</label>
          <select
            id="hotel"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            required
          >
            <option value="">-- Select a Hotel --</option>
            {hotels.map((hotel) => (
              <option key={hotel.hotelID} value={hotel.hotelID}>
                {hotel.hotelName}
              </option>
            ))}
          </select>
          <label htmlFor="roomType">Select Room Type:</label>
          <select
            id="roomType"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
          >
            <option value="">-- Select Room Type --</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
          </select>
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
            <button type="submit">Book</button>
          </div>
        </form>
      </div>

      {confirmation && <p>Booking Confirmation: {confirmation.message}</p>}

      <h3>Your Bookings</h3>
      {bookings.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Booking Date</th>
              <th>Hotel Name</th>
              <th>City</th>
              <th>Room Type</th>
              <th>Check-In Date</th>
              <th>Check-Out Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingID}>
                <td>{booking.bookingID}</td>
                <td>${parseFloat(booking.cost).toFixed(2)}</td>
                <td>{booking.bookingStatus}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{booking.hotelName}</td>
                <td>{booking.city}</td>
                <td>{booking.roomType}</td>
                <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
}

export default BookHotelRoom;
