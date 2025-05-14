const mongoose=require('mongoose');

const noteSchema=new mongoose.Schema({
    title:{type:String},
    content:{type:String},
    createdBy:{type:mongoose.Schema.ObjectId,ref:'userModel'}
})
const notesModel=mongoose.model('notes',noteSchema);
module.exports=notesModel;