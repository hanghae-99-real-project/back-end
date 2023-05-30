// 캐시 체크를 위한 미들웨어
checkCache = (req, res, next) => {
    redisClient.get(req.url, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        // Redis에 저장된게 존재한다.
        if (data != null) {
            res.send(data);
        } else {
            // Redis에 저장된게 없기 때문에 다음 로직 실행
            next();
        }
    });
};