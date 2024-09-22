import Borrow from "../../models/Borrow.js";

export const MAUsers = async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: "$userId",
                    borrowCount: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: "$user",
            },
            {
                $sort: { borrowCount: -1 },
            },
            {
                $limit: 10, 
            },
            {
                $project: {
                    name: "$user.name",
                    email: "$user.email",
                    borrowCount: 1,
                },
            },
        ]
        const activeMembers = await Borrow.aggregate(pipeline);

        res.status(200).json({ message: "Most active members fetched", activeMembers });
    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};
