//import userController from '../controllers/userController'
import express,{Request,Response}  from "express";
import {countStudentsInAllClasses} from '../controllers/dashBoardController'
const dashBoardRouter = express.Router();

dashBoardRouter.get('/fetch',countStudentsInAllClasses)

export default dashBoardRouter;
