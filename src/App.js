import React,{useState , useEffect} from 'react'
import Footer from './ToDo/Footer'
import Item from './ToDo/Item'
import AddForm from './ToDo/AddForm'
import apiUpdate from './ToDo/apiUpdate'
import './index.css'

const App = () => {
    const API_URL = "http://localhost:3500/items";
    //The items refers to the tasks we want to perform, we'll make it an array of objects
    // containing the id, the task and the state of the task, i.e if completed or not
    const [items, setItems] = useState([])
    const [newitem, setNewItem] = useState('')
    const [fetchErr, setFetchErr]= useState('')
    const [loading, setLoading]=useState(true)
    
    //since we're loading data through fetch we have to use the useeffect function to prevent
    //abnormalities in our app
    useEffect(()=>{
        const fetchItems = async()=>{
            try{
                const res = await fetch(API_URL)
                if(!res.ok) throw Error(`Didn't get expected data`)
                const itemlist = await res.json()
                setItems(itemlist)
                setFetchErr(null)
            } catch(err){
                setFetchErr(err.message)
            } finally{
                setLoading(false)
            }
        }

        fetchItems()
    }, [])
  
    const handleAdd = async(item)=>{
        //We have to come up with a way to handle our tasks and push them into the items array
        const id = items.length ? items[items.length-1].id + 1 : 1;
        const newTask = {id,item, checked:false}
        const itemlist = [...items, newTask]
        setItems((i)=>itemlist)
        //Now we're adding a task to our list, we'll use the post method
        const postOpt ={
            method: 'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newTask)
        }
        const result = await apiUpdate(API_URL, postOpt)
        if (result) setFetchErr(result)
    }
    const handleSubmit = (e) =>{
        // e.preventDefault will stop the page from reloading after filling the form and submitting
        e.preventDefault();
        if (!newitem) return
         handleAdd(newitem)

        setNewItem('');
    }
    const handlecheckBox =async (id)=>{
        // we have to look outfor changes in the state of the items, we have to know which box was altered
        const itemlist =items.map((item) => item.id === id ? {...item, checked: !item.checked} : item);
        setItems(itemlist);
        //we single out the change and the Patch
        const myitem = itemlist.filter((item)=> item.id === id)
        const postOpt ={
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({checked: myitem[0].checked})
        };
        const reqUrl = `${API_URL}/${id}`
        const result = await apiUpdate(reqUrl, postOpt);
        if (result) setFetchErr(result)
    }
    const handleDelete =async (id)=>{
        const itemlist = items.filter((item)=> item.id !== id)
        setItems(itemlist);
        // we do the delete method to deletethe task that was deleted
        const deleteOpt ={method:'DELETE'}
         const reqUrl = `${API_URL}/${id}`;
         const result = await apiUpdate(reqUrl, deleteOpt);
         if (result) setFetchErr(result);
    }
  return (
    <div className='container'>
        <AddForm
        newitem={newitem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        />
        <div className='item'>

            { loading && <p>Loading data ...</p>}
            {fetchErr && <p> Error : {fetchErr}</p> }
            { !fetchErr && !loading &&

                <Item
                handleDelete={handleDelete}
                handlecheckBox={handlecheckBox}
                items={items}
                />
            }
        </div>
    
      <Footer items={items} />
    </div>
  ); 
}

export default App