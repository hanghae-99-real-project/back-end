const redisClient = require('../modules/redisClient');

class UserRepository {
    authCodeSend = async (authcode, phoneNum) => {
        const authCode = await redisClient.SETEX(phoneNum, 180, authcode);
        return authCode
    };

    authCodeVaildation = async (phoneNum) => {
        const authCode = await redisClient.get(phoneNum)
        return authCode
    };
}

module.exports = UserRepository