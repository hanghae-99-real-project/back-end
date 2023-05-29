// const redisClient = require("./redisClient")

// // 캐시 미들웨어 함수
// function cacheMiddleware(req, res, next) {
//     const key = req.originalUrl;
//     console.log(key)
//     redisClient.set('kim', '1234')
//     // Redis에서 캐시 데이터 조회
//     redisClient.get(key, (err, data) => {
//         if (err) {
//             // Redis 조회 중 에러 발생
//             console.error('Redis Error:', err);
//             next();
//         }
//         if (data !== null) {
//             // Redis에 캐시 데이터가 있는 경우
//             console.log('Cache hit:', key);
//             const parsedData = JSON.parse(data);
//             res.send(parsedData);
//         } else {
//             // Redis에 캐시 데이터가 없는 경우
//             console.log('Cache miss:', key);

//             // 원래의 요청 처리 후 결과를 캐시에 저장

//             // 캐시 유지 시간 설정 (예: 1분)
//             const DEFAULT_EXPIRATION = 3600;
//             const stringifiedData = JSON.stringify(body);

//             // Redis에 데이터 저장
//             const endpoint = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`; // API 엔드포인트 URL
//             const headers = {
//                 Authorization: `KakaoAK ${process.env.KAKAO_APIKEY} `, // 카카오 API 키를 인증 헤더에 포함
//                 'Content-Type': 'application/json',
//             };

//             const response = await axios.get(endpoint, { headers });
//             redisClient.setEx(key, DEFAULT_EXPIRATION, stringifiedData, (err) => {
//                 if (err) {
//                     console.error('Redis Error:', err);
//                 }
//             });
//         };

//         next();
//     }
    
// }


// module.exports = cacheMiddleware