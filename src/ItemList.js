import React from 'react'
import LineItem from './LineItem'

function ItemList({ items, handleCheck, handleDelete }) {
    return (
        <ul>
            {items.map((item) => (

                <LineItem
                    item={item}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            ))}
        </ul>
    )
}

export default ItemList