import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { v4 as uuid } from "uuid";
import '../../Styles/Bill.css'
import { useReactToPrint } from 'react-to-print';
import Swal from "sweetalert2";
function CustomerOrder() {
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
  
// const [Customermobilnumber,setCustomermobilnumber]=useState({
//   mobileNumber:""
// }
// )

// function FindCustomer(){
//   axios.post('https://localhost:7282/api/Customer/FindCustomer',Customermobilnumber)
//   .then(res => {
//       console.log(res); 
//   })
//   .catch(err => console.log(err));
//  }

let today = new Date();
today.setDate(today.getDate()); // Add 5 days
let month = String(today.getMonth() + 1).padStart(2, '0');
let day = String(today.getDate()).padStart(2, '0');
let dateString = today.getFullYear() + '-' + month + '-' + day;
const Billid = "RZ" + uuid().slice(0, 8);
const AutoBillid= useState(Billid);
const [count,setcount]= useState(0);
 console.log(AutoBillid);
  const [values, setValues] = useState({
    productsId: '',
    count: '',
    mobileNumber: '',
    customerName: '',
    billId:AutoBillid[0],
    retailerid: Cookies.get("retailerid"),
  })

const countref=useRef();
const mobileNumberref=useRef();
const customerNameref=useRef();
const productsIdref=useRef();

  const [billvalues, setBillValues] = useState({
    productsId: '',
    count: '',
    mobileNumber: '',
    productName: '',  
    productPrice: '',
    customerName: '',
    billId: Billid,
    retailerid: Cookies.get("retailerid"),
  })

  const handleProductview = (e) => {
    console.log(e.target.value);
    var result=e.target.value;
    var jsonresult= result.split("-");
    setBillValues({ ...billvalues, productsId: jsonresult[2], productName: jsonresult[0], productPrice: jsonresult[1] })
    console.log(billvalues);
    setValues({ ...values, productsId:e.target.value.split("-")[2] })
    console.log(values);
    setcount(jsonresult[3])
    console.log(jsonresult[2]);
  }

  const handleSubmit = (event) => {
     event.preventDefault();
   if(!values.count||values.count<0||!values.mobileNumber||values.mobileNumber.length<10||values.mobileNumber.length>10||!values.customerName||!values.productsId){
    if (!values.count) {
      countref.current.innerText ="Required!";
    }
    else if(values.count<0){
      countref.current.innerText ="Enter the valid input";
    }
    if (!values.mobileNumber) {
      mobileNumberref.current.innerText ="Required!";
    }
    else if(values.mobileNumber.length<10){
      mobileNumberref.current.innerText = " Please enter valid Mobile number ";
    }
    else if(values.mobileNumber.length>10){
      mobileNumberref.current.innerText = " Please enter valid Mobile number ";
    }
    if (!values.customerName) {
      customerNameref.current.innerText ="Required!";
    }
    if (!values.productsId) {
      productsIdref.current.innerText ="Required!";
    }
   }
    else{
    axios.post('https://localhost:7282/api/Order/Orderproduct', values)
      .then(res => {
        console.log(res);
        Swal.fire("Bill Generated Successfully!");

      })
      .catch(err => console.log(err));   
  }
  }

  const Email = Cookies.get('Email');
  const[Location,Setlocation]=useState();
  const[Shopname,Setshopname]=useState();
  const[Mobileno,SetMobileno]=useState();

  useEffect(()=>{
    axios.post('https://localhost:7282/api/Retailer/FindEmail',{
      email:Email
  })
  .then(res => {
   console.log(res.data);
  Setshopname(res.data.shopName);
  Setlocation(res.data.location);
  SetMobileno(res.data.mobilenumber);
})

.catch(err => console.log(err));
  },[])

  const printDiv = () => {
    const printableArea = document.getElementById('Bill').innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printableArea;
    window.print();
    document.body.innerHTML = originalContent;
  };

  return (

    <>
     {/* <div class="form-group ">
    <label for="inputPassword4">Mobile Number:</label>
    <input type="number" class="form-control" onChange={e => setCustomermobilnumber({ ...Customermobilnumber, mobileNumber: e.target.value })} placeholder="Enter Mobile Number" />
    <button onClick={FindCustomer}>Click</button>
  </div> */}
    <div className="Customer">
      <h5>Billing System</h5>
      <div className="CustomerorderBill"> 
        <div class="card ordercard ">     
          <form>
            <div class="form-row">  
          
              <div class="form-group ">
                <label for="inputEmail4">Customer Name</label>
                <input type="text" class="form-control" onChange={e => { setValues({ ...values, customerName: e.target.value }) }} placeholder="Enter the name" />
                <p ref={ customerNameref}></p>
              </div>
              <div class="form-group ">
                <label for="inputPassword4">Mobile Number</label>
                <input type="number" class="form-control" onChange={e => setValues({ ...values, mobileNumber: e.target.value })} placeholder="Enter Mobile Number" />
                <p ref={mobileNumberref}></p>
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">Product Name</label>
              <br></br>
                  <select class="form-control" id="inputAddress2" value={values.productsId} onChange={(e) =>{handleProductview(e)}}>
              <option value="" >Select a Product</option>
                  {
                data.map((d) => (
                  
                    <option value={d.productName+"-"+d.sellingPrice+"-"+d.productsId+"-"+d.stock}>{d.productsId}-{d.productName}-{d.sellingPrice}</option>
                ))
                }
               </select>    
               <p ref={productsIdref}></p>  

          {/* <select  value={values.productsId} onChange={e=>setValues({ ...values, productsId: e.target.value })}>
            {
        data.map((d)=>(
            <option value={d.productsId}>{d.productsId}-{d.productName}</option>
            ))
        }
        </select> */}
            </div>
            <div class="form-group">
              <label for="inputAddress2">Quantity</label>
              <input type="number"  min="1" class="form-control" max={count} id="inputAddress2" onChange={e => setValues({ ...values, count: e.target.value })} />
              <p ref={countref}></p>
            </div>
            <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Generate Bill</button>
          </form>
        </div>
        <div id="Bill">
          <div className="bill-container">
            <div className="shop-details">
              <h2>{Shopname}</h2>
              <p>Address: {Location}</p>
              <p>Phone: {Mobileno}</p>
              <p>Email: {Email}</p>
            </div>
            <div class="customer-details">
              <h2>Customer</h2>
              <p>Name:{values.customerName}</p>
              <p>Mobile Number: {values.mobileNumber}</p>
            </div>
            <div class="bill-details">
              <h2>Invoice</h2>
              <p>Invoice Number:{AutoBillid}</p>
              <p>Date:{dateString}</p>
              <table className="Bill">
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
                <tr>
                  <td>{billvalues.productName}</td>
                  <td>{values.count}</td>
                  <td>{billvalues.productPrice}</td>
                  <td>{billvalues.productPrice*values.count}</td>
                </tr>
              </table>
              <table>
                <tr>
                  <td class="total">Total</td>
                  < td class="total-amount">{billvalues.productPrice*values.count}</td>
                </tr>
              </table>
              <br></br>
              <button type="Bill" class="btn btn-secondary" onClick={printDiv}>Print Bill</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CustomerOrder;

