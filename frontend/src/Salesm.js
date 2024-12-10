import { useNavigate } from "react-router-dom";
import './salesnew.css'

import Buttonrow from './Components/Buttonrow'
function Salesm(){

    const navigate = useNavigate();


    return(
        <>
            

           <h1 className="salesmanag" >  Sales Management</h1>



    <Buttonrow/>
           <hr className="saleshr"/>
          
       

    <div className="salescontent">

    <div className="salesimgdiv"><img  className="salesimg" src="sales.png" alt="sales incraesing image" /></div>
    <div className="salespara"><p classname="salesp">Sales management involves overseeing and directing the sales operations 
        of a business to meet revenue goals. It includes tracking sales performance, managing customer relationships,
         and analyzing sales data. Key features of an effective sales management system include real-time sales tracking, 
         sales forecasting, and inventory management. These tools help streamline the sales process, improve efficiency, 
         and ensure that sales targets are met consistently.</p></div> 
    
    </div>
      


        </>

        
    )
}

export default Salesm;