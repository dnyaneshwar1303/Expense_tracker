import e from "express";
import { addExpense, updateExpense, getExpense } from "../Controllers/expenseController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router=e.Router();

router.post("/addexpense",authMiddleware,addExpense);
router.put("/updateexpense/:id",authMiddleware,updateExpense);
router.get("/getexpense",authMiddleware,getExpense);

export default router;