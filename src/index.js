import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import  Signup from './Components/Signup'
import Signin from './Components/Signin'
import Mainrouting from './Routing/Mainrouting'
import Adminrouting from './Routing/Adminrouting'
import Home from './Components/Home'

import Updateuser from './Components/Updateuser'
import Email from './Components/Forgetpassword/Email'
import Updatepassword  from './Components/Forgetpassword/Updatepassword'
import Pagenotfound from './Components/Pagenotfound'

import Addproduct from './Components/Product/Addproduct' 
import Viewproduct from './Components/Product/Viewproduct';
import Updateproduct from './Components/Product/Updateproduct';

import Superproduct from './Components/Superproduct/Superproduct';
import Purchase from './Components/Purchase/Purchase'
import Purchasehistory from './Components/Purchase/Purchasehistory'

import Addsuperproduct from './Components/Superproduct/Addsuperproduct'
import Viewsuperproduct from './Components/Superproduct/Viewsuperproduct';
import Manageorders from './Components/Dealer/Manageorders';
import CustomerOrder from './Components/Customer/Customerorder'
import UpdateSuperproduct from './Components/Superproduct/Updateuperproduct'

import Orderhistory from './Components/Retailers/Orderhistory'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
   < Route path='/Pagenotfound' element={< Pagenotfound/>}></Route>
   < Route path='*' element={< Pagenotfound/>}></Route>
    <Route path='/' element={<Signin/>}></Route>
    <Route path='/Signup' element={<Signup/>}></Route>
    <Route path='/Email' element={<Email/>}></Route>
    <Route path='/Updatepassword' element={<Updatepassword/>}></Route>
   
    <Route element={<Mainrouting/>}> 
    <Route path='/Home' element={<Home/>}></Route>
    <Route path='/Addproduct' element={<Addproduct />}></Route>
    <Route path='/Viewproduct' element={<Viewproduct />}></Route>
    <Route path='/Updateproduct/:id' element={<Updateproduct />}></Route>
    <Route path='/CustomerOrder' element={< CustomerOrder />}></Route>
    <Route path='/Orderhistory' element={< Orderhistory/>}></Route>
    <Route path='/Superproduct' element={<Superproduct />}></Route>
    <Route path='/Purchase/:id' element={< Purchase/>}></Route>
    <Route path='/Purchasehistory' element={< Purchasehistory/>}></Route>


   
   
    </Route>
    <Route element={<Adminrouting/>}>
    <Route path='/Addsuperproduct' element={<Addsuperproduct/>}></Route>
    <Route path='/Viewsuperproduct' element={<Viewsuperproduct/>}></Route>
    <Route path='/Viewsuperproduct' element={<Viewsuperproduct/>}></Route>
    <Route path='/Manageorders' element={<Manageorders/>}></Route>
    <Route path='/UpdateSuperproduct/:id' element={<UpdateSuperproduct/>}></Route>
    </Route>
  </Routes>
  </BrowserRouter>
);

