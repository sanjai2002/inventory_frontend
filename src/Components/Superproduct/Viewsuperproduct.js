import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Viewsuperproduct() {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('https://localhost:7282/api/Superproduct/GetAllProducts')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="Superproduct">
        <table className="table table " >
            <thead >
                <tr>
                    <th>productsId</th>
                    <th>productcode</th>
                    <th>productCategory</th>
                    <th>productName</th>
                    <th>description</th>
                    <th>productImage</th>
                    <th>buyingPrice</th>
                    <th>sellingPrice</th>
                    <th>expiryDate</th>
                    <th>stock</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((d, i) => (
                        <tr key={i}>
                            <td>{d.superProductId}</td>
                            <td>{d.productcode}</td>
                            <td>{d.productCategory}</td>
                            <td>{d.productName}</td>
                            <td>{d.description}</td>
                            <img src={"data:image/png;base64," + d.productImage} style={{ "width": "50px" }}></img>
                            <td>{d.buyingPrice}</td>
                            <td>{d.sellingPrice}</td>
                            <td>{d.expiryDate}</td>
                            <td>{d.stock}</td>
                            <td>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    )
}

export default Viewsuperproduct;