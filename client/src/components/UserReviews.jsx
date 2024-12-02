import React, { useEffect, useState } from "react";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Assuming the JWT is stored in localStorage
      const response = await fetch('api/reviews', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch reviews from the backend
    fetchReviews();
  }, []);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews found.</p>;
  }

  return ( 
      <div className="container">
      <h2>Your Reviews</h2>
      <button onClick={fetchReviews}>Refresh</button>
      <table>
        <caption>Your Submitted Reviews</caption>
        <thead>
          <tr>
            <th>Rating</th>
            <th>Comment</th>
            <th>Airline</th>
            <th>Hotel</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.reviewID}>
              <td>{review.rating}</td>
              <td>{review.reviewComment}</td>
              <td>{review.airlineName || "N/A"}</td>
              <td>{review.hotelName || "N/A"}</td>
              <td>{new Date(review.dateCreated).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserReviews;
