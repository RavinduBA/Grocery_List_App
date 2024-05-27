import React from 'react'

function Searchitem({search, setSearch}) {
    return (
        <form className='searchForm' onSubmit={(e) => e.preventDefault()}>{/* tops the browser from submitting the form and refreshing the page when the submit button is clicked. This is commonly used in 
        forms where you want to handle the form submission manually through JavaScript without a page refresh.*/}

            <label htmlFor='search'>Search:</label>
            <input
                type='text'
                id='search'
                role='searchbox'
                placeholder='Search Items' 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
        </form>

    )
}

export default Searchitem