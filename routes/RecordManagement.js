import express from "express";
import verifyToken from "../middlewares/Auth.js";
import roleMiddleware from "../middlewares/Role.js";
import { MBbook } from "../controller/records/MostBorrowBook.js";
import { MAUsers } from "../controller/records/ActiveUsers.js";
import { BAReport } from "../controller/records/BookAvailabilty.js";

const router = express.Router()

router.get('/most-borrowed',verifyToken,roleMiddleware(['Admin']),MBbook)
router.get('/most-active-users',verifyToken,roleMiddleware(['Admin']),MAUsers)
router.get('/availabilty',verifyToken,roleMiddleware(['Admin']),BAReport)

export default router;BAReport