import React,{useState,useEffect} from "react"
import {NavLink} from "react-router-dom"
import "./AdminDashboard.css"
import {isAuthenticated} from "../auth/index"
import Menu from "../core/Menu"
import admin from "../admin2.png"
import { getManager, updateManager } from "./helper/adminapicall"


const UpdateManager = ({match}) => {

    const managerID = match.params.managerID

    const{token,user:{_id}} = isAuthenticated()

    const [values, setvalues] = useState({
        firstname:"",
        lastname:"",
        email:"",
        loading:false,
        error:"",
        didredirect:false,
        updatedmanager:"",

    })

    const {firstname,lastname,email,loading,error,didredirect,updatedmanager} = values

    useEffect(() => {
        preload(match.params.managerID,_id,token)  
    }, [])

    const onSubmit = (event)=>{
        event.preventDefault()
        setvalues({...values,error:"",loading:true})
        console.log(managerID,_id,token)
        updateManager({firstname,lastname,email},match.params.managerID)
        .then(data=>{
            if (data.error) {
                setvalues({...values,error:data.error,loading:false})
            }
            else{
                setvalues({
                    ...values,
                    firstname:"",
                    lastname:"",
                    email:"",
                    loading:false,
                    error:"",
                    didredirect:false,
                    updatedmanager:data.firstname,
                })
            }
        })
        .catch(err=>console.log(err))
    }

    const preload = (managerID,_id,token)=>{
        getManager(match.params.managerID,_id,token)
        .then(data=>{
            if (data.error) {
                setvalues({...values,error:data.error,})
            }
            else{
                console.log(data.firstname)
                setvalues({
                    ...values,
                    firstname:data.firstname,
                    lastname:data.lastname,
                    email:data.email,
                })
            }
        })
        
    }

    const handlechange = name =>event =>{
        setvalues({...values,[name]:event.target.value})
           }

    const successMessage =()=>{
        return(
            <div style={{display: updatedmanager ? "" : "none"}} className="success-manager">
                <h5>{updatedmanager} Updated Successfully</h5>
            </div>
        )
    }

    const errorMessage =()=>{
        return(
            <div style={{display: error ? "" : "none"}} className="error-manager">
                <h5>{error}</h5>
            </div>
        )
    }

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
                    <h2>Update Manager</h2>
                </div>
                {successMessage()}
                {errorMessage()}
                <div className="main_right">
                    <form className="input-manager">
                            <label>FirstName</label>
                                <input value={firstname} onChange={handlechange("firstname")}  required type="text" name="" />
                                <br />
                            <label>Lastname</label>
                                <input  value={lastname} onChange={handlechange("lastname")} required type="text" name="" />
                                <br />
                                <label>Email</label>
                                    <input  value={email} onChange={handlechange("email")} required type="text" name="" />
                                <br />
                                
                                <button onClick={onSubmit} className="update-btn-manager" type="button">Update</button>
                            </form>

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

export default UpdateManager