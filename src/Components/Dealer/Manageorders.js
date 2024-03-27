import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Manageorder from '../../Images/Order ahead-rafiki.png'
function Manageorders() {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('https://localhost:7282/api/Purchase/GetAllPurchase')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    const handleDelivered = (id) => {
        const message = {
            purchaseId: id,
            purchasestatus: "Delivered"
        }
        axios.post(`https://localhost:7282/api/Purchase/Purchasetatus`, message).then((response) => {
            console.log(response.data);
            window.location.reload();
        })
    }
    
    const handleShipped = (id) => {
        const message = {
            purchaseId: id,
            purchasestatus: "Shipped"
        }
        axios.post(`https://localhost:7282/api/Purchase/Purchasetatus`, message).then((response) => {
            console.log(response.data);
            window.location.reload();
        })
    }

    return (
        <div className="Superproduct">
            <div>
                <table className="table table" >
                    <thead >
                        <tr>
                            <th>Purchase Id</th>
                            <th>Purchase Date</th>
                            <th>Shop Name</th>
                            <th>Product Name</th>
                            <th>Count</th>
                            <th>Bill id</th>
                            <th>Product Amount</th>
                            <th>Order Status</th>
                            <th>Update status</th>
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
                                    <td>{d.purchasestatus}</td>
           
                                    {d.purchasestatus=="Pending"?(
                                    <>
                                     <td><button className='btn btn-secondary' onClick={() => { handleShipped(d.purchaseId) }}>Shipped</button></td>
                                    </>
                                    ):d.purchasestatus=="Delivered"?
                                    <th> </th>
                                    :(
                                   <>
                                    <td><button className='btn btn-success' onClick={() => { handleDelivered(d.purchaseId) }}>Delivered</button></td>
                                   </>
                                    )
                                    }
        
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <img src={Manageorder}></img>
            </div>
        </div>
    )
}

export default Manageorders;