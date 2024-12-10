import React, { useState } from 'react';
import '../ProductBackground.css'

const RequestStaff = () => {
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    department: '',
    staffNeeded: '',
    justification: '',
  });

  const [managerEmail, setManagerEmail] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, jobTitle, department, staffNeeded, justification } = formData;

    const emailBody = `Name: ${name}%0D%0AJob Title: ${jobTitle}%0D%0ADepartment: ${department}%0D%0AStaff Needed: ${staffNeeded}%0D%0AJustification: ${justification}`;
    
    // Redirect to the user's email client with the provided data
    window.location.href = `mailto:${managerEmail}?subject=Staff Request&body=${emailBody}`;
  };

  return (
    <div className="request-staff-modal">
      <h2>Request Additional Staff</h2>
      <form onSubmit={handleSubmit}>
        <div className="request-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="request-form-group">
          <label htmlFor="job-title">Job Title</label>
          <input
            type="text"
            id="job-title"
            placeholder="Enter your job title"
            // value={formData.jobTitle}
            onChange={handleChange}
          />
        </div>
        <div className="request-form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            placeholder="Enter your department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>
        <div className="request-form-group">
          <label htmlFor="staff-needed">Additional Staff Needed</label>
          <input
            type="number"
            id="staff-needed"
            placeholder="Enter the number"
            // value={formData.staffNeeded}
            onChange={handleChange}
          />
        </div>
        <div className="request-form-group request-full-width">
          <label htmlFor="justification">Justification</label>
          <textarea
            id="justification"
            placeholder="Provide a brief justification"
            value={formData.justification}
            onChange={handleChange}
          />
        </div>

        {/* Email input field for manager email */}
        <div className="request-form-group">
          <label htmlFor="manager-email">Manager's Email</label>
          <input
            type="email"
            id="manager-email"
            placeholder="Enter manager's email"
            value={managerEmail}
            onChange={(e) => setManagerEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="request-submit-btn">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestStaff;
