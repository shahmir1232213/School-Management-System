import express,{Request,Response}  from "express";
import {register,fetch,deleteClass} from '../controllers/timeTableController';
const timeTableRouter = express.Router();

timeTableRouter.post('/register',register)
timeTableRouter.get('/fetch',fetch)
timeTableRouter.post('/class',deleteClass)

export default timeTableRouter;
