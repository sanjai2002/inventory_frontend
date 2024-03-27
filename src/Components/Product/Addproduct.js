import React, { useState,useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import '../../Styles/Addproduct.css'
import Product from '../../Images/Image upload-pana (1).png'
function Addproduct() {
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
    retailerid:Cookies.get("retailerid")
})

const productcoderef=useRef();
const productCategoryref=useRef();
const productNameref=useRef();
const descriptionref=useRef();
const productImageref=useRef();
const buyingPriceref=useRef();
const sellingPriceref=useRef();
const expiryDateref=useRef();
const stockref=useRef();

const navigate = useNavigate();

const handleSubmit = (event) => {
  if (!values.productcode) {
    productcoderef.current.innerText ="Required!";
  }
  if (!values.productCategory) {
    productCategoryref.current.innerText ="Required!";
  }
  if (!values.productName) {
    productNameref.current.innerText ="Required!";
  }
  if (!values.description) {
    descriptionref.current.innerText ="Required!";
  }
  if (!values.productImage) {
    productImageref.current.innerText ="Required!";
  }
  if (!values.buyingPrice) {
    buyingPriceref.current.innerText ="Required!";
  }
  if (!values.sellingPrice) {
    sellingPriceref.current.innerText ="Required!";
  }
  if (!values.expiryDate) {
    expiryDateref.current.innerText ="Required!";
  }
  if (!values.stock) {
    stockref.current.innerText ="Required!";
  }
  else if(values.stock<1){
    stockref.current.innerText ="Enter the valid stock!";
  }

  else{
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
      axios.post('https://localhost:7282/api/Product/Addproducts', values)
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
      navigate('/Viewproduct');
      window.location.reload();
    }, 2000);   
  }       
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
    <div className="Addproduct"> 
    <div className="add-product-container">
    <form onSubmit={handleSubmit} className="add-product-form">
      <h1>Add the Product</h1>
      <div className="divider"></div>
    
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Product code</label>
            <input type="number" required name="productcode" placeholder="productcode" onChange={e => setValues({ ...values, productcode: e.target.value })}/>
            <p ref={productcoderef}></p>
          </div>

          <div className="field">
            <label>Product Name</label>
            <input type="text" required name="productName" placeholder="productName" onChange={e => setValues({ ...values, productName: e.target.value })}/>
            <p ref={productNameref}></p>
          </div>

          <div className="field">
            <label>Product Category</label>
            <input type="text" required name="productCategory" placeholder="productCategory" onChange={e => setValues({ ...values, productCategory: e.target.value })}/>
            <p ref={ productCategoryref}></p>
          </div>
          <div className="field">
            <label>Description</label>
            <input type="text" required name="description" placeholder="description" onChange={e => setValues({ ...values, description: e.target.value })}/>
            <p ref={ descriptionref}></p>
          </div>

          <div className="field">
            <label>ProductImage</label>
            <input type="file" required  multiple onChange={e=>handleImages(e)}/>
            <p ref={productImageref}></p>
          </div>

          <div className="field">
            <label>Buying Price</label>
            <div class="ui right labeled input">
              <input type="number" required placeholder="Enter Buying Price" id="amount"onChange={e => setValues({ ...values, buyingPrice: e.target.value })} />
              <div class="ui basic label">.00</div>
            </div>
            <p ref={buyingPriceref}></p>
          </div>

          <div className="field">
            <label>Selling Price</label>
            <div class="ui right labeled input">
              <input type="number" required placeholder="Enter sellingPrice" id="amount"onChange={e => setValues({ ...values, sellingPrice: e.target.value })} />
              <div class="ui basic label">.00</div>
            </div>
            <p ref={sellingPriceref}></p>
          </div>

          <div className="field">
            <label>Expiry Date</label>
            <div class="ui right labeled input">
              <input type="Date" required placeholder="expiryDate"onChange={e => setValues({ ...values, expiryDate: e.target.value })} />
              
           </div>
           <p ref={ expiryDateref}></p>
          </div>
          <div className="field">
            <label>Stock</label>
            <div class="ui right labeled input">
              <input type="number" required placeholder="stock"onChange={e => setValues({ ...values, stock: e.target.value })} />
              
           </div>
           <p ref={stockref}></p>
           
          </div>    
          <button class="btn btn-primary" onClick={handleSubmit}>Add the Product</button>
        </div>
      {/* ... rest of your form fields */}
      
    </form>
  </div>
  <div className="Addproductimage">
  {values.productImage==""?<img src={Product} />:<img src={"data:image/gif;base64,"+values.productImage} />}
  </div>
  </div>

  );
}

export default Addproduct;