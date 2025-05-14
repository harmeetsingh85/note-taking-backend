const jwt=require('jsonwebtoken');

async function userMiddleware(req,res,next){
    let token=req.headers.token;
    try{
        let verify=await jwt.verify(token,process.env.USER_SECRET);
        req.id=verify.id;
        console.log("authorized");
        next();
    }catch(e){
        res.status(402).json({"msg":"unautorized ho bhai"});
    }

}
module.exports=userMiddleware;