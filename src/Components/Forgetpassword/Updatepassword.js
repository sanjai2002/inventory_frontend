import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'
import Forgetpassword from '../../Images/Forgot password-amico.png'
function Updatepassword(props){
    const [values,setvalues]=useState({
        email:"",
        receivePassword:"",
        newpassword:""
    }
    )
    useEffect(()=>{
        console.log(props);
    })
    const emailerror=useRef();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
            if((!regex.test(values.email))){
                emailerror.current.innerText="Enter valid Email";
            }
        event.preventDefault();
        axios.put('https://localhost:7282/api/Retailer/Updatepassword',values) 
            .then(res => {
                console.log(res);
                if(res.data=='Enter correct password'){
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
                    title: "Please enter correct password"
                  });
                
                }
                else{
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
                    title: "password update successfully"
                  });
                  setTimeout(() => {
                    navigate('/')
                  }, 3000);
                 
                }
            })
            .catch(err => console.log(err));
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
        <h1> Update password</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Email</label>
            <input type="text" placeholder="Enter the Email" value={props.email}
                     onChange={e => setvalues({ ...values, email: e.target.value })} />
                
        <p ref={emailerror}></p>
          </div>
          <div className="field">
            <label>Receive Password</label>
            <input type="password" placeholder="Enter the Receive password"
                     onChange={e => setvalues({ ...values, receivePassword: e.target.value })} />
          </div>
          <div className="field">
            <label>New Password</label>
            <input type="password" placeholder="Enter the New password"
                      onChange={e => setvalues({ ...values, newpassword: e.target.value })} />
              </div>
          <button className="fluid ui button blue">Update Password</button>
          {/* <h4><Link className="link"to={"/Signin"}  >Sign in?</Link></h4> */}
        </div>
      </form>
      
    </div>
    </div>
        
        </>
    )
}
export default Updatepassword;