import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../../Styles/Orderhistory.css'
import orderimages from '../../Images/Order food-amico.png'

function Orderhistory(){
    const [data, setData] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
      axios.post('https://localhost:7282/api/Order/Findorderhistory',{
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
                    <th>Order Id</th>
                    <th>OrderDate</th>
                    <th>Customer Name</th>
                    <th>ProductsId</th>
                    <th>Quantity</th>
                    <th>BillId</th>
                    <th>ProductAmount</th>  
                </tr>
            </thead>
            <tbody>
                {
                    data.map((d,i) => (
                        <tr key={i}>
                            <td>{d.orderId}</td>
                            <td>{d.orderDate}</td>
                            <td>{d.customer.customerName}</td>
                            <td>{d.productsId}</td>
                            <td>{d.count}</td>
                            <td>{d.billId}</td>
                            <td>{d.productAmount}</td>
                            
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
        <div className="orderhistoryimg">
            <img src={orderimages}></img>
        </div>
        </div>
        </>
    )
}
export default Orderhistory;
