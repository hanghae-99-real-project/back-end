const { Tokens } = require("../models");

class TokenRepository {
  // Tokens table에 refresh token 저장
    saveToken = async (userId, refreshToken) => {
    const saveToken = await Tokens.create({
        token: refreshToken,
        userId: userId,
    });

    return saveToken;
    };

  // 새로운 Access Token 발급받을때 Refresh Token으로 user_id 가져오기
    findTokenId = async (authRefreshToken) => {
        const accessTokenId = await Tokens.findOne({
        where: { token: authRefreshToken },
        });
        const { userId } = accessTokenId;

        return userId;
    };

    deleteToken = async (userId) => {
        await Tokens.destroy({ where: { userId } });
        return;
    };
}

module.exports = TokenRepository;
