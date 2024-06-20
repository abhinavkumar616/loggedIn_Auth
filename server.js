const express=require("express")
const bodyparser=require('body-parser')
const morgan=require('morgan')
const ip = require('ip');

require("./config/dbConnect")
const route=require("./routes/userRoute")

const app=express()
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use("/",route)

app.get("/",async(req,res)=>{
    // const ipaddress=req.socket.remoteAddress;
    // ip.toBuffer
    // res.send(ipaddress)

    const ipaddress=ip.address()
    res.send(ipaddress)

})


app.listen(3000,()=>{
    console.log("Server is running on 3000");
})