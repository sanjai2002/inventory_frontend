import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { Outlet,useNavigate,Link} from 'react-router-dom';
import React from 'react'
import Swal from 'sweetalert2'
import profile from '../Images/user.png'
import '../Styles/Dealersidebar.css'

function DealerDashboard(){
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

    return(
        <>
  <div className='Dealerdashboard'>
  <aside className='Dealersidebar'>
  <p> </p>
  <a href="/Addsuperproduct">
    <i class="fa fa-user-o" aria-hidden="true"></i>
    Addsuperproduct
  </a>
  <a href="/Viewsuperproduct">
    <i class="fa fa-laptop" aria-hidden="true"></i>
    Viewsuperproduct
  </a>
  <a href="/Manageorders">
    <i class="fa fa-clone" aria-hidden="true"></i>
    Manageorders
  </a>
  <a href="javascript:void(0)">
    <i class="fa fa-star-o" aria-hidden="true"></i>
    Starred
  </a>
  <a href="javascript:void(0)">
    <i class="fa fa-trash-o" aria-hidden="true"></i>
    Trash
  </a>
  <a href="javascript:void(0)">
    <i class="fa fa-trash-o" aria-hidden="true"></i>
    Trash
  </a>
  <div class="nav-item dropdown profile ">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src={profile} ></img>{name}
          
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">{name}</a>
          <a class="dropdown-item" href="#">{Email}</a>
          
          {/* <a class="dropdown-item" href={'/updateuser'}>Update details</a>
          <a class="dropdown-item" onClick={()=>deleteuser(Id)}>Delete Account</a> */}
          <a class="dropdown-item" href="#" onClick={Logout}>Logout</a>
        </div>
      </div> 
</aside>

</div>
      </>
    )
}

export default DealerDashboard;