const jwt = require('jsonwebtoken')
const musicSchema = require('../models/music.model')

async function authartist(req, res, next) {
  try {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer')) {
      return res.status(401).json({
        message: "token is not provide"
      })
    }
    const accessToken = header.split(' ')[1]

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN)

    if (decoded.role !== 'artist') {
      return res.status(403).json({
        message: "Unauthorized user"
      })
    }
    req.user = decoded
    next()
  }
  catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Unauthorized'
    })

  }
}

async function adminMan(req, res, next) {
  try {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer')) {
      return res.status(401).json({
        message: "token is not provide"
      })
    }
    const accessToken = header.split(' ')[1]

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN)

    if (decoded.role !== 'admin') {
      res.status(403).json({
        message: "Unauthorized user"
      })
    }
    req.user = decoded
    next()
  }

  catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Unauthorized'
    })

  }
}

async function getMusic(req, res, next) {
  try {

    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer')) {
      return res.status(401).json({
        message: "token is not provide"
      })
    }
    const accessToken = header.split(' ')[1]
    

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN)
    if (decoded.role !== 'user') {
      return res.status(403).json({
        message: 'Unauthorized'
      })
    }
    
   
    req.user = decoded
    next()
  }
  catch (err) {
    res.status(500).json({
      message: "Internal error"
    })
  }


}

async function auth(req, res, next) {
  try {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer')) {
      return res.status(401).json({
        message: "token is not provide"
      })
    }
    const accessToken = header.split(' ')[1]

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN)
    req.user = decoded
    next()
  }
  catch (e) {
    res.status(500).json({
      message: "Internal error",
      error:e.message
    })
  }
}



module.exports = { authartist, getMusic, adminMan, auth }