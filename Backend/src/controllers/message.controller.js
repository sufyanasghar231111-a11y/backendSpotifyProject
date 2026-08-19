const messageSchema = require('../models/message.model')
const conversationSchema = require('../models/conversation.model')
const AppError = require('../utils/AppError')
const { getIO } = require('../utils/socket')
const sendMessage = async (req, res) => {
    const { text } = req.body
    const { conversationId } = req.params

    const conversation = await conversationSchema.findOne({ participants: req.user.id, _id: conversationId })

    if (!conversation) {
        throw new AppError('Not found', 404)
    }

    const otherparticipant = conversation.participants.find(
        participant => participant.toString() !== req.user.id
    )

    if (!otherparticipant) {
        throw new AppError('receiver is not found', 404)
    }

    const CreateMessage = await messageSchema.create({
        text,
        sender: req.user.id,
        receiver: otherparticipant,
        conversation: conversationId
    })

    const io = getIO()

    io.to(`user:${otherparticipant.toString()}`).emit(
        'receive-message',
        CreateMessage
    )

    res.status(201).json({
        message: "Successful",
        CreateMessage
    })
}

module.exports = { sendMessage }