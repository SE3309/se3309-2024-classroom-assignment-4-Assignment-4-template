import React, { useState, useEffect } from "react";
import "./App.css";
import SearchFlights from "./components/SearchFlights";
import BookHotelRoom from "./components/BookHotelRoom";
import AddReview from "./components/AddReview";
import ViewAverageRating from "./components/ViewAverageRating";
import CancelBooking from "./components/CancelBooking";
import UserBookingHistory from "./components/UserBookingHistory";
import CheckAvailableFlights from "./components/CheckAvailableFlights";
import UpdateUserPoints from "./components/UpdateUserPoints";
import AuthPage from "./components/AuthPage";
import { jwtDecode } from "jwt-decode";
import UserReviews from "./components/UserReviews";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp > Date.now() / 1000) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    }
  }, []);

  if (!isAuthenticated) {
    return <AuthPage setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <>
      <div className="header">
        <h1>SE3309 Team 9</h1>
        <h2>
          <strong>Trip Booking Web App</strong>
        </h2>
        <p>Search, Book, Review, and More!</p>
      </div>

      <SearchFlights />
      <BookHotelRoom />
      <AddReview />
      <UserReviews />
      <ViewAverageRating />
      <CancelBooking />
      <UserBookingHistory />
      <CheckAvailableFlights />
      <UpdateUserPoints />
    </>
  );
}

export default App;
