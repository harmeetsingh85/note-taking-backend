const express=require('express');
const userRoutes=express.Router();
const {signUpController,signInController,createNoteController,myNoteController,deleteNoteController}=require('../controllers/userControllers');
const userMiddleware=require('../middlewares/userMiddleware');

userRoutes.post('/signUp',signUpController);
userRoutes.post('/signIn',signInController);
userRoutes.post('/createNote',userMiddleware,createNoteController);
userRoutes.get('/myNote',userMiddleware,myNoteController);
userRoutes.delete('/delNote',userMiddleware,deleteNoteController);

module.exports=userRoutes;