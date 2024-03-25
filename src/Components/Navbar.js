import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { Outlet,useNavigate,Link} from 'react-router-dom';
import React from 'react'
import Swal from 'sweetalert2'
import '../Styles/Navbar.css'
import '../Styles/Adminpage.css'
import profile from '../Images/user.png'
function Navbar(){
    const Email = Cookies.get('Email');
    const role =Cookies.get('Role')
    //logout
    const navigate = useNavigate();

  function Logout(){
        Cookies.remove('retailerid');
        Cookies.remove('Email');
        Cookies.remove('Role');
        navigate('/');
    }
    const [name,setName] = useState();
    const[Location,Setlocation]=useState();
    const[Shopname,Setshopname]=useState();
    
    const[retailerid,setretailerid]=useState(Cookies.get("retailerid"));
    useEffect(()=>{
      axios.post('https://localhost:7282/api/Retailer/FindEmail',{
        email:Email
    })
    .then(res => {
     console.log(res.data);
    Setshopname(res.data.shopName);
    Setlocation(res.data.location);
    setName(res.data.name);
    setretailerid(res.data.retailerid);
})
  .catch(err => console.log(err));
    },[])
    //id store in cookies:
    Cookies.set('retailerid', retailerid, { expires: 7 });
    const Id=Cookies.get("retailerid");
       
const deleteuser = (Id) => {
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
        axios.delete('https://localhost:7219/api/Register/Deleteuserdetails/' + Id)
        .then(res => { 
        }).catch(err => console.log(err),[]);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
      Logout();
    });
  }
    return(
        <>
      <aside>
  <p style={{color:"White"}}> {Shopname}  </p>
  <a href="/Viewproduct">
    <i class="fa fa-user-o" aria-hidden="true"></i>
    View products
  </a>
  <a href="/Addproduct">
    <i class="fa fa-user-o" aria-hidden="true"></i>
    Add Products
  </a>
  <a href="/CustomerOrder">
    Generate Bill
  </a>

  <a href="/Orderhistory">
   Sales History
  </a>
  <a href="/SuperProduct">
   Purchase
  </a>
  <a href="/Purchasehistory">
  Purchase Details
  </a>
 <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
  <div class="nav-item dropdown profile ">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src={profile} ></img>&nbsp; &nbsp;{name}    
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">{name}</a>
          <a class="dropdown-item" href="#">{Email}</a>
          <a class="dropdown-item" href="#" onClick={Logout}>Logout</a>
        </div>
      </div>   
</aside>
    </>
    
    )
}




export default Navbar;