// import React, { useState } from 'react';
// import './Customer.css';
// import { Navigate, useNavigate } from 'react-router-dom';

// function Customer() {

//     const Navigate= useNavigate();

//     const [itemId, setItemId] = useState('');
//     const [name, setname] = useState('');
//     const [Address, setAddress] = useState('');
//     const [Phone_number, setPhone_number] = useState('');
//     const [Email, setEmail] = useState('');
//     const [user_name, setuser_name] = useState('');
//     const [password, setpassword] = useState('');

//     const handleUpdate = (itemId) => {
//         const itemToUpdate = items.find(item => item._id === itemId);

        

//         axios.put(`http://localhost:8000/posts/update/${itemId}`,
//         {
//             name: newName,
//             Address: newAddress,
//             Phone_number: newPhone_number,
//             Email: newEmail,
//             user_name: newuser_name,
//             password: newpassword
//         })
//         .then(Response => {
//             if (Response.data.success){
//                 setItemId(items.map(item =>
//                     item._id === itemId ? {...item, customer: {...item.customer, name: newname, Address: newAddress, Phone_number: newPhone_number, Email: newEmail, user_name: newuser_name, password: newpassword } } : item
//                 ));
//                 alert('data updated successfully...');
//             }
//         })
//     }

//     return (
//         <>
//             <div className="Cus"></div>
//             <div className="det"><h1>Edit Information</h1></div>
            

//             <div className="fm">
//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="name">Name</label>
//                     <input type="text" id="name" name="name" value={customer.name} onChange={handleChange} />
//                     <br/>
//                     <label htmlFor="addrs">Address</label>
//                     <input type="text" id="addrs" name="address" value={customer.address} onChange={handleChange} />
//                     <br/>
//                     <label htmlFor="num">Phone number</label>
//                     <input type="number" id="num" name="phone" value={customer.phone} onChange={handleChange} />
//                     <br/>
//                     <label htmlFor="email">Email</label>
//                     <input type="email" id="email" name="email" value={customer.email} onChange={handleChange} />
//                     <br/>
//                     <label htmlFor="email">User Name</label>
//                     <input type="text" id="uName" name="uName" value={customer.email} onChange={handleChange} />
//                     <br/>
//                     <label htmlFor="email">Password</label>
//                     <input type="text" id="pWord" name="pWord" value={customer.email} onChange={handleChange} />
//                     <br/>
//                     <button type="submit" className="submit-button">Submit</button><br></br>
//                 </form>
//             </div>
//         </>
//     );
// }

// export default Customer;
