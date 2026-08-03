const postSchema = require('../models/post.model')


const getMonthlyActiveUsersChart = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const { role } = req.query

        const match = {
                    lastActive: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lt: new Date(`${currentYear + 1}-01-01`)
                    }

                }

                if(role){
                    match.role = role
                }

        const result = await postSchema.aggregate(
            [{
                $match: match
            },
            {
                $group: {
                    _id: { $month: "$lastActive" },
                    users: { $sum: 1 }
                }
            },

            {
                $sort: { _id: 1 }
            }
            ]
        )

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        const currentMonth = new Date().getMonth()
        const chartData = months
        .slice(0, currentMonth + 1)
        .map((month, index) => {
            const item = result.find((r) => r._id === index + 1);

            return {
                month,
                users: item ? item.users : 0
            }
        })

        res.status(200).json({
            message:"Successful get",
            chartData
        })

    }
    catch (err) {
        res.status(500).json({
            message: "Internal error"
        })
    }
}

const getAllRole = async (req, res) => {
    try{
        const user = await postSchema.findById(req.user.id)
        const getRole = await postSchema.find({verified:true, _id:{$nin: user.blockedArtists}})
        res.status(200).json({
            message:"Successfull get",
            getRole
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal error"
        })
    }
}

module.exports = { getMonthlyActiveUsersChart, getAllRole }