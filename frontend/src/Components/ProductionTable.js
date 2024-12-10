import { useState, useEffect } from 'react';
import '../tables.css';
import '../salesnew.css';

// Define the backend API endpoint
const API_URL = 'http://localhost:8000/productions';  // Update the URL if needed

function Prform() {
    const [productions, setProductions] = useState([]);
    const [productID, setProductID] = useState('');
    const [date, setDate] = useState('');
    const [unitCost, setUnitCost] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [searchDate, setSearchDate] = useState(''); // Add searchDate state
    const [productSearch, setProductSearch] = useState(''); // Add product search state

    // Fetch production details from the backend
    const fetchProductions = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setProductions(data);  // Ensure data matches the format from backend
        } catch (error) {
            console.error('Error fetching productions:', error);
        }
    };

    useEffect(() => {
        fetchProductions();
    }, []);

    // Filter productions by the search date and product name
    const filteredProductions = productions.filter(production => {
        const productionDate = new Date(production.date).toLocaleDateString();
        const searchDateFormatted = new Date(searchDate).toLocaleDateString();

        // Apply filters for both date and product name
        const matchesDate = searchDate ? productionDate === searchDateFormatted : true;
        const matchesProductName = productSearch
            ? production.products.some(product => 
                product.productName.toLowerCase().includes(productSearch.toLowerCase()))
            : true;

        return matchesDate && matchesProductName;
    });

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productID,
                    date,
                    unitCost,
                    productQuantity,
                }),
            });

            if (!response.ok) throw new Error('Failed to post production');
            const newProduction = await response.json();
            setProductions([...productions, newProduction]);
            // Reset form fields
            setProductID('');
            setDate('');
            setUnitCost('');
            setProductQuantity('');
        } catch (error) {
            console.error('Error submitting production:', error);
        }
    };

    return (
        <>
            <hr className='saleshr'/>


            <div className='salestables'>
            <div className="table4">
                <h6 className="tableheading">Production Details</h6>

                {/* Date Range Search Bar */}
                <div className="prsearch-container">
                    <input 
                        type="date" 
                        className="search" 
                        id="search" 
                        name="search" 
                        placeholder='Search by Date' 
                        value={searchDate} 
                        onChange={(e) => setSearchDate(e.target.value)} 
                    />
                </div>

                {/* Product Name Search Bar */}
                <div className="prsearch-container" style={{ marginTop: '1rem' }}>
                    <input
                        type="text"
                        className="prsearch"
                        placeholder="Search by Product Name"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                    />
                </div>


                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProductions.length > 0 ? (
                            filteredProductions.map((production, index) => (
                                production.products.map((product, productIndex) => (
                                    <tr key={`${index}-${productIndex}`}>
                                        {productIndex === 0 && (
                                            <td rowSpan={production.products.length}>
                                                {new Date(production.date).toLocaleDateString()}
                                            </td>
                                        )}
                                        <td>{product.productName}</td>
                                        <td>{product.quantity}</td>
                                        <td>Rs. {product.unitPrice}</td>

                                      
                                    </tr>
                                   
                                ))
                            ))
                        ): (
                            
                            <tr>
                                <td colSpan="4">No production data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    );
}

export default Prform;

