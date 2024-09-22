import Book from "../../models/Book.js";
import Borrow from "../../models/Borrow.js";
import User from "../../models/User.js";

export const TakeBook = async (req, res) => {
    try {
        const {bookId} = req.body;
        const userId = req.user._id

    const existingBorrow = await Borrow.findOne({userId,bookId,returnedAt:null})
    if (existingBorrow) {
        return res.status(400).json({ message: "You have already borrowed this book and not returned it" });
    }

    const existingMember = await User.findOne({ _id: userId, role: 'Member' })
    if (!existingMember) return res.status(401).json({ message: "Not a Member" })

    const book = await Book.findById(bookId);
    if (!book) {
        return res.status(404).json({ message: "Book not found." });
    }
    if (book.copies <= 0) {
        return res.status(400).json({ message: "No available copies of this book." });
    }
    
    const borrow = new Borrow({
        userId,
        bookId
    })
    await borrow.save()

    book.copies -= 1;
    await book.save();
    
    res.status(200).json({message:"Book borrowed",book:book,borrow:borrow})
} catch (error) {
    res.status(500).json({message:"Internal Server Error",error:error.message})
}
}