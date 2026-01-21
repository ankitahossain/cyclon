
require('dotenv').config() //todo:loading env variables from .env file
const { app } = require('./src/app')  //todo: importing express app
const {DBconnection} = require("./src/database/db")//todo:mongoDB connection function


/**
 * 
 * todo:if mongoDB connection is successful then only start the server if failed server never starts(good practice)
 * 
 */
DBconnection().then(()=>{
    app.listen(process.env.PORT || 4000,()=>{
        console.log(`server is running on http://localhost:${process.env.PORT || 4000}`)
    })

}).catch((error)=>{

    console.log("database connection error",error)

})