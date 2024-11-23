import React from 'react';
import './App.css'
import SearchFlights from './components/SearchFlights';
import BookHotelRoom from './components/BookHotelRoom';
import AddReview from './components/AddReview';
import ViewAverageRating from './components/ViewAverageRating';
import CancelBooking from './components/CancelBooking';
import UserBookingHistory from './components/UserBookingHistory';
import CheckAvailableFlights from './components/CheckAvailableFlights';
import UpdateUserPoints from './components/UpdateUserPoints';

function App() {
    return (
        <>
            <div className='header'>
                <h1>SE3309 Team 9</h1>
                <h2><strong>Trip Booking Web App</strong></h2>
                <p>
                    Search, Book, Review, and More!
                </p>
            </div>

            <SearchFlights />
            <BookHotelRoom />
            <AddReview />
            <ViewAverageRating />
            <CancelBooking />
            <UserBookingHistory />
            <CheckAvailableFlights />
            <UpdateUserPoints />

        </>
    )
}

export default App
