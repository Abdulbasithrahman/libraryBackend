import express from "express";
import verifyToken from "../middlewares/Auth.js";
import { TakeBook } from "../controller/borrow/TakeBook.js";
import { ReturnBook } from "../controller/borrow/ReturnBook.js";
import { History } from "../controller/borrow/BorrowHistory.js";

const router = express.Router()

router.post('/takebook',verifyToken,TakeBook)
router.put('/returnbook',verifyToken,ReturnBook)
router.get('/history',verifyToken,History)

export default router