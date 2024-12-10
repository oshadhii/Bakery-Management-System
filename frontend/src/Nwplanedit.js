import React,{useState, useEffect} from 'react';
import './Nwplan.css';
import './tables.css';
import TargetPlan from './Components/targetplanbtn';
import Buttonrow from './Components/Buttonrow';
import axios from 'axios';

function Nwplanedit() {


  

   


  return (

    <>
    
   <h1 className="salesmanag" > Edit Target plan</h1>
   <Buttonrow/>  
<hr/>


<TargetPlan/>
<br/><br/><br/><br/>


<div className="table5">
  <h6 className="tableheading">Target Plan</h6>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Product ID</th>
        <th>Predicted Quantity</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {targetplan.map((plan)=>(

        <tr key={plan._id} > 
          <td className=''><b>{plan.targetPlan.date}</b></td>
          <td className=''><b> {plan.targetPlan.productID}</b></td>
          <td className=''><b> {plan.targetPlan.predictedQuantity }</b></td> 
          <td>
            <button className='editbutton' >Update</button>
            <button className='deletebutton' onClick={()=> handleDelete(plan._id)}>Delete</button>
          </td>
        </tr>
        ))
      }
    </tbody>
  </table>
</div>

    </>
  );
}

export default Nwplanedit;
