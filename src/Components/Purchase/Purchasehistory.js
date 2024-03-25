import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../../Styles/Orderhistory.css'
import orderimages from '../../Images/Order food-amico.png'
function Purchasehistory(){
    const [data, setData] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
      axios.post('https://localhost:7282/api/Purchase/Getpurchasedetails',{
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
        <div className="Purhistory">
            <div>
          <table className="table table-striped">
            <thead>
                <tr>
                    <th>Purchase Id</th>
                    <th>purchase Date</th>    
                    <th>Product Name</th>         
                    <th>Quantity</th>
                    <th>Bill Id</th>
                    <th>Product Amount</th>  
                </tr>
            </thead>
            <tbody>
                {
                    data.map((d,i) => (
                        <tr key={i}>
                            <td>{d.purchaseId}</td>
                            <td>{d.purchaseDate}</td>
                            <td>{d.superProduct.productName}</td>    
                            <td>{d.count}</td>
                            <td>{d.billId}</td>
                            <td>{d.productAmount}</td>
                            
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
        {/* <div className="orderhistoryimg">
            <img src={orderimages}></img>
        </div> */}
        </div>
        </>
    )
}
export default Purchasehistory;

