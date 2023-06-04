const redisClient = require('../modules/redisClient')
//세션체크를 위한 미들웨어

module.exports = async (req, res, next) => {
    try {
        const getSession = await redisClient.get(`sess:${req.sessionID}`)
        if (getSession) {
            console.log("이미 로그인한 사용자입니다.")
            next()
        } else {
            console.log("로그인하지 않은 사용자 입니다.")
            next()
        }
    } catch (error) {
        next(error);
    }

}