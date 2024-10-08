import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    ISBN: { type: String, required: true, unique: true },
    publicationDate: { type: Date, required: true },
    genre: { type: String, required: true },
    copies: { type: Number, required: true },
  }, { timestamps: true });
  

const Book = mongoose.model("Book",bookSchema)

export default Book