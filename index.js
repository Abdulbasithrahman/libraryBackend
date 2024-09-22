import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'

connectDB();

import User from './routes/User.js'
import BookManagement from './routes/BookManagement.js'
import BorrowManagement from './routes/BorrowManagement.js'
import RecordsMangement from './routes/RecordManagement.js'
import connectDB from './config/DbConfig.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/user',User)
app.use('/book',BookManagement)
app.use('/borrow',BorrowManagement)
app.use('/records',RecordsMangement)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server started on this port number ${PORT}`)
})