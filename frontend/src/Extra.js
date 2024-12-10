import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.css';
import Admin from './Admin';
import './Full.css';

function Extra() {
    const [Tempemployees, setTempEmployees] = useState([]); // read
    const [schInput, setSchInput] = useState(''); // search
    const [managerEmail, setManagerEmail] = useState(''); // manager's email
    const [editedDate, setEditedDate] = useState({}); // for storing updated date

    useEffect(() => {
        // Read
        axios.get('http://localhost:8000/TempWorks')
            .then((response) => {
                if (response.data.success) {
                    setTempEmployees(response.data.Tempory);
                } else {
                    alert('Failed to fetch data');
                }
            })
            .catch((error) => {
                alert('There was an error fetching the post', error);
            });
    }, []); // Add empty array to avoid multiple calls

    const handleTempDelete = (id) => {
        // delete
        axios.delete(`http://localhost:8000/TempWorks/delete/${id}`)
            .then((response) => {
                if (response.data.success) {
                    setTempEmployees(Tempemployees.filter((Temp) => Temp._id !== id));
                    alert('Data deleted successfully');
                } else {
                    alert('Failed to delete data');
                }
            })
            .catch((error) => {
                alert('There was an error in deleting items');
            });
    };

    const handleDateChange = (id, date) => {
        // Update the Assigned Date for a specific employee
        setEditedDate((prevDates) => ({
            ...prevDates,
            [id]: date,
        }));
    };

    const updateAssignedDate = (id) => {
        const dateToUpdate = editedDate[id] || 'Not Assigned'; // Default to 'Not Assigned' if no input
    
        // Send the updated date to the backend
        axios.put(`http://localhost:8000/TempWorks/update/${id}`, { AssignedDate: dateToUpdate })
            .then((response) => {
                if (response.data.success) {
                    setTempEmployees(
                        Tempemployees.map((Temp) =>
                            Temp._id === id ? { ...Temp, Tempory: { ...Temp.Tempory, AssignedDate: dateToUpdate } } : Temp
                        )
                    );
                    alert('Assigned Date updated successfully');
                } else {
                    alert('Failed to update Assigned Date');
                }
            })
            .catch((error) => {
                alert('There was an error in updating Assigned Date', error);
            });
    };

    const sendEmail = (employee) => {
        // Generate the mailto link with employee details
        const subject = `Temporary Employee Details: ${employee.Tempory.AssignedTask}`;
        const emailBody = `
            Employee ID: ${employee.Tempory.EmployeeID}
            Name: ${employee.Tempory.NameWithInitials}
            Phone Number: ${employee.Tempory.PhoneNumber}
            Assigned Task: ${employee.Tempory.AssignedTask}
            Assigned Date: ${employee.Tempory.AssignedDate}
        `;

        const mailtoLink = `mailto:${managerEmail},${employee.Tempory.EmployeeEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

        // Open the user's email client
        window.location.href = mailtoLink;
    };

    // search filter
    const filteredEmp = Tempemployees.filter((Temp) =>
        Temp.Tempory?.AssignedTask.toUpperCase().includes(schInput.toUpperCase())
    );

    return (
        <>
            <div className="Kavitopic">
                <Admin />
                <h1>Temporary Workers for Bulk Orders</h1>
                <div className="Kavisch">
                    <input
                        type="text"
                        placeholder="Search: Enter Task"
                        value={schInput}
                        onChange={(e) => setSchInput(e.target.value)}
                    />
                </div>
                <div className="Kaviemail-section">
                    <label htmlFor="manager-email">Production Manager Email:</label>
                    <input
                        type="email"
                        id="managerEmail"
                        placeholder="Enter Manager's Email"
                        value={managerEmail}
                        onChange={(e) => setManagerEmail(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="KavitableContain">
                <table>
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Date</th>
                            <th>Name with initials</th>
                            <th>Phone number</th>
                            <th>Assigned task</th>
                            <th>Assigned Date</th>
                            <th>Employee Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmp.map((Temp) => (
                            <tr key={Temp._id}>
                                <td><b>{Temp.Tempory.EmployeeID}</b></td>
                                <td><b>{Temp.Tempory.Date}</b></td>
                                <td><b>{Temp.Tempory.NameWithInitials}</b></td>
                                <td><b>{Temp.Tempory.PhoneNumber}</b></td>
                                <td><b>{Temp.Tempory.AssignedTask}</b></td>
                                <td>
                                    <input
                                        className='KaviinputDate'
                                        type="date"
                                        value={editedDate[Temp._id] || Temp.Tempory.AssignedDate}
                                        onChange={(e) => handleDateChange(Temp._id, e.target.value)}
                                    />
                                    <button className='KaviAssiButton' onClick={() => updateAssignedDate(Temp._id)}>Save Date</button>
                                </td>
                                <td><b>{Temp.Tempory.EmployeeEmail}</b></td>
                                <td>
                                    <button id="Kavibut1" onClick={() => handleTempDelete(Temp._id)}>Delete</button>
                                    <button id="Kavibutt1" onClick={() => sendEmail(Temp)}>Send Email</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Extra;
