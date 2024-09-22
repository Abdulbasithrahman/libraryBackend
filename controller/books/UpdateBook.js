import mongoose from "mongoose";
import Book from "../../models/Book.js";

export const UpdateBook = async (req, res) => {
    try {
        const updateFields = req.body;
        const { id } = req.params;

        const existingBook = await Book.findById( id )
        console.log(existingBook)
        if (!existingBook) return res.status(400).json({ message: "Book doesn't exist" })

        const UpdateBook = await Book.findByIdAndUpdate(
            id,
            {
                $set: updateFields
            },
            { new: true }
        )

        res.status(203).json({ message: "Updated", UpdatedBook: UpdateBook })

    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error: error.message })
    }
}