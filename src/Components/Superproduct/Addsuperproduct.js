import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import superproduct from '../../Images/1600x960_949963-nestle-01.jpg'
import Swal from "sweetalert2";
function Addsuperproduct() {
  const [values, setValues] = useState({
    productcode: '',
    productCategory: '',
    productName:'',
    description:'',
    productImage:'',
    buyingPrice:'',
    sellingPrice:'',
    expiryDate:'',
    stock:'',  
})
const navigate = useNavigate();
// const handleSubmit = (event) => {
//     event.preventDefault();
//     axios.post('https://localhost:7282/api/Superproduct/AddSuperproduct', values)
//         .then(res => {
//             console.log(res);     
//         })
//         .catch(err => console.log(err));
//         window.alert(" ProductAddded");
// }

const handleSubmit = (event) => {
  event.preventDefault();
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Add  it!"
  }).then((result) => {
    if (result.isConfirmed) {
    axios.post('https://localhost:7282/api/Superproduct/AddSuperproduct', values)
      .then(res => {
          console.log(res); 
      })
      .catch(err => console.log(err));
      Swal.fire({
        title: "Product Added Successfully!",
        icon: "success"
      });
    }
  });
  setTimeout(() => {
    navigate('/Viewsuperproduct');
  }, 1000);          
}

const handleImages=(e)=>{
    const file=e.target.files[0]
    if(file){
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=()=>{
            const base64data= reader.result;
            const base64array=base64data.toString().split(",");
            setValues({... values,productImage: base64array[1]})
        }
    }
}

  return (
    <div className="Superproduct">
    <div className="container">
      <form  onSubmit={handleSubmit}>
        <h1>Add Stock</h1>
        <div className="ui divider"></div>
        <div className="ui form">

          <div className="field">
            <label>Productcode</label>
            <input type="text" name="productcode" placeholder="Enter Productcode" onChange={e => setValues({ ...values, productcode: e.target.value })}/>
          </div>
          
          <div className="field">
            <label>productName</label>
            <input type="text" name="productName" placeholder="Enter ProductName" onChange={e => setValues({ ...values, productName: e.target.value })}/>
          </div>

          <div className="field">
            <label>Product Category</label>
            <input type="text" name="productCategory" placeholder="Enter ProductCategory" onChange={e => setValues({ ...values, productCategory: e.target.value })}/>
          </div>
          <div className="field">
            <label>Description</label>
            <input type="text" name="description" placeholder="Enter Description" onChange={e => setValues({ ...values, description: e.target.value })}/>
          </div>

          <div className="field">
            <label>ProductImage</label>
            <input type="file" multiple onChange={e=>handleImages(e)}/>
            {/* <input type="text" name="description" placeholder="description" onChange={e => setValues({ ...values, productImage: e.target.value })}/> */}
          </div>
          
          <div className="field">
            <label>BuyingPrice</label>
            <div class="ui right labeled input">
              <input type="number" placeholder="Enter buyingPrice" id="amount"onChange={e => setValues({ ...values, buyingPrice: e.target.value })} />
              <div class="ui basic label">.00</div>
            </div>
          </div>
          <div className="field">
            <label>SellingPrice</label>
            <div class="ui right labeled input">
              <input type="number" placeholder="Enter sellingPrice" id="amount"onChange={e => setValues({ ...values, sellingPrice: e.target.value })} />
              <div class="ui basic label">.00</div>
            </div>
          </div>

          <div className="field">
            <label>ExpiryDate</label>
            <div class="ui right labeled input">
              <input type="Date" placeholder="expiryDate"onChange={e => setValues({ ...values, expiryDate: e.target.value })} />
           </div>
          </div>
          <div className="field">
            <label>Stock</label>
            <div class="ui right labeled input">
              <input type="number" placeholder="stock"onChange={e => setValues({ ...values, stock: e.target.value })} />
           </div>
          </div>       
          <button className="fluid ui button btnsubmit ">Submit</button>
        </div>
      </form>
    </div>
     <div className="Addproductimage">
     {values.productImage==""?<img src={superproduct} />:<img src={"data:image/gif;base64,"+values.productImage} />}
     </div>
     </div>
    
  );
}

export default Addsuperproduct;