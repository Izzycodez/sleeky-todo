import React from 'react'

const Footer = ({tasks}) => {
    const tasksNumber =tasks.length
  return (
    // For this footer we're just going to display the number oftasks/ item on our todo list.
    <div className='footer'> You have  {tasksNumber} {tasksNumber >1 ? "tastasks" : 'item'} in your list</div>
  )
}

export default Footer