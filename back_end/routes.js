const express=require('express');
const router=express.Router();
const usersRouter=require('./modules/users/index');

router.use("/user",usersRouter);





module.exports=router;