import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Getprodet() {
  

  const Navigate=useNavigate();
    const[addprodet,setaddprodet]=useState(false);
  return (

    <>
    <button  onClick={()=>setaddprodet(true)} className="tablebutton">
      Add New Production Record
    </button>

    {
        
        addprodet && (

            <form>
            <div><h1 className="getdet">Get Production Details </h1></div>


            
            <lable for ="date "> Date :</lable>   
            <input type ="date" id ="date " name ="date " /><br/>
            
            <button  type = "submit" id ="subsale ">Get Details</button>

            </form>

    )}
    </>
  );
}

export default Getprodet;