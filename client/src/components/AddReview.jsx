import React, { useState } from 'react';

function AddReview() {
    const [userID, setUserID] = useState('');
    const [airlineID, setAirlineID] = useState('');
    const [hotelID, setHotelID] = useState('');
    const [rating, setRating] = useState('');
    const [reviewComment, setReviewComment] = useState('');
    const [confirmation, setConfirmation] = useState(null);

    const handleAddReview = async () => {
        /*
        const response = await fetch('/api/add-review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID, airlineID, hotelID, rating, reviewComment }),
        });
        const data = await response.json();
        */

        const data = {
            message: `Review added with ...`
        }


        setConfirmation(data);
    };

    return (
        <div className='container addReview'>
            <h2>Add a Review</h2>
            <div className='userInput'>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Airline ID (leave blank for hotel)"
                    value={airlineID}
                    onChange={(e) => setAirlineID(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Hotel ID (leave blank for airline)"
                    value={hotelID}
                    onChange={(e) => setHotelID(e.target.value)}
                />
                <input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Rating (1-5)"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <div>
                    <textarea
                        placeholder="Review Comment"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                    />
                </div>

                <div>
                    <button onClick={handleAddReview}>Submit Review</button>
                </div>


            </div>

            {confirmation && <p>{confirmation.message}</p>}
        </div>
    );
}

export default AddReview;
