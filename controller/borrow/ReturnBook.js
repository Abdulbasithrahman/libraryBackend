import Book from "../../models/Book.js";
import Borrow from "../../models/Borrow.js";

export const ReturnBook = async (req, res) => {
    try {

        const { borrowId } = req.body;
        const borrow = await Borrow.findById(borrowId)
        if (!borrow) return res.status(400).json({ message: "Borrow record not found" })

        if (borrow.returnedAt) return res.status(400).json({ message: "Already returned" })

        borrow.returnedAt = new Date()
        borrow.save()
        const book = await Book.findById(borrow.bookId)
        book.copies += 1;
        await book.save()
        res.status(200).json({ message: "Book returned", book: book, borrow: borrow })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}