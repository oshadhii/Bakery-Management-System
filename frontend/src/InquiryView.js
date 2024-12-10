import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './CustomerView.css';

function InquiryView(){
    const navigate = useNavigate();

    const [items, setItems] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8000/inquiry/read')
        .then(response => {
          if (response.data.success) {
            setItems(response.data.inquiry);
          } else {
            alert('Failed to fetch posts');
          }
        })
        .catch(error => {
          alert('There was an error fetching the posts!', error);
        });
    }, []);
  
    return(
    <>
    <header>
    </header>

      <div className="customercontainer1">
        <h3>Inquiry Details</h3>
        <div className='customerTable'>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Preferred Method Of Response</th>
              <th>Questionor Concerns</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item)=> (
              <tr key={item._id}>
                <td>{item.inquiryTable?.Name}</td>
                  <td>{item.inquiryTable?.Email}</td>
                  <td>{item.inquiryTable?.Phone_Number}</td>
                  <td>{item.inquiryTable?.PreferredMethodOfResponse}</td>
                  <td>{item.inquiryTable?.QuestionorConcerns}</td>
                  <td>{item.inquiryTable?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}

export default InquiryView;