const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    //Authorization and Bearer smelling like this 
    const authHeader = req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer'))
        return res.status(401).json({ message: "no token Authorization denied" })
    //split by 1 indexes
    const token = authHeader.split(' ')[1]
    //token is valid
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //how is verified
        req.userId = decoded.userId
        next()
    } catch (err) {
        //token is not valid
        return res.status(401).json({
            message: "Token is not valid"
        })
    }

}