const { Tokens } = require("../models");

class TokenRepository {
    saveToken = async (userId, refreshToken) => {
        client.set(refreshToken, userId);
        const saveToken = await Tokens.create({
            token: refreshToken,
            userId: userId,
        });

        return saveToken;
    };

    findTokenId = async (authRefreshToken) => {
        const userId = await new Promise((resolve, reject) => {

            client.get(authRefreshToken, (err, reply) => {
                if (err) reject(err);
                resolve(reply);
        });
    });

    return userId;
    };

    deleteToken = async (userId) => {
        await Tokens.destroy({ where: { userId } });
        client.del(userId);
        return;
    };
}

module.exports = TokenRepository;
