import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import orderimages  from '../../Images/Order food-amico.png'
function Manageorders() {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('https://localhost:7282/api/Purchase/GetAllPurchase')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="Superproduct">
        <div>
        <table className="table table " >
            <thead >
                <tr>
                    <th>purchaseId</th>
                    <th>purchaseDate</th>
                    <th>Shop Name</th>
                    <th>ProductName</th>
                    <th>Count</th>
                    <th>Bill id</th>
                    <th>Product Amount</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((d, i) => (
                        <tr key={i}>
                            <td>{d.purchaseId}</td>
                            <td>{d.purchaseDate}</td>
                             <td>{d.retailer.shopName}</td>
                            <td>{d.superProduct.productName}</td>
                            <td>{d.count}</td>
                            <td>{d.billId}</td>
                            <td>{d.productAmount}</td>
                            
                            <td>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
        <div>
        <img src={orderimages}></img>
        </div>
        </div>
    )
}

export default Manageorders;