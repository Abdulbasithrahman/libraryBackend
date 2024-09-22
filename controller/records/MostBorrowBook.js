import Borrow from "../../models/Borrow.js"

export const MBbook = async(req,res)=>{
    try { 
    const pipeline = [
        {$group:{
            _id:"$bookId",
            borrowCount:{$sum:1}
        }},
        {
            $lookup:{
                from:"books",
                localField:"_id",
                foreignField:"_id",
                as:"book"
            }
        },
        {
            $unwind:"$book"
        },
        {
            $sort:{borrowCount:-1},
        },
        {
            $limit:10,
        },
        {
            $project:{
                title:"$book.title",
                author:"$book.author",
                borrowCount:1
            }
        }
    ]
    const mostBorrowed = await Borrow.aggregate(pipeline)
    res.status(200).json({message:"Most borrowed books fetched",data:mostBorrowed})
    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
}