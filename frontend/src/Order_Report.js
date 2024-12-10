import React, { useEffect,useState } from 'react';
import './Order_Report.css';
import Header from './Header.js'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Order_Report(){
    const Navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [schInput, setSchInput] = useState('');//search

    useEffect(() => {
        // Fetch posts from the backend
        axios.get('http://localhost:8000/supplierrequest')
            .then(response => {
                if (response.data.success) {
                    const updatedItems = response.data.existingPosts.map(item => ({
                        ...item,
                    }));
                    setItems(updatedItems);
                }
                else {
                    alert('Failed to fetch posts');
                }
            })
            .catch(error => {
                alert('There was an error fetching the posts!', error);
            });  
    });


    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/supplierrequest/delete/${id}`)
        .then(response => {
            if(response.data.success){
                setItems(items.filter(items => items._id ===  id));
            }
            else{
                alert('Failed to delete data..');
            }
        })

        .catch(error =>{
            console.error('There was an error deleting the item:', error);
            alert('There was an error in deleting items');
        })
    }

    const filteredOrder = items.filter(item =>
        item.order && item.order.date.toUpperCase().includes(schInput.toUpperCase())
      );



    return(
        <>
        <div className='OrderReport'>
        <div className='Order-main'>
            <Header/>
            <h1><center><u>Ingredient Order Request deails</u></center></h1><br/><br/>
            <input type='search' name='search' className='searchOrder' id='search' value={schInput}
             onChange={(e) => setSchInput(e.target.value)} placeholder='Search items here'/>


            {filteredOrder.map((item)=>(
            <div className='Order-content' key={item._id}>
                <h3 className='dateLabel'>Date: <label>{item.order?.date}</label></h3><br/>
                <h3>Ingredient ID : <label>{item.order?.ingredientCode}</label></h3>
                <h3>Ingredient Name : <label>{item.order?.ingredientName}</label></h3>
                <h3>Sent Quantity : <label>{item.order?.orderQuantity}</label></h3>
                <button className='stockDeleteBtn' onClick={() => {handleDelete(item._id)}}>Delete</button>
            </div>
            ))}

        </div>
        </div>
        </>
    )


}

export default Order_Report;