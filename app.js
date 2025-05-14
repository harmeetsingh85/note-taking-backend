const express=require('express');
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();
const userRoutes=require('./routes/userRoutes');

async function main(){
    try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected");
    app.use(express.json());
    app.use('/user',userRoutes);
    }catch(e){
        console.log("db not connecting...");
        res.json({"msg":"database not connecting"})
    }
    app.listen(3000);
}
main();

