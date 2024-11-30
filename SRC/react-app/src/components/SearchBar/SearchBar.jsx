import React, { useState } from 'react'

function SearchBar() {
    const [search, setSearch] = useState("")
    const [error, setError] = useState("")
    const [noOfResults] = useState(10)

    const handleSubmit = () => {
        try {

        } catch (err) {
            console.log("Error is: ", err)
        }
    }
  return (
    <div className='searchbar-container'>
        <form onSubmit={handleSubmit}>
            <label htmlFor='search'></label>
            <input
            type='text'
            id={search}
            required>
            </input>

            <label htmlFor='resultNo'></label>
            <select>
                <option value="10"></option>
                <option value="15"></option>
                <option value="20"></option>
                <option value="50"></option>
            </select>
        </form>
    </div>
  )
}

export default SearchBar