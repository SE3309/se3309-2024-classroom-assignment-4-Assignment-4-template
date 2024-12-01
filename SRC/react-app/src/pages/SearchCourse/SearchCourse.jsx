import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './SearchCourse.css';
import axios from 'axios'; 

function SearchCourse() {
    const [error, setError] = useState("");
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [no, resNo] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
 
    const handleSearch = async (query) => {
        const { noOfResults, search } = query;
        resNo(noOfResults)

        try {
            const response = await axios.get("/api/student/search", {
                params: { search }
            });
            setHasSearched(true)

            if (response.status === 200) {
                console.log("The response was ok!");
                setResults(response.data);
                setError(""); // Clear errors
            } else { 
                setError("There was an issue with the search.")
            }
        } catch (err) {
            console.log("There was an error: ", err)
            setError(err.response.data)
        }
    }

    const indexOfLastResult = currentPage * no;
    const indexOfFirstResult = indexOfLastResult - no;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (currentPage < Math.ceil(results.length / no)) {
            setCurrentPage(currentPage + 1);
        }
    }

  return (
    <div className='search-container'>
        <div className='search-bar'>
            <SearchBar onSearch={handleSearch}/>
        </div>
    
    {/* Conditional rendering for results */}
    {hasSearched ? (
        results.length > 0 ? (
            <>
                <div className='results-container'>
                    <ul className='course-list'>
                        {currentResults.map((course, idx) => (
                            <li key={idx}>
                                <h3>{course.courseName}</h3>
                                <p><strong>Course Code: </strong>{course.courseCode}</p>
                                <p><strong>Description: </strong>{course.courseDescription}</p>
                                <p><strong>Credit: </strong>{course.credits}</p>
                            </li>
                        ))}
                    </ul>

                    {/* Pagination controls */}
                    <div className='pagination'>
                        <div
                            style={{
                                border: 'solid 2px #345',
                                padding: '5px 10px',
                                borderRadius: '2px',
                            }}
                        >
                            {1}
                        </div>
                        <button onClick={prevPage}>Previous</button>
                        <div
                            style={{
                                border: 'solid 2px #345',
                                padding: '5px 10px',
                                borderRadius: '5px',
                            }}
                        >
                            {currentPage}
                        </div>
                        <button onClick={nextPage}>Next</button>
                        <div
                            style={{
                                border: 'solid 2px #345',
                                padding: '5px 10px',
                                borderRadius: '2px',
                            }}
                        >
                            {Math.ceil(results.length / no)}
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <h3 className='not-searched'>Enter a course name or code to view.</h3>
        )
    ) : (
        <h3 className='no-results'>There are no courses for this search.</h3>
    )}

    {/* Display error if it exists */}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default SearchCourse