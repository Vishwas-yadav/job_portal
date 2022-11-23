const express=require('express');
const router=express.Router();
const usersRouter=require('./modules/users/index');
const adminRouter=require('./modules/admin/index');
const employerRouter=require('./modules/employer');
const candidateRouter=require('./modules/candidate');
router.use("/user",usersRouter);
router.use("/admin",adminRouter);
router.use("/employer",employerRouter);
router.use("/candidate",candidateRouter)



module.exports=router;