"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import userController from '../controllers/userController'
const express_1 = __importDefault(require("express"));
const dashBoardController_1 = require("../controllers/dashBoardController");
const dashBoardRouter = express_1.default.Router();
dashBoardRouter.get('/fetch', dashBoardController_1.countStudentsInAllClasses);
exports.default = dashBoardRouter;
