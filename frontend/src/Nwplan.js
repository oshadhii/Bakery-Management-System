// import React, { useState, useEffect } from 'react';
// import './Nwplan.css';
// import './tables.css';

// import TargetPlan from './Components/targetplanbtn'
// import Buttonrow from './Components/Buttonrow'
// import axios from 'axios';



// function Nwplan() {
//   const [addTargetPlan, setAddTargetPlan] = useState(false);
//   const [itemid, setItemid] = useState('');
//   const [edate, setEdate] = useState('');
//   const [eqnty, setEqnty] = useState('');
//   const [targetplan, setTargetplan] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:8000/saleplan')
//       .then(response => {
//         if (response.data.success) {
//           setTargetplan(response.data.mypost);
//         } else {
//           alert('Failed to read');
//         }
//       })
//       .catch(error => {
//         alert('There was an error fetching the post', error);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:8000/saleplan/delete/${id}`)
//       .then(response => {
//         if (response.data.success) {
//           setTargetplan(targetplan.filter(plan => plan._id !== id));
//           alert('Data deleted successfully');
//         } else {
//           alert('Failed to delete data');
//         }
//       })
//       .catch(error => {
//         alert('There was an error in deleting items');
//       });
//   };

//   const handleUpdates = (itemid) => {
//     // Validation logic
//     if (!edate || !eqnty) {
//       alert('All fields are required.');
//       return;
//     }
//     if (isNaN(eqnty) || parseFloat(eqnty) <= 0) {
//       alert('Predicted quantity must be a positive number.');
//       return;
//     }

//     axios.put(`http://localhost:8000/saleplan/update/${itemid}`, {
//       date: edate,
//       predictedQuantity: eqnty
//     })
//       .then(response => {
//         if (response.data.success) {
//           setTargetplan(targetplan.map(newone =>
//             newone._id === itemid ? { ...newone, targetPlan: { ...newone.targetPlan, date: edate, predictedQuantity: eqnty } } : newone
//           ));
//           alert('Data updated successfully');
//         } else {
//           alert('Data not updated');
//         }
//       })
//       .catch(error => {
//         console.error('There was an error', error);
//         alert('Error happened');
//       });
//   };

//   // Filter target plan based on search query
//   const filteredPlans = targetplan.filter(plan =>
//     plan.targetPlan.productID.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       <h1 className="salesmanag">Target plan</h1>
//       <Buttonrow />
//       <hr className='saleshr'/>
//       <TargetPlan />
//       <br /><br /><br /><br /><br/><br/><br/>

//       {/* Search Bar */}
//       <div className="targetplansearch">
//         <input
//           type="text"
//           placeholder="Search by product name..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       <div className='salestables'>
//         <div className="table5">
//           <h6 className="tableheading">Target Plan</h6>
//           <table>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Product Name</th>
//                 <th>Predicted Quantity</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPlans.map((plan) => (
//                 <tr key={plan._id}>
//                   <td><b>{plan.targetPlan.date}</b></td>
//                   <td><b>{plan.targetPlan.productID}</b></td>
//                   <td><b>{plan.targetPlan.predictedQuantity}</b></td>
//                   <td>
//                     <button className='seditbutton' onClick={() => { setAddTargetPlan(true); setItemid(plan._id); setEdate(plan.targetPlan.date); setEqnty(plan.targetPlan.predictedQuantity); }}>Update</button>
//                     <button className='sdeletebutton' onClick={() => handleDelete(plan._id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {addTargetPlan && (
//         <div className="smodal-overlay">
//           <div className="smodal-content">
//             <h1 className='formhaeding'>Edit Target Plan</h1>

//             <div className="tpform">
//             <p>{itemid}</p>

//             <label htmlFor="tpdate">Date:</label>
//             <input
//               type="date"
//               id="tpdate"
//               name="date"
//               value={edate}
//               onChange={(e) => setEdate(e.target.value)}
//             />
//             <br />

//             <label htmlFor="predictedqnty">Predicted Quantity:</label>
//             <input
//               type="text"
//               id="predictedqnty"
//               name="predictedQuantity"
//               value={eqnty}
//               onChange={(e) => setEqnty(e.target.value)}
//             />
//             </div>
//             <br />

//             <button
//               type="submit"
//               className='seditbutton'
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleUpdates(itemid);
//                 setAddTargetPlan(false);
//               }}
              
//             >
              
//               Save Edits
//             </button>
//             <button className="sdeletebutton"onClick={() => setAddTargetPlan(false)}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Nwplan;


import React, { useState, useEffect } from 'react';
import './Nwplan.css';
import './tables.css';
import TargetPlan from './Components/targetplanbtn';
import Buttonrow from "./Components/Buttonrow";
import axios from 'axios';

function Nwplan() {
  const [addTargetPlan, setAddTargetPlan] = useState(false);
  const [itemid, setItemid] = useState('');
  const [edate, setEdate] = useState('');
  const [eqnty, setEqnty] = useState('');
  const [targetplan, setTargetplan] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [managerEmail, setManagerEmail] = useState('');

  // Newly added state for product selection
  const [productOptions, setProductOptions] = useState([
    'Sausage Bun',
    'Cheese Bun',
    'Chicken Bun',
    'Fish Bun',
    'Egg Bun'
  ]);
  const [selectedProduct, setSelectedProduct] = useState(''); // State to hold the selected product

  useEffect(() => {
    axios.get('http://localhost:8000/saleplan')
      .then(response => {
        if (response.data.success) {
          setTargetplan(response.data.mypost);
        } else {
          alert('Failed to read');
        }
      })
      .catch(error => {
        alert('There was an error fetching the post', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/saleplan/delete/${id}`)
      .then(response => {
        if (response.data.success) {
          setTargetplan(targetplan.filter(plan => plan._id !== id));
          alert('Data deleted successfully');
        } else {
          alert('Failed to delete data');
        }
      })
      .catch(error => {
        alert('There was an error in deleting items');
      });
  };

  const handleUpdates = (itemid) => {
    if (!edate || !eqnty || !selectedProduct) { // Check if all fields are filled
      alert('All fields are required.');
      return;
    }
    if (isNaN(eqnty) || parseFloat(eqnty) <= 0) {
      alert('Predicted quantity must be a positive number.');
      return;
    }

    axios.put(`http://localhost:8000/saleplan/update/${itemid}`, {
      date: edate,
      predictedQuantity: eqnty,
      productID: selectedProduct // Send the selected product ID with the update
    })
      .then(response => {
        if (response.data.success) {
          setTargetplan(targetplan.map(newone =>
            newone._id === itemid ? { ...newone, targetPlan: { ...newone.targetPlan, date: edate, predictedQuantity: eqnty, productID: selectedProduct } } : newone
          ));
          alert('Data updated successfully');
        } else {
          alert('Data not updated');
        }
      })
      .catch(error => {
        console.error('There was an error', error);
        alert('Error happened');
      });
  };

  // Filter target plan based on search query
  const filteredPlans = targetplan.filter(plan =>
    plan.targetPlan.productID.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle email submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const emailBody = filteredPlans.map(plan => {
      return `Product: ${plan.targetPlan.productID}, Predicted Quantity: ${plan.targetPlan.predictedQuantity}, Date: ${plan.targetPlan.date}`;
    }).join('%0D%0A'); // Encodes newline characters for the email body

    window.location.href = `mailto:${managerEmail}?subject=Target Plan&body=${emailBody}`;
  };

  return (
    <>
      <h1 className="salesmanag">Target plan</h1>
      <Buttonrow />
      <hr className='saleshr'/>
      <TargetPlan />
      <br /><br /><br /><br /><br/><br/><br/>

      {/* Search Bar */}
      <div className="targetplansearch">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='salestables'>
        <div className="table5">
          <h6 className="tableheading">Target Plan</h6>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Product Name</th>
                <th>Predicted Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <tr key={plan._id}>
                  <td><b>{plan.targetPlan.date}</b></td>
                  <td><b>{plan.targetPlan.productID}</b></td>
                  <td><b>{plan.targetPlan.predictedQuantity}</b></td>
                  <td>
                    <button className='seditbutton' onClick={() => { 
                      setAddTargetPlan(true); 
                      setItemid(plan._id); 
                      setEdate(plan.targetPlan.date); 
                      setEqnty(plan.targetPlan.predictedQuantity); 
                      setSelectedProduct(plan.targetPlan.productID); // Set the selected product for editing
                    }}>Update</button>
                    <button className='sdeletebutton' onClick={() => handleDelete(plan._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Email Submission */}
      <form onSubmit={handleEmailSubmit}>
        <div className="imalemail-section">
          <label htmlFor="manager-email">Manager's Email:</label>
          <input
            type="email"
            id="manager-email"
            placeholder="Enter Manager's Email"
            value={managerEmail}
            onChange={(e) => setManagerEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="sdeletebutton">Send Email</button>
      </form>

      {addTargetPlan && (
        <div className="smodal-overlay">
          <div className="smodal-content">
            <h1 className='formhaeding'>Edit Target Plan</h1>

            <div className="tpform">
              <p>{itemid}</p>

              <label htmlFor="product-select">Product Name:</label>
              <select
                id="product-select"
                value={selectedProduct} // Set the selected product in the dropdown
                onChange={(e) => setSelectedProduct(e.target.value)} // Update the selected product
                required // Ensure the product selection is required
              >
                <option value="">Select a product</option>
                {productOptions.map((product, index) => (
                  <option key={index} value={product}>{product}</option>
                ))}
              </select>
              <br />

              <label htmlFor="tpdate">Date:</label>
              <input
                type="date"
                id="tpdate"
                name="date"
                value={edate}
                onChange={(e) => setEdate(e.target.value)}
              />
              <br />

              <label htmlFor="predictedqnty">Predicted Quantity:</label>
              <input
                type="text"
                id="predictedqnty"
                name="predictedQuantity"
                value={eqnty}
                onChange={(e) => setEqnty(e.target.value)}
              />
            </div>
            <br />

            <button
              type="submit"
              className='seditbutton'
              onClick={(e) => {
                e.preventDefault();
                handleUpdates(itemid);
                setAddTargetPlan(false);
              }}
            >
              Save Edits
            </button>
            <button className="sdeletebutton" onClick={() => setAddTargetPlan(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Nwplan;