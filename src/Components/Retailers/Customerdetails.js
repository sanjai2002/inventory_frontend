import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../../Styles/Orderhistory.css'
import orderimages from '../../Images/Customer relationship management-pana.png'

function Customerdetails(){
    const [data, setData] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
      axios.post('https://localhost:7282/api/Customer/GetCustomerdetails',{
        retailerid:Cookies.get("retailerid")
    })
    .then(res => {
      setData(res.data);
      console.log(res.data);   
})
     .catch(err => console.log(err));
    },[])
    return(
        <>
        <div className="orderhistory">
            <div>
          <table className="table table-striped">
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Mobile Number</th>
                    {/* <th>Credit points</th> */}
                </tr>
            </thead>
            <tbody>
                {
                    data.map((d,i) => (
                        <tr key={i}>
                            <td>{d.customerID}</td>
                            <td>{d.customerName}</td>
                            <td>{d.mobileNumber}</td>
                            {/* <td>{d.creditpoints}</td> */}
                
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>

        <div className="Customerimg">
            <img src={orderimages}></img>
        </div>
        </div>
        </>
    )
}
export default Customerdetails;
