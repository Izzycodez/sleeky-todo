import React from 'react'

const Footer = ({items}) => {
    const itemsNumber = items.length
  return (
    // For this footer we're just going to display the number of items/ item on our todo list.
    <div className='footer'> You have  {itemsNumber} {itemsNumber >1 ? "items" : 'item'} in your list</div>
  )
}

export default Footer