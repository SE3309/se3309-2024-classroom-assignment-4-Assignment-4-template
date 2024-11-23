# SE3309_Assignment4_2024

This repository contains 2 folders to be used to manage your final project assignment.

The APP folder is where you should commit all the code for your web application.

The DUMP folder should contain the database .dump file required to re-create your database and ALL of it's data.



# Set Up

- cd client
- npm install
- npm run dev
- go to localhost port



# Functionality: (Name, Example SQL, Pseudocode function call)

# 1. Search Flights
- Example:
- SELECT 
    f.flightID, 
    f.departureTime, 
    f.arrivalTime, 
    f.price, 
    a1.airportName AS departureAirport, 
    a2.airportName AS arrivalAirport, 
    al.name AS airlineName
FROM Flight f
JOIN Airport a1 ON f.departureAirport = a1.airportCode
JOIN Airport a2 ON f.arrivalAirport = a2.airportCode
JOIN Airline al ON f.airlineID = al.airlineID
WHERE f.departureAirport = ? AND f.arrivalAirport = ? AND f.departureTime >= ? AND f.arrivalTime <= ?;


- function searchFlights(departureAirportCode, arrivalAirportCode, startDepartureTime, endArrivalTime)

    
    
# 2. Book a Hotel Room
- Example:
- SELECT availabilityStatus 
FROM HotelRoom 
WHERE hotelID = ? AND roomType = ?;
INSERT INTO Booking (userID, cost, bookingStatus, bookingDate) 
VALUES (?, ?, 'Confirmed', CURDATE());
- INSERT INTO HotelBooking (hotelID, bookingID, checkInDate, checkOutDate, roomType) 
VALUES (?, LAST_INSERT_ID(), ?, ?, ?);

- function bookHotelRoom(userID, hotelID, roomType, checkInDate, checkOutDate)



# 3. Add a Review for an Airline or Hotel
- Example:
- INSERT INTO Review (userID, airlineID, hotelID, rating, reviewComment, dateCreated) 
VALUES (?, ?, ?, ?, ?, CURDATE());
- SELECT * FROM Review WHERE reviewID = LAST_INSERT_ID();

- function addReview(userID, airlineID = null, hotelID = null, rating, reviewComment)




# 4. View the Average Rating for Airlines and Hotels
- Example:
- SELECT 
    COALESCE(al.name, h.hotelName) AS name, 
    AVG(r.rating) AS averageRating 
FROM Review r
LEFT JOIN Airline al ON r.airlineID = al.airlineID
LEFT JOIN Hotel h ON r.hotelID = h.hotelID
WHERE al.airlineID = ? OR h.hotelID = ?
GROUP BY name;

- function viewAverageRating(airlineID = null, hotelID = null)


# 5. Cancel a Booking
- Example:
- UPDATE Booking 
SET bookingStatus = 'Cancelled' 
WHERE bookingID = ?;
- SELECT bookingStatus FROM Booking WHERE bookingID = ?;

- function cancelBooking(bookingID)



# 6. Get User's Booking History
- Example:
- SELECT 
    b.bookingID, 
    b.bookingStatus, 
    b.bookingDate, 
    f.flightID, 
    h.hotelID, 
    p.amount AS paymentAmount
FROM Booking b
LEFT JOIN FlightBooking fb ON b.bookingID = fb.bookingID
LEFT JOIN Flight f ON fb.flightID = f.flightID
LEFT JOIN HotelBooking hb ON b.bookingID = hb.bookingID
LEFT JOIN Hotel h ON hb.hotelID = h.hotelID
LEFT JOIN Payment p ON b.bookingID = p.bookingID
WHERE b.userID = ?;

- function getUserBookingHistory(userID)



# 7. Check Available Flights from a Specific Airline
- Example:
- SELECT 
    f.flightID, 
    a1.airportName AS departureAirport, 
    a2.airportName AS arrivalAirport, 
    f.departureTime, 
    f.arrivalTime, 
    f.price 
FROM Flight f
JOIN Airport a1 ON f.departureAirport = a1.airportCode
JOIN Airport a2 ON f.arrivalAirport = a2.airportCode
WHERE f.airlineID = ?;

- function checkAvailableFlights(airlineID)



# 8. Update User Points Based on Reviews
- Example:
- UPDATE User 
SET points = points + 10 
WHERE userID = ?;
- SELECT points FROM User WHERE userID = ?;

- function updateUserPoints(userID)



# Component Structure 
- App
    - SearchFlights
    - BookHotelRoom
    - AddReview
    - ViewAverageRating
    - CancelBooking
    - UserBookingHistory
    - CheckAvailableFlights
    - UpdateUserPoints





