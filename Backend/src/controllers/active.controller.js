const postSchema = require('../models/post.model')


const monthlyActiveUser = async (req, res) => {
    try {
        const startOfMonth = new Date()
        startOfMonth.getDate(1)
        startOfMonth.setHours(0, 0, 0, 0)

        const total = await postSchema.countDocuments(
            {
                lastActive: {
                    $gte: startOfMonth
                }
            }
        )

        res.status(200).json({
            message: "Successful get",
            total
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal error"
        })
    }
}

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


        const chartData = months.map((month, index) => {
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

module.exports = { monthlyActiveUser, getMonthlyActiveUsersChart }