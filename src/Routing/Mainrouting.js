import Cookies from 'js-cookie';
import { Outlet, Navigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
function Mainrouting(){
    let Email = {'Email': Cookies.get('Email')}
    return(
        Email.Email?<><Navbar/><section style={{"position":"absolute","top":"10vh","left":"20vw"}}><Outlet /></section></> : 
        <Navigate to="/Pagenotfound"/>
    )
}

export default Mainrouting;