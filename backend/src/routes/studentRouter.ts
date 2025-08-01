//import userController from '../controllers/userController'
import express,{Request,Response}  from "express";
import {register,fetch,feeStatusRenew,feesPaid} from '../controllers/studentController'
import upload from  "../config/multerConfig"  
const studentRouter = express.Router();

studentRouter.post('/register', upload.single("image"), register);
studentRouter.get('/fetch',fetch)
studentRouter.post('/feeStatusRenew',feeStatusRenew)
studentRouter.post('/feesPaid',feesPaid)


export default studentRouter;
