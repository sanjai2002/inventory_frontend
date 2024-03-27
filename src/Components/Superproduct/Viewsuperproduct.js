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

    const Removeproduct = (superProductId) => {
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
            axios.delete('https://localhost:7282/api/Superproduct/RemovesuperProduct/' + superProductId)
              .then(res => {
              }).catch(err => console.log(err), []);
            Swal.fire({
              title: "Deleted!",
              text: "product has been deleted.",
              icon: "success"
            });
          }
         
        });
        window.location.reload();
      }

    return (
      <>
       <div className="productalert">
    <br></br>
<div className="Expiry">
    <div className="Orange-circle">
    </div>
    <div className="ExpiryName">Stock Alert-below 1000 product
    </div>
    </div>
    </div>
        <div className="Superproduct">
        <table className="table table " >
            <thead >
                <tr>
                    <th>Products Id</th>
                    <th>Product code</th>
                    <th>Product Category</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Product Image</th>
                    <th>Buying Price</th>
                    <th>Selling Price</th>
                    <th>ExpiryDate</th>
                    <th>Stock</th>
                    <th>Update</th>
                    <th>Delete</th>
                    
                </tr>
            </thead>
            <tbody>

                {
                    data.map((d, i) => (
                      d.stock <1000 ?<>
                        <tr key={i} className="DelaerBlink">
                            <td>{d.superProductId}</td>
                            <td>{d.productcode}</td>
                            <td>{d.productCategory}</td>
                            <td>{d.productName}</td>
                            <td>{d.description}</td>
                            <img src={"data:image/png;base64,"+ d.productImage} className="" style={{ "width": "100px"}}></img>
                            <td>{d.buyingPrice}</td>
                            <td>{d.sellingPrice}</td>
                            <td>{d.expiryDate}</td>
                            <td>{d.stock}</td>
                            <td>
                  <Link to={`/UpdateSuperproduct/${d.superProductId}`} className="btn btn-primary m-2">Update</Link>

                                  </td>
                <td>
                <button onClick={e => Removeproduct(d.superProductId)} className="btn btn-danger">Delete</button>
                </td>
                        </tr>
                        </>:
                        <>
                          <tr key={i}>
                            <td>{d.superProductId}</td>
                            <td>{d.productcode}</td>
                            <td>{d.productCategory}</td>
                            <td>{d.productName}</td>
                            <td>{d.description}</td>
                            <img src={"data:image/png;base64,"+ d.productImage} className="" style={{ "width": "80px", }}></img>
                            <td>{d.buyingPrice}</td>
                            <td>{d.sellingPrice}</td>
                            <td>{d.expiryDate}</td>
                            <td>{d.stock}</td>
                            <td>
                  <Link to={`/UpdateSuperproduct/${d.superProductId}`} className="btn btn-primary m-2">Update</Link>

                                  </td>
                <td>
                <button onClick={e => Removeproduct(d.superProductId)} className="btn btn-danger">Delete</button>
                </td>
                        </tr>
                        </>
                    ))
                }
            </tbody>
        </table>
        </div>
        </>
    )
}
export default Viewsuperproduct;