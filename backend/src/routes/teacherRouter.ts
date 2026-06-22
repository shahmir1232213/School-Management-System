import express from "express";
import { register, fetch, update, remove } from "../controllers/teacherController";
import upload from "../config/multerConfig";

const teacherRouter = express.Router();

teacherRouter.post("/register", upload.single("image"), register);
teacherRouter.get("/fetch", fetch);
teacherRouter.put("/:id", upload.single("image"), update);
teacherRouter.delete("/:id", remove);

export default teacherRouter;
