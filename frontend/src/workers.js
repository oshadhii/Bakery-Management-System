import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Full.css';

function Workers() {
  const navigate = useNavigate();
  const [newTemporary, setNewTemporary] = useState({
    EmployeeID: '',
    Date: '',
    NameWithInitials: '',
    PhoneNumber: '',
    AssignedTask: '',
    EmployeeEmail: '',
  });

  const [errors, setErrors] = useState({});
  const [tempEmployees, setTempEmployees] = useState([]);

  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    // Check if EmployeeID is not empty
    if (!newTemporary.EmployeeID.trim()) {
      newErrors.EmployeeID = 'Employee ID is required';
    }

    // Check if Date is not empty
    if (!newTemporary.Date) {
      newErrors.Date = 'Date is required';
    }

    // Check if NameWithInitials is not empty
    if (!newTemporary.NameWithInitials.trim()) {
      newErrors.NameWithInitials = 'Name with initials is required';
    }

    // Check if PhoneNumber is not empty and follows a valid format
    const phonePattern = /^[0-9]{10}$/;
    if (!newTemporary.PhoneNumber.trim()) {
      newErrors.PhoneNumber = 'Phone number is required';
    } else if (!phonePattern.test(newTemporary.PhoneNumber)) {
      newErrors.PhoneNumber = 'Phone number must be 10 digits';
    }

    // Check if AssignedTask is not empty
    if (!newTemporary.AssignedTask.trim()) {
      newErrors.AssignedTask = 'Assigned task is required';
    }

    // Check if EmployeeEmail is not empty and is a valid email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newTemporary.EmployeeEmail.trim()) {
      newErrors.EmployeeEmail = 'Employee email is required';
    } else if (!emailPattern.test(newTemporary.EmployeeEmail)) {
      newErrors.EmployeeEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleTempEmployee = (e) => {
    const { name, value } = e.target;
    setNewTemporary({ ...newTemporary, [name]: value });
  };

  const handleTempForSave = (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (!validateForm()) {
      return;
    }

    // Send data via axios to the backend
    axios.post('http://localhost:8000/TempWorks/save', { Tempory: newTemporary })
      .then((response) => {
        if (response.data.success) {
          setTempEmployees([...tempEmployees, response.data.Tempory]);
          setNewTemporary({
            EmployeeID: '',
            Date: '',
            NameWithInitials: '',
            PhoneNumber: '',
            AssignedTask: '',
            EmployeeEmail: '',
          });
          navigate('/Extra'); // Navigate after successful save
        } else {
          alert('Error while adding data.');
        }
      })
      .catch((error) => {
        alert('Error while adding data.');
        console.error(error); // Log the error for debugging
      });
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    navigate('/employees');
  };

  return (
    <>
      <div className="Kaviex">
        <form onSubmit={handleTempForSave}>
          <h3>Temporary Workers Details</h3>

          <label htmlFor="id">Employee Id</label>
          <input
            type="text"
            id="EmployeeID"
            name="EmployeeID"
            value={newTemporary.EmployeeID}
            onChange={handleTempEmployee}
          />
          {errors.EmployeeID && <p style={{ color: 'red' }}>{errors.EmployeeID}</p>}

          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="Date"
            name="Date"
            value={newTemporary.Date}
            onChange={handleTempEmployee}
          />
          {errors.Date && <p style={{ color: 'red' }}>{errors.Date}</p>}

          <label htmlFor="name">Name with initials</label>
          <input
            type="text"
            id="NameWithInitials"
            name="NameWithInitials"
            value={newTemporary.NameWithInitials}
            onChange={handleTempEmployee}
          />
          {errors.NameWithInitials && <p style={{ color: 'red' }}>{errors.NameWithInitials}</p>}

          <label htmlFor="num">Phone number</label>
          <input
            type="text"
            id="PhoneNumber"
            name="PhoneNumber"
            value={newTemporary.PhoneNumber}
            onChange={handleTempEmployee}
          />
          {errors.PhoneNumber && <p style={{ color: 'red' }}>{errors.PhoneNumber}</p>}

          <label htmlFor="at">Assigned task</label>
          <input
            type="text"
            id="AssignedTask"
            name="AssignedTask"
            value={newTemporary.AssignedTask}
            onChange={handleTempEmployee}
          />
          {errors.AssignedTask && <p style={{ color: 'red' }}>{errors.AssignedTask}</p>}

          <label htmlFor="email">Employee Email</label>
          <input
            type="email"
            id="EmployeeEmail"
            name="EmployeeEmail"
            value={newTemporary.EmployeeEmail}
            onChange={handleTempEmployee}
          />
          {errors.EmployeeEmail && <p style={{ color: 'red' }}>{errors.EmployeeEmail}</p>}

          <input
            id="Kavibt"
            type="submit"
            value="Save"
          />
          <button
            id="Kavibt1"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default Workers;