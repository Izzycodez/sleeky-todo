import React from 'react'

const AddForm = ({ newitem, setNewItem, handleSubmit }) => {
  return (
    //This AddForm component is responsible for adding new entries to the list
    <form className ="addForm" onSubmit={handleSubmit}>
      <input
        type="text"
        id="addtask"
        placeholder="ADD TASK"
        required
        autoFocus
        value={newitem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

export default AddForm