import React from 'react'

const Item = ({handleDelete, handlecheckBox, tasks}) => {
  return (
    <div>
      {tasks.length ? (
        <ol>
          {tasks.map((item) => (
            <li key={item.id} className='list'>
              <span>
                 {item.item}
                </span>
              <input
                type="checkbox"
                onChange={() => handlecheckBox(item.id)}
                checked={item.checked}
              />
              <button onClick={() => handleDelete(item.id) }>Delete</button>
            </li>
          ))}
        </ol>
      ) : (
        <h1>ADD AN ITEM</h1>
      )}
    </div>
  );
}

export default Item