import { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import Swal from "sweetalert2";
import '../Styles/Signup.css'
import Inventory from '../Images/At the office-amico.png'
function Signup() {
  const initialValues = { name: "", email: "", mobilenumber:"", password: "", shopName:"",location:"",gstNumber:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState( false);
//backend error
  const emailerrorr = useRef();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  //sweet success
    const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    axios.post('https://localhost:7282/api/Retailer/Regsiter', formValues)
    .then(res => {
        console.log(res.data);  
        if(res.data=="Email is already exit"){         
        //   emailerrorr.current.innerText="Email is already exit"
        const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "The Email id Already Exits"
          });
        }  
        else{
        //   emailerrorr.current.innerText="register successfull"
        const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Retailer Registration successfully"
          });
          setTimeout(() => {
            navigate('/');
          }, 1000);       
        }
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {

  const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Username is required!";
    }  
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.mobilenumber) {
      errors.mobilenumber = "Mobile number is required!";
    }else if(values.mobilenumber.length<10){
      errors.mobilenumber = " Please enter valid Mobile number ";
    }
    else if(values.mobilenumber.length>10){
      errors.mobilenumber = " Please enter valid Mobile number ";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.shopName) {
      errors.shopName = "Shopname is Required!";
    }
    if (!values.location) {
      errors.location = "Location is Required!";
    }
    if (!values.gstNumber) {
      errors.gstNumber = "GstNumber is Required!";
    }
    else if(values.gstNumber.length>12){
      errors.gstNumber = "Please enter valid Gst Number!";
    }
    else if(values.gstNumber.length<12){
      errors.gstNumber = "Please enter valid Gst Number!";
    }
    return errors;
  };
  return (  
    <div className="signupall">
    <div className="loginimage">
     <img src={Inventory} ></img>
     </div>
     <div>
    <div className="containersignup">
      <form onSubmit={handleSubmit}>
        {/* <label ref={emailerrorr}></label> */}
        <h1>Retailer Registration <i class="sign-in icon"></i></h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter the Name"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.name}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter the Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Mobile Number</label>    
            <input
              type="number"
              name="mobilenumber"
              placeholder="Enter the mobileno"
              value={formValues.mobilenumber}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.mobilenumber}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter the Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>

          <div className="field">
            <label>Shop Name</label>
            <input
              type="text"
              name="shopName"
              placeholder="shopName"
              value={formValues.shopName}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.shopName}</p>

          <div className="field">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="location"
              value={formValues.location}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.location}</p>

          <div className="field">
            <label>Gst Number</label>
            <input
              type="text"
              name="gstNumber"
              placeholder="gstNumber"
              value={formValues.gstNumber}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.gstNumber}</p>
          <button className="fluid ui button blue">Submit</button> 
        </div>
      </form>
      
    </div>
    </div>
    </div>
  );
}

export default Signup;
