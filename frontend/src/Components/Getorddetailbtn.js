import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Getorddetailbtn() {
  

  const Navigate=useNavigate();
    const[addsalesdet,setaddsalesdet]=useState(false);
  return (

    <>
    <button  onClick={()=>setaddsalesdet(true)} className="tablebutton">
      Add new Sale Record
    </button>

    {
        
        addsalesdet && (

        <form>
        <div><h1 className="getdet">Get Today Sales Details </h1></div>


        <lable for ="type "> Sale record type  :</lable>
        <select id ="type " name ="type ">
            
            <option  value ="Wholesale Details">Wholesale Details</option>
            <option  value ="Delivery Details">Delivery Details</option>
            <option  value ="Online Details">Online Details</option>
            </select><br/>
        <lable for ="date "> Date :</lable>   
        <input type ="date" id ="date " name ="date " /><br/>
        
        <button  type = "submit" id ="getsaledetails ">Get sales Details</button>

        </form>

    )}
    </>
  );
}

export default Getorddetailbtn;