//import userController from '../controllers/userController'
import express,{Request,Response}  from "express";
import {register,fetch,promote} from '../controllers/classController'
const classRouter = express.Router();

classRouter.post('/register',register)
classRouter.get('/fetch',fetch)
classRouter.post('/promote',promote)

export default classRouter;
