const {z}=require('zod');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const mongoose=require('mongoose');
const userModel=require('../models/userModel');
const notesModel=require('../models/notesModel');

async function signUpController(req,res){
    const schema=z.object({
        name: z.string().min(3),
        email:z.string().email(),
        password:z.string().min(3).max(20).regex(/[A-Z]/,"password must contain ateleast one uppercase")
    })
    const validBody=schema.safeParse(req.body);
    if(validBody.success){
        const {name, email, password}=req.body;
        // hash the password before storing
        const hashPassword= await bcrypt.hash(password,10);
        await userModel.create({name,email,password:hashPassword});
        res.json({"msg": "signUp success"});
    }
    else{
        res.json({"msg":"signup nhi hua ","error":validBody.error});
    }

}

async function signInController(req,res){
    const schema=z.object({
        email:z.string().email(),
        password:z.string().min(3).max(20).regex(/[A-Z]/,"password must contain ateleast one uppercase")
    })
    const validBody=schema.safeParse(req.body);
    if(!validBody.success){
        res.json({"msg":"validation error","error":validBody.error})
    }
    else{
        const {email, password}=req.body;
        const user=await userModel.findOne({email});
        if(user){
            const  verifyPass=await bcrypt.compare(password,user.password);
            if(verifyPass){
                const token=jwt.sign({id:user._id},process.env.USER_SECRET);
                res.json({"msg":"login success","token":token});
            }
            else{
                res.json({"msg":"incorrect details"});
            }
        }
        else{
            res.json({"msg":"pls sign up first "});
        }
    }

}

//  i am not using zod in create note but u should use
async function createNoteController(req,res){
    let {title,content}=req.body;
    let createdBy=req.id;
    await  notesModel.create({title,content,createdBy});
    res.json({"msg":"note created"});
}

async function myNoteController(req,res){
    let notes=await notesModel.find({createdBy:req.id});
    if(!notes){
        return res.json({"msg":"pls create note first"});
    }
    else{
    res.json({notes});
    }
}

async function deleteNoteController(req,res){
    const delId=req.body.delId;
    await notesModel.findOneAndDelete({'_id':delId});
    res.json({"msg":"deleted"});
}
module.exports={signUpController,signInController,createNoteController,myNoteController,deleteNoteController};