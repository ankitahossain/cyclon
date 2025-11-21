require("dotenv").config()
// development Response
const development = (error,res)=>{ 
      return res.status(statusCode).json({
     statusCode:error.statusCode,
      status: error.status,
      isOperationalError: error.isOperationalError,
      message : error.message,
        data: error.data,
      errorStack: error.stack
  })
    
}


// product response
const productResponse = (error,res)=>{ 
    if(error.isOperationalError){
      return res.status(statusCode).json({
      statusCode:error.statusCode,
      status: error.status,
      message : error.message,
      
      })
    }
    else{

     return res.status(statusCode).json({

      status: "OK!",
      message : " Something went wrong! Please try again later.",
      
      })
    
    }
     return res.status(statusCode).json({
     statusCode:error.statusCode,
      status: error.status,
      isOperationalError: error.isOperationalError,
      message : error.message,
        data: error.data,
      errorStack: error.stack
  })
}
    

exports.globalErrorHandler = (error, req, res,next)=>{
  const statusCode = error.statusCode ||500;
  if(process.env.NODE_ENV == "production"){
    development(error,res)

  }else{
    productResponse(error,res)  
  }
  console.log(Error)

}