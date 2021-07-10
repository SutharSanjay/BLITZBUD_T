
require("dotenv").config()


const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const cors = require("cors")

const mongoose = require("mongoose")
const express = require("express");
const app = express();
const port  = process.env.PORT;

const {body} = require("express-validator")

//Router Path
const managerroutes = require("./routes/manager")
const authroutes = require("./routes/auth")


//Database connection 
mongoose.connect(process.env.DATABASE,{useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true})
    .then(()=>{
        console.log("DB IS CONNECTED")
    })


app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//Routes
app.use("/api",authroutes)
app.use("/api",managerroutes)

app.listen(port,()=>{
    console.log(`Server is Running........`)
})