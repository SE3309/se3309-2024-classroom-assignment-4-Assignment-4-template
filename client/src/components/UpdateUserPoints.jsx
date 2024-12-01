import React, { useState } from 'react';

function UpdateUserPoints() {
    const token = localStorage.getItem('token');
    const [points, setPoints] = useState('');
    const [confirmation, setConfirmation] = useState(null);

    const handleUpdatePoints = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/points', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ points }),
            });
            const data = await response.json();
            setConfirmation(data);
        } catch (err) {
            setConfirmation({ success: false, message: "Failed to update points." });
        }

        // TEST DATA
        // const data = {
        //     success: true
        // };
        setConfirmation(data);
    };

    return (
        <div className="container updatePoints">
            <h2>Update User Points</h2>
            <div className='userInput'>
                <form onSubmit={handleUpdatePoints}>
                    {/* <input
                        type="text"
                        placeholder="User ID"
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        required
                    /> */}
                    <input
                        type="number"
                        placeholder="Points to Add"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        required
                    />
                    <div>
                        <button type="submit">Update Points</button>
                    </div>

                </form>
            </div>

            {confirmation && (
                <p>
                    {confirmation.success
                        ? `${confirmation.message}`
                        : `Error: ${confirmation.message}`}
                </p>
            )}
        </div>
    );
}

export default UpdateUserPoints;