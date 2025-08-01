import express,{Request,Response}  from "express";
import {register,fetch} from '../controllers/teacherController'
import upload from  "../config/multerConfig"  
const teacherRouter = express.Router();

teacherRouter.post('/register', upload.single("image") ,register)
teacherRouter.get('/fetch',fetch)

export default teacherRouter
