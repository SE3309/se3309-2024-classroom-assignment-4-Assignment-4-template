import React from 'react';
import './App.css'
import SearchFlights from './components/SearchFlights';
import BookHotelRoom from './components/BookHotelRoom';
import AddReview from './components/AddReview';

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


        </>
    )
}

export default App
