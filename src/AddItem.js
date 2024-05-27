import React from 'react'
import { FaPlus } from 'react-icons/fa';

function AddItem({ newItem, setNewItem, handleSubmit }) {
    return (
        <form className='addForm' onSubmit={handleSubmit}> {/* an event handler that is triggered when the form is submitted. 
        The handleSubmit function is called when the form is submitted */}
            <label htmlFor='addItem' >Add Item</label>

            {/* the autoFocus attribute is used to automatically focus on the input field when the page loads */}
            {/* the id attribute is used to uniquely identify the input field */}
            {/* the required attribute is used to specify that the input field must be filled out before submitting the form */}
            {/* the value attribute is used to set the initial value of the input field */}
            {/* the onChange attribute is used to specify the function that is called when the input field value changes */}
            <input
                autoFocus
                id='addItem'
                type='text'
                placeholder='Add Item'
                required
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button
                type='submit'
                aria-label='Add Item'
            >
                <FaPlus />
            </button>

        </form>

    )
}

export default AddItem