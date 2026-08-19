const conversationSchema = require('../models/conversation.model')

const getOrCreateConversation = async (req, res, next) => {
    try {

        const { userId } = req.body
        const currentUserId = req.user.id

        if (!userId) {
            return res.status(400).json({
                message: "user id is required"
            })
        }

        if (userId.toString() === currentUserId.toString()) {
            return res.status(400).json({
                message: "You cannot create conversation with yourself"
            })
        }

        // find conversation exist or not if yes return if not create new 
        let conversation = await conversationSchema.findOne({
            participants: {
                $all: [ currentUserId, userId ]
            }
        })

        if (!conversation) {
            conversation = await conversationSchema.create({
                participants: [
                  currentUserId, userId 
                ]
            })
        }

        res.status(201).json({
            message: "successful",
            conversation
        })
    }
    catch (err) {
        next(err)
    }
}

module.exports = { getOrCreateConversation }