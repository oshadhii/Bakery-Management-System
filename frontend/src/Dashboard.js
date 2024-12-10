import React, { useEffect, useState } from 'react'
import './Dashboard.css';
import Header from './Header.js'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard(){

    const Navigate = useNavigate();
    const [itemId,setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [addQuantity, setAddQuantity] = useState('');
    const [remveQuantity, setRemveQuantity] = useState('');


    //add new ingredients
    const [items, setItems] = useState([]);
    const [newItem, setNewItem]= useState({
        itemCode:'',
        itemName:'',
        unitPrice:0,
        stockType:'',
        addQuantity:'',
        reOrder:''
    })

    const [schInput, setSchInput] = useState('');//search


    const updateStatus=(availableQuantity, reOrder)=>{
        const available = Number(availableQuantity);
        const reorder = Number(reOrder);
        return available > reorder ? 'in order':'out of stock';
    }



    const [addSection, setAddSection] = useState(false);
    const [removeSection, setRemoveSection] = useState(false);
    const [addItemSection, setAddItemSection] = useState(false);
    const [sentProduct, setSentProduct] = useState(false);



//Sent stock to production section: View part
    useEffect(() => {
        // Fetch posts from the backend
        axios.get('http://localhost:8000/inventory')
            .then(response => {
                if (response.data.success) {
                    const updatedItems = response.data.existingPosts.map(item => ({
                        ...item,
                        status: updateStatus(item.inventory.addQuantity, item.inventory.reOrder)
                    }));
                    setItems(updatedItems);
                }
                else {
                    alert('Failed to fetch posts');
                }
            })
            .catch(error => {
            });  
    });

    


    const handleInputChange = (e)=> {
        const {name, value} = e.target;
        setNewItem({...newItem, [name]: value});
    }
    
    const handleForSubmit = () => {
    
        const { itemCode, itemName, unitPrice, stockType, addQuantity, reOrder } = newItem;
    
        if (!itemCode || !itemName || !unitPrice || !stockType || !addQuantity || !reOrder) {
            alert('Please fill in all fields');
            return;
        }
    
        if (isNaN(unitPrice) || isNaN(addQuantity) || isNaN(reOrder)) {
            alert('Please enter valid numeric values for Unit Price, Add Quantity, and Re-order Level');
            return;
        }
    
        if (Number(unitPrice) < 0 || Number(addQuantity) < 0 || Number(reOrder) < 0) {
            alert('Please enter positive values for Unit Price, Add Quantity, and Re-order Level');
            return;
        }
    
        // If validation passes, submit the form
        axios.post('http://localhost:8000/inventory/save', { inventory: newItem })
            .then(response => {
                if (response.data.success) {
                    setItems([...items, response.data.inventory]);
                    setAddItemSection(false);
                    setNewItem({
                        itemCode: '',
                        itemName: '',
                        unitPrice: 0,
                        stockType: '',
                        addQuantity: '',
                        reOrder: ''
                    });
                    alert('Successfully added new item');
                } else {
                    alert('Failed to add new item');
                }
            })
            .catch(error => {
                alert('Error adding new item', error);
            });
    };
    

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/inventory/delete/${id}`)
        .then(response => {
            if(response.data.success){
                setItems(items.filter(items => items._id ===  id));
                alert('Data deleted Successfully..');
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


    //update ekee calculate wena kallaaa.. try ekak
    const calculateNewQuantity = (currentQuantity, addedQuantity) => {
        const currentQty = parseInt(currentQuantity || 0, 10);
        const addedQty = parseInt(addedQuantity || 0, 10);
        return currentQty + addedQty;
    };


    const handleUpdate = (itemId) => {
    
        if (!addQuantity) {
            alert('Please enter a quantity');
            return;
        }
    
        if (isNaN(addQuantity) || Number(addQuantity) <= 0) {
            alert('Please enter a valid positive number for the quantity');
            return;
        }
    
        // Continue with updating the quantity
        const itemToUpdate = items.find(item => item._id === itemId);
        const newQuantity = calculateNewQuantity(itemToUpdate.inventory.addQuantity, addQuantity);
        
        axios.put(`http://localhost:8000/inventory/update/${itemId}`, { addQuantity: newQuantity })
            .then(response => {
                if (response.data.success) {
                    setItems(items.map(item =>
                        item._id === itemId ? { ...item, inventory: { ...item.inventory, addQuantity: newQuantity } } : item
                    ));
                    alert('Data updated successfully');
                } else {
                    alert('Data not updated');
                }
            })
            .catch(error => {
                alert('There was an error updating the item', error);
            });
    };
    





    const removeQuantity = (currentQuantity, addedQuantity) => {
        const currentQty = parseInt(currentQuantity || 0, 10);
        const addedQty = parseInt(addedQuantity || 0, 10);
        return currentQty - addedQty;
    };


    const handleUpdateRemove = (itemId) => {
    
        if (!remveQuantity) {
            alert('Please enter a quantity to remove');
            return;
        }
    
        if (isNaN(remveQuantity) || Number(remveQuantity) <= 0) {
            alert('Please enter a valid positive number for the quantity');
            return;
        }
    
        const itemToUpdate = items.find(item => item._id === itemId);
        const newQuantity = removeQuantity(itemToUpdate.inventory.addQuantity, remveQuantity);
    
        axios.put(`http://localhost:8000/inventory/update/${itemId}`, { addQuantity: newQuantity })
            .then(response => {
                if (response.data.success) {
                    setItems(items.map(item =>
                        item._id === itemId ? { ...item, inventory: { ...item.inventory, addQuantity: newQuantity } } : item
                    ));
                } else {
                    alert('Data not updated');
                }
            })
            .catch(error => {
                alert('There was an error updating the item', error);
            });
    };
    




    //------------Sent Stocks production: Add section--------------
    //Sent Ptoduction section: form data
    const [sentItems, setSentItems] = useState([]);
    const [newSentItems, setNewSentItems]= useState({
        date:'',
        ingredientCode:'',
        ingredientName:'',
        unitPrice:'',
        sendQuantity:'',
    })


    const productHandleInputChange = (e)=> {
        const {name, value} = e.target;
        setNewSentItems({...newSentItems, [name]: value});
    }
    
    const productHandleForSubmit = (e) => {

    const { date, ingredientCode, ingredientName, unitPrice, sendQuantity } = newSentItems;

    if (!date || !ingredientCode || !ingredientName || !unitPrice || !sendQuantity) {
        alert('Please fill in all fields');
        return;
    }

    if (isNaN(unitPrice) || isNaN(sendQuantity)) {
        alert('Please enter valid numeric values for Unit Price and Send Quantity');
        return;
    }

    if (Number(unitPrice) < 0 || Number(sendQuantity) < 0) {
        alert('Please enter positive values for Unit Price and Send Quantity');
        return;
    }



    axios.post('http://localhost:8000/sendstock/save', { stock: newSentItems })
        .then(response => {
            if (response.data.success) {
                setSentItems([...sentItems, response.data.stock]);
                setSentProduct(false);
                setNewSentItems({
                    date: '',
                    ingredientCode: '',
                    ingredientName: '',
                    unitPrice: '',
                    sendQuantity: ''
                });
                alert('Successfully added new sent item');
            } else {
                alert('Failed to add new sent item');
            }
        })
        .catch(error => {
            alert('Error adding new sent item', error);
        });
};



    const filteredEmp = items.filter(item =>
        item.inventory && item.inventory.itemCode.toUpperCase().includes(schInput.toUpperCase())
      );





return(

   <>
   <div className='inventoryDashboard'>
   <Header/>
    <div className='background'>
        <br/><br/><br/>
        <h1 align='center'className="dashboardtopic">Inventory Dashboard</h1><br/><br/>
        <div className="body">
        <div className = 'bottom-btn'>
            <button className='new-ingre'onClick={()=>setAddItemSection(true)}>Add new Ingredient</button><br/>
            {
                addItemSection &&(

                    <div className='addItem-main'>
                            <div className='addItemNext-body'>

                                <div className = 'addItem-topic'>
                                    <br/>
                                    <p className = 'topic'><b>Add new <br/> Ingredient</b></p>
                                </div>

                                <form className = 'addItem-form'>
                                    <p>New item code:<br/>
                                    <input type='text' className = 'addItem-input' name='itemCode' value={newItem.itemCode} onChange={handleInputChange}/></p>

                                    <p>New Item Name:<br/>
                                    <input type='text' className = 'addItem-input' name='itemName' value={newItem.itemName} onChange={handleInputChange}/></p>

                                    <p>Unit price in Rupees:<br/>
                                    <input type='number' className = 'addItem-input' name='unitPrice' value={newItem.unitPrice} onChange={handleInputChange}/></p>

                                    <p>Stock type: <br/>
                                        <select className ='addItem-select' name='stockType' value={newItem.stockType} onChange={handleInputChange}>
                                            <option>select one</option>
                                            <option>Kilo Gram</option>
                                            <option>Litres</option>
                                        </select>
                                    </p>

                                    <p>Add quantity size: <br/>
                                    <input type='number' className = 'addItem-input' name='addQuantity' value={newItem.addQuantity} onChange={handleInputChange}/></p>

                                    <p>Stock re-order Level:<br/>
                                    <input type='number' className = 'addItem-input' name='reOrder' value={newItem.reOrder} onChange={handleInputChange}/></p>

                                    <input type='submit'className = 'addItem-btn'onClick={() => handleForSubmit()}/><br/>
                                    <div className='addBtnCancel'>
                                        <input type='button' className='addCancel' value='Cancel' onClick={()=>setAddItemSection(false)}/>
                                    </div>
                                    
                                </form>
                            </div>
                    </div>

                )
            }
            <button className='productSentBtn' onClick={()=>setSentProduct(true)}>Sent Production Section</button>
            {
                sentProduct &&(
                    <div className='productAdd-main'>
                        <div className='product-body'>

                            <div className = 'product-topic'></div>

                                <form className = 'product-form' onSubmit={productHandleForSubmit}>
                                    <h1><center>Sent Production Section</center></h1>
                                    <p>Date : <br/>
                                    <input type='date' className = 'product-input' name='date' value={newSentItems.date} onChange={productHandleInputChange}/>
                                    </p>
                                    <p>Enter ingredient code : <br/>
                                    <input type='text' className = 'product-input' name='ingredientCode' value={newSentItems.ingredientCode} onChange={productHandleInputChange}/></p>

                                    <p>Enter ingredient Name : <br/>
                                    <input type='text' className = 'product-input' name='ingredientName' value={newSentItems.ingredientName} onChange={productHandleInputChange}/></p>

                                    <p>Unit Price in Rupees : <br/>
                                    <input type='number' className = 'product-input' name='unitPrice' value={newSentItems.unitPrice} onChange={productHandleInputChange}/></p>

                                    <p>Quantity Send to Production : <br/>
                                    <input type='number' className = 'product-input' name='sendQuantity' value={newSentItems.sendQuantity} onChange={productHandleInputChange}/></p>

                                    <input type='submit'className = 'product-btn'/><br/>
                                    <button className='productCancelBtn' onClick={()=>Navigate('/dashboard')}>Cancel</button>
                                    
                                </form>
                        </div>
                    </div>

                )
            }
            <button className='order' onClick={()=>Navigate('./request')}>Add Order Request</button>
            <button className='report' onClick={()=>Navigate('./generatereport')}>Generate Reports</button>
            <button className='sup_report' onClick={()=>Navigate('./orderreport')}>Order Reports</button>
            <button className='product_report' onClick={()=>Navigate('./productreport')}>Production Sent Reports</button>
        </div>
        <div className = 'main' id='main'>
            <div className = 'table'>
            <input type='search' name='search' className='search' id='search' value={schInput}
             onChange={(e) => setSchInput(e.target.value)} placeholder='Search items here'/>

                <table className = 'main-table'>
                    <thead>
                    <tr className='colomn-topics'>
                        <th className="itemNo"><b>Item Code</b></th>
                        <th className="name"><b>Item name</b></th>
                        <th className="price"><b>Unit Price</b></th>
                        <th className="type">stock type</th>
                        <th className="available"><b>Available quantity</b></th>
                        <th className="reOrder"><b>Re-Order Level</b></th>
                        <th className="status"><b>Stock Status</b></th>
                        <th className="buttons"> </th>
                        <th className="deleteBtn"> </th>
                    </tr>
                    </thead>
                    <tbody>
                        {filteredEmp.map((item)=>(

                            
                            <tr key={item._id}>
                                <td className=""><b>{item.inventory.itemCode}</b></td>
                                <td className=""><b>{item.inventory.itemName || 'N/A'}</b></td>
                                <td className=""><b>{item.inventory.unitPrice}</b></td>
                                <td className=""><b>{item.inventory.stockType}</b></td>
                                <td className=""><b>{item.inventory.addQuantity || 'N/A'}</b></td>
                                <td className=""><b>{item.inventory.reOrder || 'N/A'}</b></td>
                                <td className=""><b>
                                    <span className={item.status === 'in order' ? 'status-inOrder' : 'status-outOfStock'}>
                                        {item.status}
                                    </span></b></td>
                                <td className="btns">
                                <div className = 'sideBtn'>
                                    
                                    
                    <button onClick={() =>{
                        setItemId(item._id);
                        setAddSection(true);
                        setItemName(item.inventory.itemName)
                    }}
                    className = 'addBtn'>+ Add</button><br/>
                            {

                                addSection &&(

                                <div className='add-main'>
                                    <br/><br/><br/><br/>
                                    <div className='next-body'></div>


                                    <div className = 'add-body'>
                                        <div className = 'add-topic'>
                                            <p className='ad'>Add <br/> new <br/>Quantity</p>
                                        </div>


                                    <form className='add-quantity'>
                                        <p className='add-itemId'>{itemId}</p>
                                        <p className='itemName'><b>Item Name: {itemName}</b></p>
                                        <p className='addSize'>Enter stock quantity<br/>
                                        <input type ='number' className='input' value={item.addQuantity} onChange={(e) => setAddQuantity(e.target.value)} placeholder='Enter here'/>
                                        </p>

                                        <input type ='submit' className = 'addSubmit' onClick={() => handleUpdate(itemId)}/>
                                        <br/><br/>
                                        <button className = 'back-btn' onClick={() => setAddSection(false)}>Back</button>
                                    </form>

                                </div>
                </div>
                            )
                    }
                        <button onClick={() =>{
                             setRemoveSection(true)
                             setItemId(item._id);
                             setItemName(item.inventory.itemName)

                              }} className='removeBtn'>- Remove</button>
                        {
                            removeSection &&(

                                <div className='remove-main'>
                                    <br/><br/><br/><br/>
                                    <div className='next-body'></div>


                                    <div className = 'remove-body'>
                                        <div className = 'remove-topic'>
                                            <p className='rm'>Remove <br/> exist <br/>Quantity</p>
                                        </div>

                                    <form className='remove-quantity'>
                                        <p className='rem-itemId'>{itemId}</p>


                                        
                                        <p className='itemName'><b>Item Name: {itemName}</b></p>

                                        <p className='remove-size'><b>size of quantity</b><br/>
                                        <input type ='number' className='input' value={item.remveQuantity} onChange={(e) => setRemveQuantity(e.target.value)} placeholder='Enter here'/></p>

                                        {/*<p>Reason for removing<br/>
                                        <input type = 'text' className='input'/></p>

                                        <p>removed Date<br/>
                                        <input type = 'date' className='input'/></p><br/>*/}

                                        <input type='submit' className='removeSubmit' onClick={(e) => {
                                                                handleUpdateRemove(itemId);
                                                                setRemoveSection(false);
                                                            }} /><br/><br/>
                                        <button className = 'back-btn' onClick={() => setRemoveSection(false)}>Back</button><br/>
                                    </form>

                                </div>
                </div>

                            )
                        }
                    </div><br/>
                    <button className="delete" onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                    ))}

                    
                    </tbody>
                </table>
            </div>

        </div><br/><br/><br/><br/><br/><br/>

            </div><br/><br/><br/><br/>

            

    </div>

    </div>

    </>  
)
}

export default Dashboard;