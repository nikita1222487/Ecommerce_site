import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { userReducer } from "../../../reducers/userReducer";
import { MdDashboard, MdPerson2, MdExitToApp, MdListAlt ,MdShoppingCart} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";

function UserOptions({ user }) {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const alert =useAlert()
  const [open, setOpen] = useState(false);
  const options =[
      {icon:<MdListAlt/>,name:"Orders",func:orders},
      {icon:<MdPerson2/>,name:"Profile",func:account},
      {icon:<MdShoppingCart />,name:"Cart",func:cart},
      {icon:<MdExitToApp/>,name:"Logout",func:logoutUser},
    ]
console.log(user)
    if(user.role==="admin"){
        options.unshift({
            icon:<MdDashboard/>,
            name:"Dashboard",
            func:dashboard
        })
    }
    else{
        console.log("user")
    }
    function dashboard(){
        navigate("/dashboard")
    }

    function orders()
    {
        navigate("/orderes")
    }
    function account()
    {
        navigate("/account")
    }
    function cart()
    {
        navigate("/cart")
    }
    function logoutUser(){
        dispatch(logout())
        // console.log("logout")
        alert.success("logout successfully")
        navigate("/")
    }
  return (
    <Fragment>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "./Profile.png"}
            alt="Profile"
          />
        }
      >

{options.map(item=>(
  <SpeedDialAction 
  key={item.name}
  icon={item.icon} tooltipTitle={item.name} onClick={item.func}
  tooltipOpen ={window.innerWidth<=600 ? true :false}
  ></SpeedDialAction>
  
))}
        </SpeedDial>
    </Fragment>
  );
}

export default UserOptions;


//8:33:13