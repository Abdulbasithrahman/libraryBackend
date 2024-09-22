import Book from "../../models/Book.js"

export const AllBooks = async (req, res) => {
    try {
        
        const { filter, page, limit } = req.body;
        const matchStage = {}
        
        if (filter?.title) {
            matchStage.title = { $regex: filter.title, $options: 'i' };
        }
        if (filter?.author) {
            matchStage.author = { $regex: filter.author, $options: 'i' }
        }
        
        const pageNum = parseInt(page, 10)
        const limitNum = parseInt(limit, 10)
        const skip = (pageNum - 1) * limitNum
        
        const books = await Book.aggregate([
            { $match: matchStage },
        { $skip: skip },
        { $limit: limitNum },
        {
            $project: {
                _id: 1,
                title: 1,
                author: 1,
                genre: 1,
                publicationDate: 1,
                copies: 1,
            }
        }
    ])
    
    const totalBooks = await Book.countDocuments(matchStage)
    res.status(200).json({ message: "All Books Fetched Successfully", books , totalPages:Math.ceil(totalBooks/limitNum),currentPage:pageNum, totalBooks })
} catch (error) {
    res.status(500).json({ message: "Internal Server error", error: error.message })
}
}