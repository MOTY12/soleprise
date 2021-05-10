const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors') 
const dotenv = require('dotenv')
const app = express()

dotenv.config()

const apis = process.env.API_URL

//app midlleware
app.use(cors())
app.options('*', cors())
app.use(bodyparser.json())
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))


//import routes
const inventoryRoutes = require('./routes/inventory')
const categoryRoutes = require('./routes/category')
const classRoutes = require('./routes/classes')  
const shopRoutes = require('./routes/shop')  
const orderRoutes = require('./routes/order')  


//route middleware
app.use(`${apis}`, inventoryRoutes)
app.use(`${apis}`, categoryRoutes)
app.use(`${apis}`, classRoutes)
app.use(`${apis}`, shopRoutes)
app.use(`${apis}`, orderRoutes)


 //configuring the database
 mongoose.connect(process.env.DBCONNECT, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{console.log('connected to the database')}).catch((err)=>{
    console.log('not connect to db')
})

const host = '0.0.0.0'
const port = process.env.Port || 3000
    
    
app.listen(port, host, function(){
    console.log("server started......")
})
    
    //()=>console.log('Server up and running on port http://localhost:3000'))