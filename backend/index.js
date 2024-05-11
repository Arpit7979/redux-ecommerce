const express = require("express");
const cors = require("cors")
const products = require("./products");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const register = require("./routes/register")
const login = require("./routes/login")




require("dotenv").config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use("/api/register",register);
app.use("/api/login",login);

app.get("/products",(req,res)=>{
    res.send(products)
});

app.post("/orders", async(req,res)=>{
    try {
        const razorpay = new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_SECRET
        })
    
        const options = req.body;
        const order = await razorpay.orders.create(options);
        if(!order){
            return res.status(500).send("error")
        }
        res.json(order);
    } catch (error) {
        console.log(error)
    }
   
})

app.post("/orders/validate",(req,res)=>{
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
    const sha = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if(digest !== razorpay_signature){
        return res.status(400).json({msg:"Not valid transition"});
    }
    res.json({
        msg:"success",
        orderId:razorpay_order_id,
        paymentId:razorpay_payment_id,
    })
})



const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

app.listen(port,console.log(`Server is running on ${port} ...`));
mongoose.connect(uri)
.then(
    ()=>console.log("MongoDB connected...")
).catch(
    (err)=>console.log("MongoDB connecection failed...",err.message)
);