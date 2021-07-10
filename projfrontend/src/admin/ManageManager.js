import React,{useEffect,useState} from "react"
import {Link, NavLink} from "react-router-dom"
import "./AdminDashboard.css"
import {isAuthenticated} from "../auth/index"
import Menu from "../core/Menu"
import admin from "../admin2.png"
import { deleteManager, getallmanagers } from "./helper/adminapicall"


const ManageManager = () => {

    const{user : {_id,firstname,lastname,email,role},token} = isAuthenticated()
    const [value, setvalue] = useState('')
    const [Managers, setManagers] = useState([])
    const [selectvalue, setselectvalue] = useState('')

    const preload = (_id,token)=>{
        getallmanagers(_id,token)
        .then(data=>{
            if (data.error) {
                console.log(data.error)
            }
            else{
                setManagers(data)
            }
        })
    }
    const deleteThis = ManagerID =>{
        deleteManager(ManagerID,_id,token).then(data=>{
            if (data.error) {
                console.log(data.error)
            }
            else{
                preload(_id,token)
            }
        })

    }

    const requestSearch = () => {
        var filteredRows1 = Managers.filter((row) => {
            console.log(row)
            return row.firstname.toLowerCase().includes(value.toLowerCase());
      });
        var filteredRows2 = Managers.filter((row) => {
            console.log(row)
            return row.lastname.toLowerCase().includes(value.toLowerCase());
      });
        console.log(value)
        if(value.length <= 1){
            preload(_id,token);
        }
        else{
            filteredRows1.push.apply(filteredRows1,filteredRows2)
            setManagers(filteredRows1)
        }
    };

    const handleselectchange=(value)=>{
        setselectvalue(value)
        console.log(selectvalue)
        switch (selectvalue) {
            case 'N':
                preload(_id,token)
                break;
            case 'A':
                const sortbyname = Managers.sort((a, b) => (a.firstname > b.firstname) ? 1 : (a.firstname === b.firstname) ? ((a.firstname > b.firstname) ? 1 : -1) : -1 )
                setManagers(sortbyname)
                break;
            case 'B':
                const sortbylastname = Managers.sort((a, b) => (a.lastname > b.lastname) ? 1 : (a.lastname === b.lastname) ? ((a.lastname > b.lastname) ? 1 : -1) : -1 )
                setManagers(sortbylastname)
                break;
        }
    }

    const handlechange = (event) => {
        setvalue(event.target.value)
        requestSearch()
        
    } 

    useEffect(() => {
        preload(_id,token)
    }, [])

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
                    <h2>Manage Manager!</h2>
                </div>
                <div className="main_right">
                    <span className="manager_search"><input value={value} onChange={handlechange} placeholder="Search..." className="search_manager" type="text" /></span>
                    <span>
                        <label>Sort : </label>
                        <select onChange={e=>handleselectchange(e.target.value)} id="select">
                            <option value="N" >None</option>
                            <option value="A" >By FirstName</option>
                            <option value="B">By LastName</option>
                        </select>
                    </span>
                    <table id="t01">
                        <tr>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Email</th>
                            <th colSpan={2}>Operation</th>
                        </tr>
                        {Managers.map((manager,index)=>{
                            return(
                                <tr>
                                    <td>{manager.firstname}</td>
                                    <td>{manager.lastname}</td>
                                    <td>{manager.email}</td>
                                    <td className="update-manager"><span className="update-btn"><Link style={{textDecoration:"none",color:"white"}} to={`/admin/manager/update/${manager._id}`}>Update</Link></span>
                                    <td className="delete-manager"><span className="delete-btn" onClick={()=>{deleteThis(manager._id)}} >Delete</span></td></td>
                                </tr>
                                
                            )
                        })}
                        
                    </table>
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

export default ManageManager