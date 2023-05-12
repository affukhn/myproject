const morgan=require("morgan")
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.URI,{useNewUrlParser:true,useUnifiedTopology:true})

const db=mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log('Database connetion successfully')
})

