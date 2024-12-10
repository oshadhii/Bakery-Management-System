import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.css';
import Admin from './Admin';
import './Full.css';

function Salary() {
  const [employees, setEmployees] = useState([]);
  const [addSec, setAddSec] = useState(false);  // Popup
  const [month, setMonth] = useState('');  // Store selected month
  const [year, setYear] = useState('');    // Store selected year
  const [bonusPercentage, setBonusPercentage] = useState(0); // Store entered bonus percentage

  useEffect(() => {        
    // Fetch employee data from the backend
    axios.get('http://localhost:8000/register')
      .then(response => {
        if (response.data.success) {
          setEmployees(response.data.mypost);
        } else {
          alert('Failed to fetch posts');
        }
      })
      .catch(error => {
        alert('There was an error fetching the posts!', error);
      });
  }, []);

  // Function to recalculate employee salaries based on month, year, and bonus percentage
  const recalculateSalaries = () => {
    const updatedEmployees = employees.map(emp => {
      const basicSalary = parseFloat(emp.employeeRegister?.BasicSalary) || 0;
      let bonuses = 0;
  
      // Apply bonuses for April and December only
      if (month.toLowerCase() === 'april' || month.toLowerCase() === 'december') {
        const enteredBonus = (bonusPercentage / 100) * basicSalary;
  
        // Normalize the designation to lowercase for consistent comparison
        const designation = emp.employeeRegister?.Designation?.toLowerCase() || '';
  
        switch (designation) {
          case 'employee manager':
          case 'sales manager':
          case 'delivery manager':
          case 'order manager':
          case 'production manager':
          case 'inventory manager':
          case 'supplier manager':
          case 'customer manager':
            bonuses = enteredBonus; // 100% of entered bonus
            break;
          case 'delivery driver':
            bonuses = enteredBonus * 0.50; // 50% of entered bonus
            break;
          case 'bread baker':
          case 'cake baker':
          case 'cookies baker':
          case 'buns baker':
            bonuses = enteredBonus * 0.75; // 75% of entered bonus
            break;
          default:
            bonuses = 0;
        }
      }
  
      const healthInsurance = basicSalary * 0.09;
      const employeeEPF = basicSalary * 0.08;
      const companyEPF = basicSalary * 0.12;
      const companyETF = basicSalary * 0.03;
      const netSalary = (basicSalary + bonuses + healthInsurance) - employeeEPF;
  
      return {
        ...emp,
        bonuses: bonuses.toFixed(2),
        healthInsurance: healthInsurance.toFixed(2),
        employeeEPF: employeeEPF.toFixed(2),
        companyEPF: companyEPF.toFixed(2),
        companyETF: companyETF.toFixed(2),
        netSalary: netSalary.toFixed(2),
      };
    });
  
    setEmployees(updatedEmployees);
  };
  

  // Function to handle saving the salary data
  const handleSave = async () => {
    try {
      await Promise.all(employees.map(async emp => {
        const salaryData = {
          ID: emp.employeeRegister?.EmployeeID || '',
          Name: emp.employeeRegister?.NameWithInitials || '',
          Designation: emp.employeeRegister?.Designation || '',
          Month: month,
          Year: year,
          BasicSalary: emp.employeeRegister?.BasicSalary || '0.00',
          TotalAdditions: [
            { Bonuses: emp.bonuses || '0.00', HealthInsurance: emp.healthInsurance || '0.00' }
          ],
          TotalDeductions: [
            { EmployeeEPF: emp.employeeEPF || '0.00' }
          ],
          CompanyEPF: emp.companyEPF || '0.00',
          CompanyETF: emp.companyETF || '0.00',
          NetSalary: emp.netSalary || '0.00',
        };

        await axios.post('http://localhost:8000/SalaryPost/save', { Salary: salaryData });
      }));

      alert('Salaries saved successfully!');
    } catch (err) {
      alert('Error saving salaries:', err.message);
    }
  };

  return (
    <>
      <div className="Kavipayroll-container">
        <div className="Kavipayroll-header">
          <Admin />
          <h3>Employees Salary Summary</h3>
        </div>
        <div className="Kavitabsal">
          <div className="Kavicontrols">
            <label>
              Month:
              <select value={month} onChange={(e) => setMonth(e.target.value.toLowerCase())}>
                <option value="">Select Month</option>
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
            </label>
            <label>
              Year:
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Enter Year"
              />
            </label>
            <label>
              Bonus Percentage:
              <input
                type="number"
                value={bonusPercentage}
                onChange={(e) => setBonusPercentage(e.target.value)}
                placeholder="Enter Bonus Percentage"
              />
            </label>
            <button onClick={recalculateSalaries}>Apply</button>
          </div>

          <table className="KaviTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Basic Salary (Rs.)</th>
                <th>Bonuses (Rs.)</th>
                <th>Health Insurance (Rs.)</th>
                <th>Employee EPF (Rs.)</th>
                <th>Company EPF (Rs.)</th>
                <th>Company ETF (Rs.)</th>
                <th>Net Salary (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.employeeRegister?.EmployeeID || '-'}</td>
                  <td>{emp.employeeRegister?.NameWithInitials || '-'}</td>
                  <td>{emp.employeeRegister?.Designation || '-'}</td>
                  <td>{parseFloat(emp.employeeRegister?.BasicSalary)?.toFixed(2) || '0.00'}</td>
                  <td>{emp.bonuses || '0.00'}</td>
                  <td>{emp.healthInsurance || '0.00'}</td>
                  <td>{emp.employeeEPF || '0.00'}</td>
                  <td>{emp.companyEPF || '0.00'}</td>
                  <td>{emp.companyETF || '0.00'}</td>
                  <td>{emp.netSalary || '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="Kavipayroll-footer">
            <button className="Kavisubmitbtn" onClick={() => setAddSec(true)}>
              Submit Payroll
            </button><br />
            <button className="Kavisavebtn" type="button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>

        {addSec && (
          <div className="Kavipayroll">
            <div className="Kavipayroll-sidebar">
              <h2>Total Salary Expenses</h2>
              <div className="Kavipayroll-summary">
                <h3>Payroll Summary</h3>
                <p>Total Salary Amount (Rs.): {employees.reduce((total, emp) => total + parseFloat(emp.netSalary || 0), 0).toFixed(2)}</p>
                <p>Total E.P.F Expenses (Rs.): {employees.reduce((total, emp) => total + parseFloat(emp.companyEPF || 0), 0).toFixed(2)}</p>
                <p>Total E.T.F Expenses (Rs.): {employees.reduce((total, emp) => total + parseFloat(emp.companyETF || 0), 0).toFixed(2)}</p>
                <p>Total Additions (Rs.): {employees.reduce((total, emp) => total + parseFloat(emp.bonuses || 0) + parseFloat(emp.healthInsurance || 0), 0).toFixed(2)}</p>
                <p>Total Deductions (Rs.): {employees.reduce((total, emp) => total + parseFloat(emp.employeeEPF || 0), 0).toFixed(2)}</p>
                <div className="KavibtnContainer">
                  <button className="Kaviapprove-btn">Approve</button>
                  <button className="Kavicancel-btn" onClick={() => setAddSec(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Salary;
