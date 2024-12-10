import { useNavigate } from "react-router-dom";
import bakerImage from './images/baker.jpeg';
import './Header.css';
import Admin from './Admin';
import './Full.css';

function Display(){

    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate('/EmployeeForm'); // Navigate to the main page
      };
      const handleExtraClick = () => {
        navigate('/Extra'); // Navigate to the extra page
      };

      const handleSalaryClick = () => {
        navigate('/salary'); // Navigate to the salary page
      };



    return(
        <>
         <Admin/>
           <h1 className="Kaviemployee" >  Employee management</h1>
           <div className="Kavibuttons">
           <button   className= "Kavinew"id ="new" onClick = {handleAddClick}>Add new Employee</button>
           <button className= "Kaviextra1" id ="extra1 " onClick = {handleExtraClick} >Extra Employee</button>
           <button className= "Kavisalary1" id ="salary1 " onClick = {handleSalaryClick} > Salary</button>
         
           </div> 
           <hr className="Kavicustom-hr" />
           <div className="Kavicontent">

    <div className="Kaviimgdiv">
        <img  className="Kaviimg" src={bakerImage} alt="baker" /></div>
    <div className="Kavipara">
        <p>The Employee Management function in our Bakery Management System is designed to streamline and automate the handling of employee-related tasks.
             This feature allows bakery managers to efficiently manage their workforce by registering new employees, 
             editing or deleting existing records, and assigning temporary workers for bulk orders. 
             The system also facilitates the calculation of salaries, incorporating any necessary additions 
             or deductions, and automatically generates detailed monthly reports on salary expenses.
              

       </p>
    </div> 

    </div>
  


    </>
)
}

export default Display;