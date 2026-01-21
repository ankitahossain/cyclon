//todo:creates the express application
const express=require("express")
const app=express()


const cors=require("cors"); 
const cookieParser = require('cookie-parser') ;





module.exports={app}


/**
 * todo: All middlewares will be here
 * 
 */ 

app.use(cors());//todo:allows cross origin requests
app.use(cookieParser());//todo:reads cookies from incoming requests
app.use(express.json()); //todo:parse json body
app.use(express.urlencoded({extrended:true}));//todo:parse form data
app.use(express.static('public'));//todo:serves static files from public folder


/**
 * todo:All routes will be here
 * 
 */

const apiVersion=process.env.BASE_URL
app.use(`/api/v1`,require('./routes/index'));




/**
 * todo:All error handling middlewares will be here
 */
const { globalErrorHandler  } = require("./utils/globalErrorHandler");
app.use(globalErrorHandler );