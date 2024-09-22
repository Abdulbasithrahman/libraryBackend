import Book from "../../models/Book.js";
import Borrow from "../../models/Borrow.js";

export const BAReport = async (req, res) => {
    try {
        const totalBooks = await Book.countDocuments(); 

        const borrowedBooksCount = await Borrow.aggregate([
            {
                $match: { returnDate: null }, 
            },
            {
                $group: {
                    _id: "$bookId",
                    borrowCount: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: null,
                    totalBorrowed: { $sum: "$borrowCount" },
                },
            },
        ]);

        const borrowedBooks = borrowedBooksCount[0]?.totalBorrowed || 0;

        const availableBooks = await Book.aggregate([
            {
                $group: {
                    _id: null,
                    totalAvailable: { $sum: "$copies" },
                },
            },
        ]);

        res.status(200).json({
            message: "Book availability report generated",
            totalBooks,
            borrowedBooks,
            availableBooks: availableBooks[0]?.totalAvailable || 0,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};
