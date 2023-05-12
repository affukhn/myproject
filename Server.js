const express = require("express");
// const client = require("./db/db");
const dotenv = require("dotenv").config();
const app = express();

const port = process.env.PORT || 5000;
const UserSchema = require("./model/userModel");
const  dbmon = require("./db/Mongoose");
const userRouter= require("./router/router");
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json());
app.use("/api/user",userRouter)
app.use('/uploads',express.static('uploads'))
app.post("/hello", async (req, res) => {
    
  try {
    const data = res.body
    const okay= ()=>console.log(data)
    // if(xyz){
    //     const xyz = await UserSchema.create(req.body);
    //     console.log(xyz);
    //     return res.status(200).json(xyz)
    // }else{
    //     return res.send("missing")
    // }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`port started on ${port}`);
});

