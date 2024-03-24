import axios from "axios";
import { useEffect, useState,useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { v4 as uuid } from "uuid";
import '../../Styles/Bill.css'
import { useReactToPrint } from 'react-to-print';

function CustomerOrder(){
  
  const [data, setData] = useState([])
  useEffect(() => {
    axios.post('https://localhost:7282/api/Product/FindRetailer', {
      retailerid: Cookies.get("retailerid")
    })
      .then(res => {
        setData(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, [])

  const Billid = "RZ"+ uuid().slice(0, 8);
  // const AutoBillid= useState(Billid);
  // console.log(AutoBillid);
  
    const [values, setValues] = useState({ 
        productsId: '',
        count: '',
        mobileNumber:'',
        customerName:'',
        billId:Billid,
        retailerid:Cookies.get("retailerid"),     
    })
//genertate id
const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://localhost:7282/api/Order/Orderproduct', values)
            .then(res => {
                console.log(res);    
            })
            .catch(err => console.log(err));
            window.alert("ProductAddded");
    }
    return(
      <div className="Customer">
        <div className="CustomerorderBill">
        <div class="card ordercard ">
      <form onSubmit={handleSubmit}>
     <div class="form-row">
  
    <div class="form-group ">
      <label for="inputEmail4">Customer Name</label>
      <input type="text" class="form-control" onChange={e => setValues({ ...values, customerName: e.target.value })} placeholder="Enter the name"/>
    </div>
    <div class="form-group ">
      <label for="inputPassword4">Mobile Number</label>
      <input type="number" class="form-control"onChange={e => setValues({ ...values, mobileNumber: e.target.value })} placeholder="Enter Mobile Number"/>
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress">Product Name</label>
    <br></br>
    <select   class="form-control" id="inputAddress2"  value={values.productsId} onChange={e=>setValues({ ...values, productsId: e.target.value })}>
            {
        data.map((d)=>(
            <option value={d.productsId}>{d.productsId}-{d.productName}-</option>
            ))
        }       
 </select>
  </div>
  <div class="form-group">
    <label for="inputAddress2">count</label>
    <input type="number" class="form-control" id="inputAddress2" onChange={e => setValues({ ...values, count: e.target.value })}/>
  </div>
  <button type="submit" class="btn btn-primary">Generate Bill</button>
</form> 
</div>
<div className="Bill">
<div class="bill-container">
  <div class="shop-details">
    <h2>Your Shop Name</h2>
    <p>Address: Your Shop Address</p>
    <p>Phone: Your Shop Phone Number</p>
    <p>Email: Your Shop Email</p>
  </div>
  <div class="customer-details">
    <h2>Customer</h2>
    <p>Name:{values.customerName}</p>
    <p>Mobile Number: {values.mobileNumber}</p>
  </div>
  <div class="bill-details">
    <h2>Invoice</h2>
    <p>Invoice Number:{Billid}</p>
    <p>Date: DD/MM/YYYY</p>
    <table className="Bill">
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
      </tr> 
      <tr>
        <td>{values.productsId}</td>
        <td>{values.count}</td>
        <td>$10.00</td>
        <td>$10.00</td>
      </tr>    
    </table>
    <table>
      <tr>
        <td class="total">Subtotal</td>
        <td class="total-amount">$10.00</td>
      </tr>
      <tr>
        <td class="total">Tax (5%)</td>
        <td class="total-amount">$0.50</td>
      </tr>
      <tr>
        <td class="total">Total</td>
        <td class="total-amount">$10.50</td>
      </tr>
    </table>

  </div>
</div>
</div>
</div>
</div>
    
    )
}

export default CustomerOrder;

