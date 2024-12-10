import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';
import Admin from './Admin';
import './Full.css';

function EmployeeForm() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    EmployeeID: '',
    NameWithInitials: '',
    Address: '',
    PhoneNumber: '',
    JoinedDate: '',
    Designation: '',
    BasicSalary: '',
    Email: '',
  });

  const [errors, setErrors] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [empId, setEmpId] = useState('');
  const [addAddress, setAddAddress] = useState('');
  const [addPhone, setAddPhone] = useState('');
  const [addSalary, setAddSalary] = useState('');
  

  const validateForm = () => {
    let formErrors = {};

    if (!newEmployee.EmployeeID) formErrors.EmployeeID = "Employee ID is required";
    if (!newEmployee.NameWithInitials) formErrors.NameWithInitials = "Name is required";
    if (!newEmployee.Address) formErrors.Address = "Address is required";
    if (!newEmployee.PhoneNumber) {
      formErrors.PhoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(newEmployee.PhoneNumber)) {
      formErrors.PhoneNumber = "Phone number must be 10 digits";
    }
    if (!newEmployee.JoinedDate) formErrors.JoinedDate = "Joined date is required";
    if (!newEmployee.Designation) formErrors.Designation = "Designation is required";
    if (!newEmployee.BasicSalary || isNaN(newEmployee.BasicSalary)) {
      formErrors.BasicSalary = "Valid basic salary is required";
    }
    if (!newEmployee.Email) {
      formErrors.Email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newEmployee.Email)) {
      formErrors.Email = "Email address is invalid";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  useEffect(() => {
    axios.get('http://localhost:8000/register')
      .then(response => {
        if (response.data.success) {
          setEmployees(response.data.mypost);
        } else {
          alert('failed');
        }
      })
      .catch(error => {
        alert('There was an error fetching the post', error);
      });
  }, []);

  const handleEmployee = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  }

  const handleForSave = () => {

    if (!validateForm()) return; // Prevent submission if validation fails

    axios.post('http://localhost:8000/register/create', { employeeRegister: newEmployee })
      .then(response => {
        if (response.data.success) {
          setEmployees([...employees, response.data.employeeRegister]);
          setNewEmployee({
            EmployeeID: '', NameWithInitials: '', Address: '', PhoneNumber: '',
            JoinedDate: '', Designation: '', BasicSalary: '', Email: ''
          });
          setErrors({});
        
        
        } else {
          alert('Successfully added new Employee');
        }
      })
      .catch(error => {
        alert('There was an error adding new employees', error);
      });
  };
   
  const [addregister, setAddRegister] = useState(false); //popup  registration

  const [addSection, setAddSection] = useState(false); //popup add PERMANANT employee
  const [addEdit, setAddEdit] = useState(false);

  const navigate = useNavigate();

  const handleSalaryClick = () => {
    navigate('/salary');
  };

  const handleWorkersClick = () => {
    navigate('/workers');
  };
   
  const handleTemporyClick = () => {
    navigate('/Extra');
  };

  const handleUpdate = (empId) => {
    if (!addAddress || !addPhone) {
      alert("Address and Phone number are required");
      return;
    }

    if (!/^\d{10}$/.test(addPhone)) {
      alert("Phone number must be 10 digits");
      return;
    }

    axios.put(`http://localhost:8000/register/update/${empId}`, {
      Address: addAddress,
      PhoneNumber: addPhone,
      BasicSalary:addSalary
    })
      .then(response => {
        if (response.data.success) {
          setEmployees(employees.map(emp =>
            emp._id === empId ? { ...emp, employeeRegister: { ...emp.employeeRegister, Address: addAddress, PhoneNumber: addPhone,BasicSalary:addSalary } } : emp
          ));
          alert('Data updated successfully');
          setAddEdit(false);
        } else {
          alert('Data not updated');
        }
      })
      .catch(error => {
        console.error('There was an error', error);
        alert('Error updating data');
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/register/delete/${id}`)
      .then(response => {
        if (response.data.success) {
          setEmployees(employees.filter(emp => emp._id !== id));
          alert('Data deleted successfully');
        } else {
          alert('Failed to delete data');
        }
      })
      .catch(error => {
        alert('There was an error deleting the item');
      });
  }

  const filteredEmployees = employees.filter(emp =>
    emp.employeeRegister.EmployeeID.toUpperCase().includes(searchInput.toUpperCase())
  );

  return (
    <>
      <div className="KaviEmp">
      <Admin/>
        <div className="Kavidet"><h3>Employee Details</h3></div>
        <div className="Kavitop-section">
          <div className="Kavileft-section">
            <button id="Kaviadd" onClick={() => setAddRegister(true)} className="add">+ Add Employee</button>
            <div className="Kavisearch">
              <input type="text" placeholder="Search: Enter ID"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            <button id="Kaviextra" className="Kaviextra" onClick={handleTemporyClick}>Assign Temporary Workers</button>
            <button id="Kavisalary" className="Kavisalary" onClick={handleSalaryClick}>Salary Details</button>
          </div>
        </div>

       
        {addregister && (
              <div className="Kaviregistration-container">
              <div className="Kaviregistration-box">
                <h3>Employee Registration</h3>
                <form>
                    <div className="KaviRegistration">
                  <button id="permanent" type="button" className="Kaviregistration-btn" onClick={() => setAddSection(true)} >Permanent Employee Registration</button>
                  <button id="temporary" type="button" className="Kaviregistration-btn"onClick={handleWorkersClick}>Temporary Employee Registration</button>
                  </div>
                </form>
                </div>
              </div>
            
        )}

        {addSection && (
          <div className='form-background'>
            <div className="Kavifm">
              <form>
                <h3>Employee Registering</h3>
                <label htmlFor="id">Employee ID</label>
                <input type="text" id="id" name="EmployeeID" value={newEmployee.EmployeeID} onChange={handleEmployee} />
                {errors.EmployeeID && <p className="error">{errors.EmployeeID}</p>}
                
                <label htmlFor="name">Name with initials</label>
                <input type="text" id="name" name="NameWithInitials" value={newEmployee.NameWithInitials} onChange={handleEmployee} />
                {errors.NameWithInitials && <p className="error">{errors.NameWithInitials}</p>}

                <label htmlFor="addrs">Address</label>
                <input type="text" id="addrs" name="Address" value={newEmployee.Address} onChange={handleEmployee} />
                {errors.Address && <p className="error">{errors.Address}</p>}

                <label htmlFor="num">Phone number</label>
                <input type="text" id="num" name="PhoneNumber" value={newEmployee.PhoneNumber} onChange={handleEmployee} />
                {errors.PhoneNumber && <p className="error">{errors.PhoneNumber}</p>}

                <label htmlFor="dt">Joined date</label>
                <input type="date" id="dt" name="JoinedDate" value={newEmployee.JoinedDate} onChange={handleEmployee} />
                {errors.JoinedDate && <p className="error">{errors.JoinedDate}</p>}

                <label htmlFor="dg">Designation</label>
                <input type="text" id="dg" name="Designation" value={newEmployee.Designation} onChange={handleEmployee} />
                {errors.Designation && <p className="error">{errors.Designation}</p>}

                <label htmlFor="sal">Basic Salary</label>
                <input type="text" id="sal" name="BasicSalary" value={newEmployee.BasicSalary} onChange={handleEmployee} />
                {errors.BasicSalary && <p className="error">{errors.BasicSalary}</p>}

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="Email" value={newEmployee.Email} onChange={handleEmployee} />
                {errors.Email && <p className="error">{errors.Email}</p>}

                <input type="submit" id="Kavibtn" value="Save" onClick={handleForSave} />
                <button id="Kavibtn1" type="button" onClick={() => setAddSection(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        <div className='KavitableContainer'>
          <table>
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>Name with initials</th>
                <th>Address</th>
                <th>Phone number</th>
                <th>Joined date</th>
                <th>Designation</th>
                <th>Basic Salary (Rs.)</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp._id}>
                  <td><b>{emp.employeeRegister.EmployeeID}</b></td>
                  <td><b>{emp.employeeRegister.NameWithInitials}</b></td>
                  <td><b>{emp.employeeRegister.Address}</b></td>
                  <td><b>{emp.employeeRegister.PhoneNumber}</b></td>
                  <td><b>{emp.employeeRegister.JoinedDate}</b></td>
                  <td><b>{emp.employeeRegister.Designation}</b></td>
                  <td><b>{emp.employeeRegister.BasicSalary}</b></td>
                  <td><b>{emp.employeeRegister.Email}</b></td>
                  <td>
                    <button id="Kavibutton1" type="button" onClick={() => {
                      setEmpId(emp._id);
                      setAddEdit(true);
                    }}> Edit </button>
                    <button id="Kavibutton2" type="button" onClick={() => handleDelete(emp._id)}> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {addEdit && (
          <div className='Kaviform1'>
            <div className="Kaviupdate">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(empId);
              }}>
                <h3>Edit Employee</h3>
                <label htmlFor="addrs">Address</label>
                <input type="text" id="addrs" name="addrs" value={addAddress} onChange={(e) => setAddAddress(e.target.value)} /><br />
                <label htmlFor="num">Phone number</label>
                <input type="text" id="num" name="num" value={addPhone} onChange={(e) => setAddPhone(e.target.value)} />
                <label htmlFor="num">Basic Salary</label>
                <input type="number" id="num" name="salary" value={addSalary} onChange={(e) => setAddSalary(e.target.value)} />
                <div className='btn-container'>
                  <button id="Kavibttn" type="submit">Save</button>
                  <button id="Kavibttn1" type="button" onClick={() => setAddEdit(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EmployeeForm;
