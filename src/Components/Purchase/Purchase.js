import React, { useState,useEffect} from "react";
import axios from "axios";
import { Link, useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import '../../Styles/Purchase.css'
function Purchase(){
    const[count,setcount]=useState(0 );
    const [data, setData] = useState([])
const { id } = useParams();
useEffect(() => {
    axios.get('https://localhost:7282/api/Superproduct/GetByproductid/'+ id)
        .then(res => {
             setData(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const values = {
            superProductId:data.superProductId,
            retailerid: Cookies.get("retailerid") ,
            count:count,    
        }
        console.log(values);
        axios.post('https://localhost:7282/api/Purchase/Purchaseorder', values)
            .then(res => {
                console.log(res);          
            })
            .catch(err => console.log(err));
    }

    function Increment(){
        if(count<data.stock)
            return setcount(count+1);
    }
    function Decrement(){
        if(count>0)
            return setcount(count-1);
    }
    
    return(
<>

<div className="card-purchase">
  <div className="card-image">
    <img src={"data:image/png;base64," + data.productImage} alt="Product" />
  </div>
  <div className="card-body">
    <h5 className="card-title">Product Name: {data.productName}</h5>
    <h5 className="card-title">Price: {data.sellingPrice}</h5>
    <h5 className="card-title">Product Code: {data.productcode}</h5>
    <p className="card-text">{data.description}</p>
    {data.stock !== 0 ? (
      <>
        <div className="counter">
          <button className="counter-button" onClick={Decrement}>-</button>
          <span className="count">{count}</span>
          <button className="counter-button" onClick={Increment}>+</button>
        </div>
      </>
    ) : (
      <h1 className="out-of-stock">Out of Stock</h1>
    )}
    <button className="order-button" onClick={handleSubmit}>Order Now</button>
  </div>
</div>
     </>  
    )
}
export default Purchase;