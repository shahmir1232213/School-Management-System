import express from "express";
import {
  register,
  fetch,
  feeStatusRenew,
  feesPaid,
  update,
  remove,
} from "../controllers/studentController";
import upload from "../config/multerConfig";

const studentRouter = express.Router();

studentRouter.post("/register", upload.single("image"), register);
studentRouter.get("/fetch", fetch);
studentRouter.post("/feeStatusRenew", feeStatusRenew);
studentRouter.post("/feesPaid", feesPaid);
studentRouter.put("/:id", upload.single("image"), update);
studentRouter.delete("/:id", remove);

export default studentRouter;
