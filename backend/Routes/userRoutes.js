import e from "express";
import { addUser, login } from "../Controllers/userController.js";

const router=e.Router();

router.post("/auth/signup",addUser);
router.post("/auth/login",login);

export default router;