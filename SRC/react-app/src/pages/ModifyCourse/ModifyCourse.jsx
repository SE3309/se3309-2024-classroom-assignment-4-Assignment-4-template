import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './ModifyCourse.css';

const ModifyCourse = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);
    const [isAddingCourse, setIsAddingCourse] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [newCourse, setNewCourse] = useState({
        courseCode: '',
        courseName: '',
        credits: '',
        cyear: new Date().getFullYear()
    });

    useEffect(() => {
        fetchCourses();
    }, [user.facultyID]);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/faculty/courses?facultyID=${user.facultyID}`);
            if (!response.ok) throw new Error('Failed to fetch courses');
            const data = await response.json();
            setCourses(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/faculty/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newCourse,
                    instructor: user.facultyID
                }),
            });

            if (!response.ok) throw new Error('Failed to add course');
            
            await fetchCourses(); // Refresh the course list
            setIsAddingCourse(false);
            setNewCourse({ // Reset form
                courseCode: '',
                courseName: '',
                credits: '',
                cyear: new Date().getFullYear()
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/faculty/courses/${editingCourse.courseCode}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseName: editingCourse.courseName,
                    credits: editingCourse.credits
                }),
            });

            if (!response.ok) throw new Error('Failed to update course');
            
            await fetchCourses(); // Refresh the course list
            setEditingCourse(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteCourse = async (courseCode, cyear) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return;
        
        try {
            const response = await fetch(`http://localhost:5000/api/faculty/courses/${courseCode}/${cyear}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete course');
            
            await fetchCourses(); // Refresh the course list
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="modify-course-container">
            <div className="header-section">
                <h2>Manage Courses</h2>
                <button 
                    className="add-course-button"
                    onClick={() => setIsAddingCourse(true)}
                >
                    Add New Course
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {isAddingCourse && (
                <div className="add-course-form">
                    <h3>Add New Course</h3>
                    <form onSubmit={handleAddCourse}>
                        <div className="form-group">
                            <label>Course Code:</label>
                            <input
                                type="text"
                                value={newCourse.courseCode}
                                onChange={(e) => setNewCourse({...newCourse, courseCode: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Course Name:</label>
                            <input
                                type="text"
                                value={newCourse.courseName}
                                onChange={(e) => setNewCourse({...newCourse, courseName: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Credits:</label>
                            <input
                                type="number"
                                value={newCourse.credits}
                                onChange={(e) => setNewCourse({...newCourse, credits: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Year:</label>
                            <input
                                type="number"
                                value={newCourse.cyear}
                                onChange={(e) => setNewCourse({...newCourse, cyear: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-buttons">
                            <button type="submit">Add Course</button>
                            <button type="button" onClick={() => setIsAddingCourse(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="courses-grid">
                {courses.map((course) => (
                    <div key={`${course.courseCode}-${course.cyear}`} className="course-card">
                        {editingCourse?.courseCode === course.courseCode ? (
                            <form onSubmit={handleUpdateCourse}>
                                <div className="form-group">
                                    <label>Course Name:</label>
                                    <input
                                        type="text"
                                        value={editingCourse.courseName}
                                        onChange={(e) => setEditingCourse({
                                            ...editingCourse,
                                            courseName: e.target.value
                                        })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Credits:</label>
                                    <input
                                        type="number"
                                        value={editingCourse.credits}
                                        onChange={(e) => setEditingCourse({
                                            ...editingCourse,
                                            credits: e.target.value
                                        })}
                                        required
                                    />
                                </div>
                                <div className="form-buttons">
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => setEditingCourse(null)}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <h3>{course.courseCode}</h3>
                                <p><strong>Name:</strong> {course.courseName}</p>
                                <p><strong>Credits:</strong> {course.credits}</p>
                                <p><strong>Year:</strong> {course.cyear}</p>
                                <div className="course-actions">
                                    <button 
                                        className="edit-button"
                                        onClick={() => setEditingCourse(course)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="delete-button"
                                        onClick={() => handleDeleteCourse(course.courseCode, course.cyear)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModifyCourse;
