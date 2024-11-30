import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [search, setSearch] = useState("")
    const [noOfResults, setNoResults] = useState(10);

    const handleSearch = () => {
        // Pass both search and noOfResults to the parent component
        onSearch({ noOfResults, search });
      };

  return (
    <div className='searchbar-container'>
        <select onChange={(e) => setNoResults(e.target.value)}
            className='n-search'>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={50}>25</option>  
        </select>

        <input
            type="text"
            placeholder="Search a course..."
            value={search} // Correctly bind to `search` state
            onChange={(e) => setSearch(e.target.value)} // Update state on input
            className="search-input"
        />

        <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  )
}

export default SearchBar