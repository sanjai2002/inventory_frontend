import { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Updateuser() {
//get user details 
const Id=Cookies.get("userid"); 

 useEffect(() => {
        
        axios.get('https://localhost:7219/api/Register/GetByid/' + Id)
            .then(res => {
                console.log(res.data)
                setFormValues(res.data)
                })
                .catch(err => console.log(err));
         })
  
  const initialValues = { userName: "", email: "", mobileNumber: "" };
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
    const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    axios.put('https://localhost:7219/api/Register/Updateuserdetails/'+Id, formValues)
    .then(res => {
        console.log(res.data);  
        // if(res.data=="Email is already exit"){
        //   emailerrorr.current.innerText="Email is already exit"
        // }  
        // else{
        //   emailerrorr.current.innerText="register successfull"
        //   navigate('/Login');
        // }
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
    if (!values.userName) {
      errors.userName = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.mobileNumber) {
      errors.mobileNumber = "Mobile number is required!";

    }else if(values.mobileNumber.length<10){
      errors.mobileNumber = " please enter valid Mobile number ";
    }
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label ref={emailerrorr}></label>
        <h1>Update details</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="userName"
              placeholder="userName"
              value={formValues.userName}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.name}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Mobile No</label>
            <input
              type="number"
              name="mobileNumber"
              placeholder="mobileno"
              value={formValues.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.mobileNumber}</p>
          <button className="fluid ui button blue">Update</button>
          {/* <Link to={"/Login"}>Login</Link> */}
        </div>
      </form>
      
    </div>
  );
}

export default Updateuser;