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
        userPhoto,
        email,
        introduction,
    ) => {
        const signupData = await this.userRepository.signup(
            nickname,
            password,
            userPhoto,
            email,
            introduction,
        );
        return signupData;
    };

    // 회원탈퇴 API
    deleteSignup = async (userId) => {
        await this.userRepository.deleteSignup(userId);
        return;
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
    // createUser = async () => { // 임의로 유저 값 넣어주는 코드
    //     try {
    //         const userLocation = { latitude: 12.774, longitude: 124.419 };  // Example coordinates
    //         const user = await this.userRepository.signup(
    //             'ExampleNickname',
    //             'securePassword123!',
    //             'BrianPark@example.com',
    //             'https://example.com/userProfile.jpg',
    //             'This is an example introduction.',
    //             userLocation
    //         );
    //         console.log('User created:', user);
    //         return user;
    //     } catch (error) {
    //         console.error('Error creating user:', error);
    //     }
    // };
}
// const userService = new UserService();
// userService.createUser();
module.exports = UserService;
