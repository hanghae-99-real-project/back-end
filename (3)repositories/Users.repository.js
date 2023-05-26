const redisClient = require('../modules/redisClient');

class UserRepository {
    constructor(UsersModel) {
        this.usersModel = UsersModel;
    }


    findNickname = async (nickname) => {
        const existNickname = await this.usersModel.findOne({
            where: { nickname },
        });
        return existNickname;
    };

    signup = async (
        nickname,
        password,
        phoneNumber,
        userLocation,
        position,
        userPhoto,
        // introduction
    ) => {
        const signupData = await this.usersModel.create({
            nickname,
            password,
            phoneNumber,
            position,
            userLocation,
            userPhoto,
            // introduction,
        });
        return signupData;
    };


    // findOrCreateUser = async (id, username, email) => {
    //     try {
    //         let user = await User.findOne({ id });
    //         if (!user) {
    //         user = new User({ id, username, email });
    //         await user.save();
    //     }
    //       return user;
    //     } catch (error) {
    //     throw new Error('Failed to find or create user.');
    //     }
    //   };


    deleteSignup = async (userId) => {
        await this.usersModel.destroy({
            where: { userId },
        });
        return;
    };


    login = async (nickname) => {
        const loginUser = await this.usersModel.findOne({ where: { nickname } });
        return loginUser;
    };


    authCodeSend = async (authcode, phoneNumber) => {
        const authCode = await redisClient.SETEX(phoneNumber, 180, authcode);
        return authCode
    };

    authCodeVaildation = async (phoneNumber) => {
        const authCode = await redisClient.get(phoneNumber)
        return authCode
    };

}

module.exports = UserRepository;
