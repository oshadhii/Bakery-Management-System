import React, { useEffect,useState } from 'react';
import './Product_Report.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header.js'; 
import axios from 'axios';

function Product_Report(){
    const Navigate = useNavigate();

    //Sent Ptoduction section: form data
    const [sentItems, setSentItems] = useState([]);
    const [schInput, setSchInput] = useState('');//search

    const filteredProduct = sentItems.filter(item =>
        item.stock && item.stock.date.toUpperCase().includes(schInput.toUpperCase())
      );


      const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/sendstock/delete/${id}`)
        .then(response => {
            if(response.data.success){
                setSentItems(sentItems.filter(items => items._id ===  id));
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
    

    useEffect(() => {
        // Fetch posts from the backend
        axios.get('http://localhost:8000/sendstock')
            .then(response => {
                if (response.data.success) {
                    const updatedItems = response.data.existingPosts.map(item => ({
                        ...item,
                    }));
                    setSentItems(updatedItems);
                }
                else {
                    alert('Failed to fetch posts');
                }
            })
            .catch(error => {
                alert('There was an error fetching the posts!', error);
            });  
    });

    return(
        <>
        <div className='ProductReport'>
        <div className='product-main'>
            <Header/>
            <h1><center><u>Sent stock Details to Production Section</u></center></h1><br/><br/>
            <input type='search' name='search' className='searchProduct' id='search' value={schInput}
             onChange={(e) => setSchInput(e.target.value)} placeholder='Search items here'/>
            {filteredProduct.map((item)=>(
            <div className='product-content' key={item._id}>
                <h3 className='dateLabel'>Date: <label>{item.stock.date}</label></h3><br/>
                <h3>Ingredient ID : <label>{item.stock.ingredientCode}</label></h3>
                <h3>Ingredient Name : <label>{item.stock.ingredientName}</label></h3>
                <h3>Unit Price : <label>{item.stock.unitPrice}</label></h3>
                <h3>Sent Quantity : <label>{item.stock.sendQuantity}</label></h3>
                <button className='stockDeleteBtn' onClick={() => {handleDelete(item._id)}}>Delete</button>
            </div>
            ))}
        </div>
        </div>
        </>
    )

}

export default Product_Report;