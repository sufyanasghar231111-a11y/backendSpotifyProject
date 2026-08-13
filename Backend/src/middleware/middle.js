const jwt = require('jsonwebtoken')
const musicSchema = require('../models/music.model')
const config = require('../config/config')

 function authartist(req, res, next) {
  try {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer')) {
      return res.status(401).json({
        message: "token is not provide"
      })
    }
    const accessToken = header.split(' ')[1]

    const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN)

    if (decoded.role !== 'artist') {
      return res.status(403).json({
        message: "Unauthorized user"
      })
    }
    req.user = decoded
    next()
  }
  catch (e) {
     if (e.name === "TokenExpiredError") {
        return res.status(401).json({
            message: "Access token expired"
        });
    }

    return res.status(401).json({
        message: "Invalid access token"
    });

  }
}

 function adminMan(req, res, next) {
  try {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer')) {
      return res.status(401).json({
        message: "token is not provide"
      })
    }
    const accessToken = header.split(' ')[1]

    const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN)

    if (decoded.role !== 'admin') {
      res.status(403).json({
        message: "Unauthorized user"
      })
    }
    req.user = decoded
    next()
  }

  catch (e) {
     if (e.name === "TokenExpiredError") {
        return res.status(401).json({
            message: "Access token expired"
        });
    }

    return res.status(401).json({
        message: "Invalid access token"
    });

  }
}

 function getMusic(req, res, next) {
  try {

    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer')) {
      return res.status(401).json({
        message: "token is not provide"
      })
    }
    const accessToken = header.split(' ')[1]
    

    const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN)
    if (decoded.role !== 'user') {
      return res.status(403).json({
        message: 'Unauthorized'
      })
    }
    
   
    req.user = decoded
    next()
  }
  catch (err) {
     if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            message: "Access token expired"
        });
    }

    return res.status(401).json({
        message: "Invalid access token"
    });
  }


}

 function auth(req, res, next) {
  try {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer')) {
      return res.status(401).json({
        message: "token is not provide"
      })
    }
    const accessToken = header.split(' ')[1]

    const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN)
    req.user = decoded
    next()
  }
  catch (e) {
     if (e.name === "TokenExpiredError") {
        return res.status(401).json({
            message: "Access token expired"
        });
    }

    return res.status(401).json({
        message: "Invalid access token"
    });
  }
}

 function authorize (...roles){
  return (req, res, next) => {
    try{

      const header = req.headers.authorization
      
      if(!header || !header.startsWith('Bearer')){
        return res.status(401).json({
        message:"Token is required"
      })
    }

    const accessToken = header.split(' ')[1]
    const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN)

    if(!roles.includes(decoded.role)){
      return res.status(403).json({
        message:"Unauthorized"
      })
    }
    
    req.user = decoded
    next();
  }
  catch(err){
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            message: "Access token expired"
        });
    }

    return res.status(401).json({
        message: "Invalid access token"
    });
  }
  }
}


module.exports = { authartist, getMusic, adminMan, auth, authorize }