import express from "express";
import { login } from "../controllers/auth.js";
import { adminLogin } from "../controllers/AdminAuth.js"

const router = express.Router();

router.post("/login", login);
router.post("/admin/login", adminLogin);

export default  router;
