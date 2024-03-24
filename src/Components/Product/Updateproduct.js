import React, { useState,useEffect} from "react";
import axios from "axios";
import { Link, useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import UpdateProduct from '../../Images/Update-pana.png'
function Updateproduct() {
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
const { id } = useParams();
useEffect(() => {
    axios.get('https://localhost:7282/api/Product/GetByproduct/'+ id)
        .then(res => {
                setValues(res.data)
            })
            .catch(err => console.log(err));
    }, [])

const navigate = useNavigate();
const handleSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put('https://localhost:7282/api/Product/UpdateProducts/'+id, values)
        .then(res => {
            console.log(res);  
  })
        .catch(err => console.log(err));
        Swal.fire({
          title: "Updated!",
          text: "Product has been Updated",
          icon: "success"
        });
      }
    });

    setTimeout(() => {
      navigate('/Viewproduct');
    }, 3000); 

        
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
      <h1>Update the Product</h1>
      <div className="divider"></div>
    
        <div className="ui divider"></div>
        <div className="ui form">

          <div className="field">
            <label>Product code</label>
            <input type="text" required name="productcode" value={values.productcode} placeholder="productcode" onChange={e => setValues({ ...values, productcode: e.target.value })}/>
          </div>

          <div className="field">
            <label>Product Name</label>
            <input type="text" required name="productName"value={values.productName} placeholder="productName" onChange={e => setValues({ ...values, productName: e.target.value })}/>
          </div>

          <div className="field">
            <label>Product Category</label>
            <input type="text" required name="productCategory" value={values.productCategory} placeholder="productCategory" onChange={e => setValues({ ...values, productCategory: e.target.value })}/>
          </div>
          <div className="field">
            <label>Description</label>
            <input type="text" required name="description" value={values.description}  placeholder="description" onChange={e => setValues({ ...values, description: e.target.value })}/>
          </div>

          <div className="field">
            <label>ProductImage</label>
            <input type="file"required  multiple onChange={e=>handleImages(e)}/>
 
          </div>


          <div className="field">
            <label>Actual  Price</label>
            <div class="ui right labeled input">
              <input type="number"required   value={values.buyingPrice}  placeholder="Enter buyingPrice" id="amount"onChange={e => setValues({ ...values, buyingPrice: e.target.value })} />
              <div class="ui basic label">.00</div>
            </div>
          </div>

          <div className="field">
            <label>Selling Price</label>
            <div class="ui right labeled input">
              <input type="number"required value={values.sellingPrice}  placeholder="Enter sellingPrice" id="amount"onChange={e => setValues({ ...values, sellingPrice: e.target.value })} />
              <div class="ui basic label">.00</div>
            </div>
          </div>

          <div className="field">
            <label>Expiry Date</label>
            <div class="ui right labeled input">
              <input type="Date" required  value={values.expiryDate} placeholder="expiryDate"onChange={e => setValues({ ...values, expiryDate: e.target.value })} />
           </div>
          </div>
          <div className="field">
            <label>Stock</label>
            <div class="ui right labeled input">
              <input type="number" required   value={values.stock} placeholder="stock"onChange={e => setValues({ ...values, stock: e.target.value })} />
           </div>
          </div>    
          <button class="btn btn-primary" onClick={handleSubmit}>Update the Product</button>
        </div>
      {/* ... rest of your form fields */}
      
    </form>
  </div>
  <div className="Addproductimage">
  {values.productImage==""?<img src={UpdateProduct} />:<img src={"data:image/gif;base64,"+values.productImage} />}
  </div>
  </div>
  );
}

export default Updateproduct;