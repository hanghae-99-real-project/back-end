const UserRepository = require("../(3)repositories/users.repository");
const TokenRepository = require("../(3)repositories/tokens.repository");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

class UserService {
    userRepository = new UserRepository(Users);
    tokenRepository = new TokenRepository();


    findNickname = async (nickname) => {
        const existNickname = await this.userRepository.findNickname(nickname);
        return existNickname;
    };

    signup = async (
        nickname,
        password,
        photoUrl,
        introduction
    ) => {
        const signupData = await this.userRepository.signup(
            nickname,
            password,
            photoUrl,
            introduction
        );
        return signupData;
    };



    loginUser = async (nickname) => {
        const loginUser = await this.userRepository.login(nickname);
        return loginUser;
    };


    createAccessToken = async (loginUser) => {
        const { userId } = loginUser;
        const accessToken = jwt.sign({ userId: userId }, process.env.ACCESS_KEY, {
        expiresIn: process.env.ACCESS_EXPIRES,
        });
        return accessToken;
    };


    createRefreshToken = async () => {
        const refreshToken = jwt.sign({}, process.env.REFRESH_KEY, {
            expiresIn: process.env.REFRESH_EXPIRES,
        });
        return refreshToken;
    };



    saveToken = async (loginUser, refreshToken) => {
        const { userId } = loginUser;
        await this.tokenRepository.saveToken(userId, refreshToken);
    };


    logout = async (userId) => {
        await this.tokenRepository.deleteToken(userId);
        return;
    };

}

module.exports = UserService;
