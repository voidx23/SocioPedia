import express from "express";
import { getAllUsers, handleBlock, viewPost } from "../controllers/adminController.js";
import { adminLogin } from "../controllers/AdminAuth.js"

const router = express.Router();

router.get("/getAllUsers", getAllUsers)
router.get("/viewpost/:id", viewPost);
router.post("/login", adminLogin);

router.put("/handleBlock/:id", handleBlock)
export default router;
