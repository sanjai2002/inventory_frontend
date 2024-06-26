import { useState,useRef } from "react";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import '../Styles/Signin.css'
import Login from '../Images/Login-bro.png'
import Inventory from '../Images/At the office-amico.png'
function Signin() {
  const initialValues = { email: "", password:"" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState( false);

  //Backend error
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
    axios.post('https://localhost:7282/api/Retailer/UserLogin', formValues)
    .then(res => {
      console.log(res.data);
      if(res.data.email==true&&res.data.password==false) {
        // emailerrorr.current.innerText="Your password is incorrect"
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "Invalid Password"
          });
      }
      if(res.data.email==false&&res.data.password==false) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "Invalid Email id"
          });
      }
      if(res.data.email==true&&res.data.password==true&& res.data.role=="Dealer") {
        //Cookies    
         Cookies.set('Email',formValues.email, { expires: 7 });
         Cookies.set('Role',res.data.role, { expires: 7 });
         const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });
         setTimeout(() => {
          navigate('/Viewsuperproduct')
        }, 1000);
         }
         else if(res.data.email==true&&res.data.password==true){
           Cookies.set('Email',formValues.email, { expires: 7 });
           Cookies.set('Role',res.data.role, { expires: 7 });
           const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Signed in successfully"
          });
          setTimeout(() => {
            navigate('/Viewproduct');
          }, 1000);
         }
    })
    .catch(err => console.log(err));
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; 
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
    };

    return (  
    <> 
    <div className="Nav">  
    </div>
    <div className="signinall">
    <div className="loginimage">
     <img  data-testid="Iventoryimg" src={Inventory} ></img>
     </div>
     <div>
     </div>
    <div className="container">
    <label ref={emailerrorr}></label>
      <form onSubmit={handleSubmit}>
        <h1 data-testid="Heading">Login<i class="sign-in icon"></i></h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label data-testid="lblEmail">Email</label>
            <input
            data-testid="inputEmail"
              type="text"
              name="email"
              placeholder="Enter Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label data-testid="lblPassword">Password</label>
            <input
             data-testid="inputPassword"
              type="password"
              name="password"
              placeholder="Enter the Password"
              value={formValues.password}
              onChange={handleChange}
            />
             <Link data-testid="Forgotpassword" className="link"to={"/Email"}>Forgot password?</Link>            
          </div>
          <p>{formErrors.password}</p>
          <button data-testid="Loginbtn" className="fluid ui button blue">Login</button>
          <h4 data-testid="Signuplink" className="signupmsg"><Link className="link"to={"/Signup"}>New Retailer?</Link></h4>
        </div>
      </form>
    </div>
    </div>
    </> 
  );
}

export default Signin;
