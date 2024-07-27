import React,{useState , useEffect} from 'react'
import Footer from './ToDo/Footer'
import Item from './ToDo/Item'
import AddForm from './ToDo/AddForm'
import './index.css'
import axios from "axios";


const App = () => {
    //The tasks refers to the tasks we want to perform, we'll make it an array of objects
    // containing the id, the task and the state of the task, i.e if completed or not
    const [tasks, setTasks] = useState([])
    const [newitem, setNewItem] = useState('')
    
    //since we're loading data through fetch we have to use the useeffect function to prevent
    //abnormalities in our app
     useEffect(() => {
       axios
         .get("/api/tasks")
         .then((response) => {
           setTasks(response.data);
         })
         .catch((error) => {
           console.error(error);
         });
     }, []);
  
    const handleAdd= async(item)=>{
        //We have to come up with a way to handle our tasks and push them into the tasks array
        const id = tasks.length ? tasks[tasks.length-1].id + 1 : 1;
        const newTask = {id,item, checked:false}
        const itemlist = [...tasks, newTask]
        setTasks((i)=>itemlist)
        //Now we're adding a task to our list, we'll use the post method
          await axios.post("/api/tasks", itemlist);
    }
    const handleSubmit = (e) =>{
        // e.preventDefault will stop the page from reloading after filling the form and submitting
        e.preventDefault();
        if (!newitem) return
         handleAdd(newitem)

        setNewItem('');
    }
    const handlecheckBox =async (id)=>{
        // we have to look outfor changes in the state of the tasks, we have to know which box was altered
        const itemlist =tasks.map((item) => item.id === id ? {...item, checked: !item.checked} : item);
        setTasks(itemlist);
        //we single out the change and the Patch
            await axios.put(`/api/tasks/${id}`, itemlist);

    }
    const handleDelete =async (id)=>{
            await axios.delete(`/api/tasks/${id}`);
        const itemlist = tasks.filter((item)=> item.id !== id)
        setTasks(itemlist);
        // we do the delete method to deletethe task that was deleted
        
    }
  return (
    <div className='container'>
        <AddForm
        newitem={newitem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        />
        <div className='item'>
                <Item
                handleDelete={handleDelete}
                handlecheckBox={handlecheckBox}
                tasks={tasks}
                />
            
        </div>
    
      <Footer tasks={tasks} />
    </div>
  ); 
}

export default App