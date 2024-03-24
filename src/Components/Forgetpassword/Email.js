import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import '../../Styles/Signin.css'
import Forgetpassword from '../../Images/Forgot password-amico.png'

function Email(){
    const [Email,setemail]=useState({
        email:""
    }
    )
    const emailerror=useRef();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
            if((!regex.test(Email.email))){
                emailerror.current.innerText="Enter valid Email";
            }else{
              axios.post('https://localhost:7282/api/Retailer/Forget', Email)
              .then(res => {
                  console.log(res);   
                  if(res.data=='Send password your Email'){
                    const Toast = Swal.mixin({
                      toast: true,
                      position: "top-end",
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
                      title: "Send password your Email"
                    });
                    setTimeout(() => {
                      navigate('/Updatepassword')
                    }, 2000);
                  }
                  else{
                    const Toast = Swal.mixin({
                      toast: true,
                      position: "top-end",
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
                      title: "This Email not Registered"
                    });
                  }
                
                  
              })
            .catch(err => console.log(err));
            }
       
    }
    return(
        <>
    <div className="signupall">
    <div className="loginimage">
     <img src={Forgetpassword} ></img>
     </div>
     <div></div>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1> Forgot password</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Email</label>
            <input type="text" placeholder="Enter the Email"
                     onChange={e => setemail({ ...Email, email: e.target.value })} />
                
        <p ref={emailerror}></p>
          </div>
          <button className="fluid ui button blue">Get Password</button>
        
        </div>
      </form>
      
    </div>
    </div>
        
        </>
    )
}

export default Email;