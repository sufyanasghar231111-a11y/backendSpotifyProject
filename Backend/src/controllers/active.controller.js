const postSchema = require('../models/post.model')
const musicSchema = require('../models/music.model')
const albumSchema = require('../models/album.model')


const getMonthlyActiveUsersChart = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const { role } = req.query

        const match = {
            verified:true,
            lastActive: {
                $gte: new Date(`${currentYear}-01-01`),
                $lt: new Date(`${currentYear + 1}-01-01`)
            }

        }

        if (role) {
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
            message: "Successful get",
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
    try {
        const user = await postSchema.findById(req.user.id)
        const getRole = await postSchema.find({ verified: true, _id: { $nin: user.blockedArtists } })
        res.status(200).json({
            message: "Successfull get",
            getRole
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal error"
        })
    }
}

const MonthlySongAndAlbum = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear()

        const match = {
            lastCreate: {
                $gte: new Date(`${currentYear}-01-01`),
                $lt: new Date(`${currentYear + 1}-01-01`)
            }
        }

        const group = {
            _id: { $month: '$lastCreate' },
            data: { $sum: 1 }
        }

        const sort = {
            _id: 1
        }

        const result = await musicSchema.aggregate([
            { $match: match },

            { $group: group },
            {$sort: sort}
        ])
        
        const result2 = await albumSchema.aggregate([
            {$match: match },
            {$group: group},
            {$sort: sort}
        ])
        
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        const currentMonth = new Date().getMonth()
        const chart = months.
            slice(0, currentMonth + 1)
            .map((month, index) => {
                const item = result.find(item => item._id === index + 1)
                const item2 = result2.find(item => item._id === index + 1)

                return {
                    month,
                    songs: item ? item.data : 0,
                    albums: item2 ? item2.data : 0
                    
                }
            })


        res.status(200).json({
            message: "Successfull",
            chart
        })

    }
    catch (err) {
        res.status(500).json({
            message: "Internal error"
        })
    }
}

module.exports = { getMonthlyActiveUsersChart, getAllRole, MonthlySongAndAlbum }