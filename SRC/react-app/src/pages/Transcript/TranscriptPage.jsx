import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./TranscriptPage.css";

const TranscriptPage = () => {
    const [transcript, setTranscript] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTranscript = async () => {
            try {
                const studentId = AuthService.getCurrentUserId();
                if (!studentId) {
                    throw new Error("No authenticated user found");
                }

                const response = await fetch(
                    `http://localhost:5000/api/transcript/${studentId}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch transcript");
                }

                const data = await response.json();
                setTranscript(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTranscript();
    }, []);

    if (loading) return <div className="transcript-container">Loading...</div>;
    if (error) return <div className="transcript-container">Error: {error}</div>;
    if (!transcript) return <div className="transcript-container">No transcript data available</div>;

    // Group courses by year
    const coursesByYear = transcript.courses.reduce((acc, course) => {
        if (!acc[course.cyear]) {
            acc[course.cyear] = [];
        }
        acc[course.cyear].push(course);
        return acc;
    }, {});

    return (
        <div className="transcript-container">
            <h2>Academic Transcript</h2>

            <div className="transcript-summary">
                <h3>Academic Summary</h3>
                <p>Cumulative GPA: {transcript.gpa.toFixed(2)}</p>
                <p>Total Credits Completed: {transcript.totalCredits}</p>
            </div>

            <div className="transcript-courses">
                {Object.entries(coursesByYear)
                    .sort(([yearA], [yearB]) => yearB - yearA) // Sort years in descending order
                    .map(([year, courses]) => (
                        <div key={year} className="academic-year">
                            <h3>Year {year}</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Course Code</th>
                                        <th>Course Name</th>
                                        <th>Credits</th>
                                        <th>Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course, index) => (
                                        <tr key={index}>
                                            <td>{course.courseCode}</td>
                                            <td title={course.courseDescription}>
                                                {course.courseName}
                                            </td>
                                            <td>{course.credits}</td>
                                            <td>{course.grade || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
            </div>

            <div className="back-button">
                <Link to="/home">
                    <button>Back to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default TranscriptPage;
