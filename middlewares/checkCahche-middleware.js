// 캐시 체크를 위한 미들웨어
const redisClient = require("../modules/redisClient")
checkCache = async (req, res, next) => {
    try {
        const cacheData = await redisClient.get(req.originalUrl)
        // Redis에 저장된게 존재한다.
        if (cacheData) {
            console.log("Cashe Hit")
            return res.status(200).send(JSON.parse(cacheData));
        } else {
            // Redis에 저장된게 없기 때문에 다음 로직 실행
            console.log('Cashe Miss')
            next();
        }
    } catch (error) {
        error.failedApi = "캐쉬 미들웨어 에러";
        throw error;
    }

}


module.exports = checkCache