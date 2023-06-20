const UserService = require("@services/users.service.js");
const { Users } = require('@models')
const bcrypt = require("bcrypt");

class UserController {
  userService = new UserService();



  signup = async (req, res, next) => {
    const { nickname, password, phoneNumber, position } = req.body;
    const { userPhoto } = req;
      await this.userService.signup(
        nickname,
        password,
        phoneNumber,
        position,
        userPhoto
      );
      res.status(200).json({ message: "회원 가입에 성공하였습니다." });
  };


  checkNickname = async (req, res, next) => {
    const { nickname } = req.body;
      const existNickname = await this.userService.findNickname(nickname);
      return res.status(200).json({ message: true });
  };

  // 회원탈퇴 API
  deleteSignup = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { nickname, password } = req.body;
      const existUser = await this.userService.findNickname(nickname);
      const usercut = await this.userService.usercut(existUser, nickname, password);
      if (usercut == true) {
        await this.userService.deleteSignup(userId);
        await req.session.destroy()
        return res.status(200).json({ message: "회원탈퇴에 성공하였습니다." });
      }
  };


  login = async (req, res, next) => {
      const {
        phoneNumber,
        password,
        userLongitude,
        userLatitude,
        position,
      } = req.body;
      
      const loginUser = await this.userService.loginUser(phoneNumber);
      const userId = await this.userService.checknull(phoneNumber, password, loginUser)
      await Users.update({ userLongitude: userLongitude, userLatitude: userLatitude, position: position,},{where: { userId }});

      const accessToken = await this.userService.createAccessToken(loginUser);
      const refreshToken = await this.userService.createRefreshToken();

      await this.userService.saveToken(loginUser, refreshToken);
      res.cookie("accesstoken", `${accessToken}`, { httpOnly: true, secure: false });
      res.cookie("refreshtoken", `${refreshToken}`, { httpOnly: true, secure: false });

      const sessionData = {
        userId: loginUser.userId,
        phoneNumber: loginUser.phoneNumber,
        nickname: loginUser.nickname,
        isLogined: true,
      };

      req.session.sessionData = sessionData;

      await req.session.save();
      return res.status(200).json({ accessToken, refreshToken });
  };




  logout = async (req, res, next) => {
    const userId = req.params;

      await this.userService.logout(userId);
      res.clearCookie("accesstoken");
      res.clearCookie("refreshtoken");
      req.session.destroy()
      return res.status(200).json({ message: "로그아웃에 성공하였습니다." });
  };

  authCodeSend = async (req, res, next) => {
    const { phoneNumber } = req.body
    const authCode = await this.userService.authCodeSend(phoneNumber)
    return res.status(200).json(authCode)

  };

  authCodeValidation = async (req, res, next) => {
    const { code, phoneNumber } = req.body;
    const authCode = await this.userService.authCodeValidation(code, phoneNumber)
    return res.status(200).json(authCode);
  };



  //카카오로그인
  signInKakao = async (req, res) => {
    const { position, userLongitude, userLatitude } = req.body
    const headers = req.headers["authorization"];
    const authCode = headers.split(" ")[1];
    const kakaoToken = await this.userService.getTokens(authCode);
    const jaja = await this.userService.signInKakao(kakaoToken, position, userLongitude, userLatitude);
    const accessToken = await this.userService.createKAccessToken(jaja)
    const refreshToken = await this.userService.createRefreshToken();
    res.cookie("accesstoken", `${accessToken}`);
    res.cookie("refreshtoken", `${refreshToken}`);
    return res.status(200).json({ accessToken, refreshToken });
  };

  updateUser = async (req, res) => {

      const { nickname, } = req.body;
      const { password } = req.body;
      const { userPhoto } = req;
      const { userId } = res.locals.user

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.userService.updateuser( userId, hashedPassword, nickname, userPhoto,);
      return res.status(200).json({ message: "마이페이지를 수정하였습니다." });
  }


  updatenickname = async (req, res) => {
      const { nickname } = req.body;
      const { userId } = res.locals.user
      await this.userService.updatenickname( userId, nickname,);
      return res.status(200).json({ message: "닉네임을 수정하였습니다." });
  }

  updatepass = async (req, res) => {
      const { password } = req.body;
      const { userId } = res.locals.user
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.userService.updatepass(
        userId,
        hashedPassword,
      );
      return res.status(200).json({ message: "패스워드를 수정하였습니다." });
  }

  updateimage = async (req, res) => {

      const { userPhoto } = req;
      const { userId } = res.locals.user
      const { imageIndex } = req.params
      const profileImageUrl = await this.userService.updateimage(
        userId,
        userPhoto,
        imageIndex
      );
      return res.status(200).json({ profileImageUrl });
  }


  newpass = async (req, res) => {
      const { phoneNumber } = req.body
      const newnumber = await this.userService.newpass(phoneNumber);
      return res.status(200).json({ message: `새 비밀번호는 ${newnumber} 입니다 ` });
  }

  findnick = async (req, res) => {
    const { phoneNumber } = req.body;
      const userdata = await this.userService.findphone(phoneNumber);
      return res.status(200).json({ message: `해당 당사자의 닉네임은${userdata.nickname}입니다` });
  };


}
module.exports = UserController;
