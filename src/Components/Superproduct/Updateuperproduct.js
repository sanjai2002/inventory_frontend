import React, { useState,useEffect} from "react";
import axios from "axios";
import { Link, useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
function UpdateSuperproduct() {
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
const { id } = useParams();
useEffect(() => {
    axios.get('https://localhost:7282/api/Superproduct/GetByproductid/'+id)
        .then(res => {
                setValues(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }, [])
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
        axios.put('https://localhost:7282/api/Superproduct/UpdatesuperProducts/'+id, values)
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
      navigate('/Viewsuperproduct');
    }, 3000);      
}

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
    <div className="Retailerpage">
    <div className="container">
      <form  onSubmit={handleSubmit}>
        <h1>Update Stock</h1>
        <div className="ui divider"></div>
        <div className="ui form">

          <div className="field">
            <label>Productcode</label>
            <input type="text" name="productcode" value={values.productcode} placeholder="Enter Productcode" onChange={e => setValues({ ...values, productcode: e.target.value })}/>
          </div>
          
          <div className="field">
            <label>productName</label>
            <input type="text" name="productName" placeholder="Enter ProductName"  value={values.productName}onChange={e => setValues({ ...values, productName: e.target.value })}/>
          </div>

          <div className="field">
            <label>Product Category</label>
            <input type="text" name="productCategory" placeholder="Enter ProductCategory" value={values.productCategory} onChange={e => setValues({ ...values, productCategory: e.target.value })}/>
          </div>
          <div className="field">
            <label>Description</label>
            <input type="text" name="description" placeholder="Enter Description" value={values.productcode} onChange={e => setValues({ ...values, description: e.target.value })}/>
          </div>

          <div className="field">
            <label>ProductImage</label>
            <input type="file" multiple onChange={e=>handleImages(e)}/>
            {/* <input type="text" name="description" placeholder="description" onChange={e => setValues({ ...values, productImage: e.target.value })}/> */}
          </div>
          
          <div className="field">
            <label>BuyingPrice</label>
            <div class="ui right labeled input">
              <input type="number" placeholder="Enter buyingPrice"  value={values.buyingPrice} id="amount"onChange={e => setValues({ ...values, buyingPrice: e.target.value })} />
              <div class="ui basic label">.00</div>
            </div>
          </div>
          <div className="field">
            <label>SellingPrice</label>
            <div class="ui right labeled input">
              <input type="number" placeholder="Enter sellingPrice"  value={values.sellingPrice}id="amount"onChange={e => setValues({ ...values, sellingPrice: e.target.value })} />
              <div class="ui basic label">.00</div>
            </div>
          </div>

          <div className="field">
            <label>ExpiryDate</label>
            <div class="ui right labeled input">
              <input type="Date" placeholder="expiryDate" value={values.expiryDate} onChange={e => setValues({ ...values, expiryDate: e.target.value })} />
           </div>
          </div>

          <div className="field">
            <label>Stock</label>
            <div class="ui right labeled input">
              <input type="number" placeholder="stock" value={values.stock} onChange={e => setValues({ ...values, stock: e.target.value })} />
           </div>
          </div>       
          <button className="fluid ui button btnsubmit ">Update products</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default UpdateSuperproduct;