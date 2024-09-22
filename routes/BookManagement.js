import express from "express";
import { AddBook } from "../controller/books/AddBook.js";
import verifyToken from "../middlewares/Auth.js";
import roleMiddleware from "../middlewares/Role.js";
import { UpdateBook } from "../controller/books/UpdateBook.js";
import { DeleteBook } from "../controller/books/DeleteBook.js";
import { AllBooks } from "../controller/books/AllBooks.js";

const router = express.Router()

router.post('/add',verifyToken,roleMiddleware(["Admin"]),AddBook)
router.put('/update/:id', verifyToken, roleMiddleware(["Admin"]), UpdateBook);
router.delete('/delete/:id', verifyToken, roleMiddleware(["Admin"]), DeleteBook);
router.put('/allBooks',verifyToken,AllBooks)

export default router