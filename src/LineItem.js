import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';


function LineItem({ item, handleCheck, handleDelete }) {
    return (
        <li className="item" >
            <input
                type="checkbox"
                onChange={() => handleCheck(item.id)}  //When the checkbox state changes (i.e., when it's clicked), 
                //the provided arrow function is called. This arrow function invokes the handleCheck function, passing item.id as an argument
                checked={item.checked}
            />
            <label
                style={(item.checked) ? { textDecoration: 'line-through' } : null}
                onDoubleClick={() => handleCheck(item.id)}
            >{item.item}</label>
            <FaTrashAlt
                onClick={() => handleDelete(item.id)}
                role="button"
                tabIndex="0"
            />
        </li>

    )
}

export default LineItem