import express from "express";
import { register, fetch, deleteClass, update } from "../controllers/timeTableController";

const timeTableRouter = express.Router();

timeTableRouter.post("/register", register);
timeTableRouter.get("/fetch", fetch);
timeTableRouter.post("/class", deleteClass);
timeTableRouter.put("/:id", update);

export default timeTableRouter;
