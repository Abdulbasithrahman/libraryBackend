import Borrow from "../../models/Borrow.js";

export const History = async (req, res) => {
    try {
        const userId = req.user._id; 

        const borrowHistory = await Borrow.find({ userId:userId }).populate("bookId", "title author");

        res.status(200).json({ message: "Borrow history fetched successfully", history: borrowHistory });
    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};
