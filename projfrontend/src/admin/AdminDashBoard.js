import React from "react"
import {NavLink} from "react-router-dom"
import "./AdminDashboard.css"
import {isAuthenticated} from "../auth/index"
import Menu from "../core/Menu"
import admin from "../admin2.png"


const AdminDashBoard = () => {

    const{user : {_id,firstname,lastname,email,role}} = isAuthenticated()

    const leftSide = () => {
        return(
            <div className="leftSide">
                <span className="logoname">
                    <h1 style={{fontFamily:'Trebuchet MS',color:"rgb(22, 167, 157)"}}>Blitzhud</h1>
                </span>
                 <ul>
                 <NavLink className="admin" exact to="/admin/dashboard" activeStyle={{backgroundColor:"rgba(245, 245, 245,.15)"}} style={{ textDecoration: 'none' ,color :"white"}}><img src={admin} /><p>{firstname}{lastname}</p></NavLink>
                 <NavLink exact to="/admin/manager" activeStyle={{backgroundColor:"rgba(245, 245, 245,.15)"}} style={{ textDecoration: 'none' ,color :"white"}}><li>Manage Product</li></NavLink>
                </ul>
            </div>
        )
    }

const rightSide = () => {
        return(
            <div className="rightSide">
                <div>
                    <h2>Welcome To Admin Area!</h2>
                </div>
                <div className="main_right">
                    <ul>
                        <li className="info"><h3>Admin Information</h3></li>
                        <li><span>ID</span>: {_id}</li>
                        <li><span>Name</span>: {firstname} {lastname}</li>
                        <li><span>Email</span>: {email}</li>
                    </ul>
                </div>
            </div>
        )
    }


    return(
        <div className="admin_main">
            <Menu />
            {leftSide()}
            {rightSide()}
        </div>
    )
}

export default AdminDashBoard