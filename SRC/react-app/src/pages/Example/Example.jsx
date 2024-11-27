import React, { useEffect, useState } from "react";
import axios from "axios";
import './Example.css';  // Import the CSS file for styling

const Example = () => {
  const [students, setStudents] = useState([]);

  // Fetching data from the Flask backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/example")
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div>
      <h1>Students</h1>
      {students.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Graduation Year</th>
              <th>Program</th>
              <th>Year in Program</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.studentID}</td>
                <td>{student.fullName}</td>
                <td>{student.email}</td>
                <td>{student.graduationYear}</td>
                <td>{student.program}</td>
                <td>{student.yearInProgram}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students available.</p>
      )}
    </div>
  );
};

export default Example;
