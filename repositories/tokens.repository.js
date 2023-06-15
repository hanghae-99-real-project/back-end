const { Tokens } = require("@models");

class TokenRepository {

    saveToken = async (userId, refreshToken) => {
        const saveToken = await Tokens.create({
            token: refreshToken,
            userId: userId,
        });

        return saveToken;
    };


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
