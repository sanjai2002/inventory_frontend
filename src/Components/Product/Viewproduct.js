import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
//  import '../../Styles/Product.css'
import '../../Styles/Dealer.css'
function Viewproduct() {
  const [data, setData] = useState([])
  const navigate = useNavigate();


let today = new Date();
today.setDate(today.getDate() + 5); // Add 5 days
let month = String(today.getMonth() + 1).padStart(2, '0');
let day = String(today.getDate()).padStart(2, '0');
let dateString = today.getFullYear() + '-' + month + '-' + day;
console.log(dateString);



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

  const Removeproduct = (productsId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete('https://localhost:7282/api/Product/RemoveProduce/' + productsId)
          .then(res => {
          }).catch(err => console.log(err), []);
        Swal.fire({
          title: "Deleted!",
          text: "product has been deleted.",
          icon: "success"
        });
      }
    });
  }
  return (
    
    <table className="table table-striped">
      <thead>
        <tr>
        {/* <h1>{date}</h1> */}
          <th>ProductsId</th>
          <th>Productcode</th>
          <th>ProductCategory</th>
          <th>ProductName</th>
          <th>BuyingPrice</th>
          <th>SellingPrice</th>
          <th>ExpiryDate</th>
          <th>Stock</th>
          <th>Update  Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((d, i) => (
            d.stock == 0 ?  <>
              <tr key={i} className="blink">
                <td>{d.productsId}</td>
                <td>{d.productcode}</td>
                <td>{d.productCategory}</td>
                <td>{d.productName}</td>
                <td>{d.buyingPrice}</td>
                <td>{d.sellingPrice}</td>
                <td>{d.expiryDate}</td>
                <td>{d.stock}</td>

                <td>
                  <Link to={`/Updateproduct/${d.productsId}`} className="btn btn-primary m-2">Edit</Link>
                  <button onClick={e => Removeproduct(d.productsId)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            </> :
             d.expiryDate == dateString? <>
              <tr key={i} className="blinkDate">
                <td>{d.productsId}</td>
                <td>{d.productcode}</td>
                <td>{d.productCategory}</td>
                <td>{d.productName}</td>
                <td>{d.buyingPrice}</td>
                <td>{d.sellingPrice}</td>
                <td>{d.expiryDate}</td>
                <td>{d.stock}</td>

                <td>
                  <Link to={`/Updateproduct/${d.productsId}`} className="btn btn-primary m-2">Edit</Link>
                  <button onClick={e => Removeproduct(d.productsId)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            </> :<>
              <tr key={i}>
                <td>{d.productsId}</td>
                
                <td>{d.productcode}</td>
                <td>{d.productCategory}</td>
                <td>{d.productName}</td>
               
                <td>{d.buyingPrice}</td>
                <td>{d.sellingPrice}</td>
                <td>{d.expiryDate}</td>
                <td>{d.stock}</td>

                <td>
                
                  <Link to={`/Updateproduct/${d.productsId}`} className="btn btn-primary m-2 ">Edit</Link>
                  
                  <button onClick={e => Removeproduct(d.productsId)} type="button" class="btn btn-danger">Delete</button>
                  
                </td>
              </tr></>
              
          ))
        }
      </tbody>
    </table>
  )
}

export default Viewproduct;