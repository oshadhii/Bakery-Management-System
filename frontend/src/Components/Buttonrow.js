import { useNavigate } from "react-router-dom";



function Buttonrow() {

    const navigate = useNavigate();
    return (
  
      <>
      
      <div className="button-row">
        <button className="buttonrow" type = "submit" id ="tplan " onClick={()=>navigate('/Stables')}>Get New Sales Records</button>
    <button className= "buttonrow" id ="tplan " onClick={()=>navigate('/Prform')}>Get New Production Records</button>
    <button className= "buttonrow" id ="tplan " onClick={()=>navigate('/Salesdash')}>View sales Dashboard</button>
    <button className= "buttonrow" id ="tplan " onClick={()=>navigate('/Nwplan')} >View Target Plan</button>
    
    
    </div> 

      
      </>
  
    );
  }
  
  export default Buttonrow;