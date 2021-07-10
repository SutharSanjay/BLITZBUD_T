import React,{useState,useEffect} from "react";
import {Link,Redirect} from "react-router-dom"
import logo from "../logo1.png"
import Menu from "./Menu"
import "./Base_style.css"
import Signin from "./Signin";
import { getallproduct } from "../admin/helper/adminapicall";


const Base = ()=>{

    const [products, setproducts] = useState([])

    const preload =()=>{
        getallproduct()
        .then(data=>{
            if (data.error) {
                console.log(data.error)
            }
            else{
                setproducts(data)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])


    return(
        <div className="main-body">
            <div className="header">
                <span className="logoname">
                    <h1 style={{fontFamily:"Trebuchet MS",color:"rgb(22, 167, 157)"}}>Blitzhud</h1>
                </span>
                <span className="search">
                    <input className="search-bar" type="text" placeholder="Search Product" /> 
                </span>
                <Menu />
            </div>
            <div className="product-home-main">
                <div  className="product-home-main-1">
                        {products.map((product,index)=>{
                            return(
                            <div data-aos="zoom-in" className="card">
                            <span className="card-img">
                                <img src={product.image} />
                            </span>
                            <span className="card-name">{product.title}</span>
                            <span className="card-price">Rs.{product.price}</span>
                            <span className="addtocart-btn"><Link style={{textDecoration:"none",color:"white"}}>Add To Cart</Link></span>
                            </div>
                            )             
                        })}
                        
                    </div>
            </div>
            <footer class="footer-distributed">
 
		<div class="footer-left">
 
		        <h3>B<span>litzhud</span></h3>
 
		        <p class="footer-company-name">Design By Sanjay Suthar</p>
		</div>
 
		<div class="footer-center">
 
                        <div>
                                <p><span>Parul University</span> Vadodara, India</p>
                        </div>
 
                        <div>
                                <p><a href="mailto:support@company.com">sanjaysuthar786786@gmail.com</a></p>
                        </div>

		</div>
 
		<div class="footer-right">
 
		<p class="footer-company-about">
		<span>About this Platform</span>
                This site have admin and manager panels.
		</p>
 
		<div class="footer-icons">
 
		</div>
 
		</div>
 
		</footer>
        </div>
    )
}


export default Base
