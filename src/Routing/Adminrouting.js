import Cookies from 'js-cookie';
import { Outlet, Navigate } from 'react-router-dom'
import DealerDashboard from '../Components/DealerDashboard'
function Adminrouting(){
    let auth = {'role': Cookies.get('Role')}
    return (
        auth.role=="Dealer"?<><DealerDashboard/><section style={{"position":"absolute","top":"8vh","left":"18vw"}}><Outlet /></section></>: 
        <Navigate to="/Pagenotfound"/>
    )
}
export default Adminrouting;