import mongoose from "mongoose";
import Book from "../../models/Book.js";

export const DeleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const existingBook = await Book.findById( id )
        if (!existingBook) return res.status(400).json({ message: "Book doesn't exist" })

        const deletedBook = await Book.findByIdAndDelete(id)

        res.status(203).json({ message: "Deleted", DeletedBook: deletedBook })

    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error: error.message })
    }
}