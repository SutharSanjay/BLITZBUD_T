import React,{Profiler, useEffect} from "react";
import {Route,Switch,BrowserRouter} from "react-router-dom";

import Home from "./core/Home";
import Signup from "./core/Signup"
import Signin from "./core/Signin";

import PrivateRoute from "./auth/PrivateRoute"
import AdminRoute from "./auth/AdminRoute"

import UserDashBoard from "./core/UserDashBoard";
import AdminDashBoard from "./admin/AdminDashBoard";
import ManageManager from "./admin/ManageManager"
import UpdateManager from "./admin/UpdateManager";

const Routes = ()=>{

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/signup" component={Signup}></Route>
                <Route exact path="/signin" component={Signin}></Route>

                <PrivateRoute path="/user/dashboard" component={UserDashBoard}></PrivateRoute>
                <AdminRoute path="/admin/dashboard" component={AdminDashBoard}></AdminRoute>

                <AdminRoute exact path="/admin/manager" component={ManageManager}></AdminRoute>
                <AdminRoute exact path="/admin/manager/update/:managerID" component={UpdateManager}></AdminRoute>
                

            </Switch>
        </BrowserRouter>
    )
}


export default Routes;