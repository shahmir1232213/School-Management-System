import express from "express";
import { register, fetch, update, remove } from "../controllers/subjectController";

const subjectRouter = express.Router();

subjectRouter.post("/register", register);
subjectRouter.get("/fetch", fetch);
subjectRouter.put("/:id", update);
subjectRouter.delete("/:id", remove);

export default subjectRouter;
