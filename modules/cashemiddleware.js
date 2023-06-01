const redisClient = require("./redisClient")

// 캐시 미들웨어 함수
const cacheMiddleware = async (req, res, next) => {
    try {
        const originalUrl = req.originalUrl;
        // Redis에서 캐시 데이터 조회
        const getDataCashe = await redisClient.get(originalUrl)
        if (getDataCashe !== null) {
            // Redis에 캐시 데이터가 있는 경우
            console.log('Cache hit:', originalUrl);
            return (JSON.parse(getPooBoxAll))
        } else {
            // Redis에 캐시 데이터가 없는 경우
            console.log('Cache miss:', originalUrl);

            // 원래의 요청 처리 후 결과를 캐시에 저장

            // 캐시 유지 시간 설정 (예: 1분)
            const DEFAULT_EXPIRATION = 3600;
            const stringifiedData = JSON.stringify(body);

            // Redis에 데이터 저장
            redisClient.setEx(originalUrl, DEFAULT_EXPIRATION, stringifiedData)

        };

    } catch (error) {
        console.error(error)
        next(error);
    }

}

module.exports = cacheMiddleware