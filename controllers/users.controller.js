const UserService = require("../services/users.service.js");
const { Users } = require('../models')
const bcrypt = require("bcrypt");

class UserController {
  userService = new UserService();



  signup = async (req, res, next) => {
    const { nickname, password, phoneNumber, position } = req.body;
    const { userPhoto } = req;

    try {
      const passwordFilter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      const phoneNumberFilter = /^\d+$/;
      const existNickname = await this.userService.findNickname(nickname);

      if (!passwordFilter.test(password)) {
        return res
          .status(412)
          .json({ errorMessage: "패스워드 형식이 일치하지 않습니다." });
      }

      if (!phoneNumberFilter.test(phoneNumber)) {
        return res
          .status(412)
          .json({ errorMessage: "핸드폰 번호 형식이 일치하지 않습니다." });
      }

      if (existNickname) {
        return res.status(412).json({ errorMessage: "중복된 닉네임입니다." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await this.userService.signup(
        nickname,
        hashedPassword,
        phoneNumber,
        position,
        userPhoto
      );
      res.status(200).json({ message: "회원 가입에 성공하였습니다." });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
  };


  checkNickname = async (req, res, next) => {
    const { nickname } = req.body;
    try {
      const existNickname = await this.userService.findNickname(nickname);

      return res.status(200).json({ message: true });
    } catch (error) {
      console.error(error);
      return res
        .status(412)
        .json({ errorMessage: "닉네임 중복 확인에 실패하였습니다." });
    }
  };

  // 회원탈퇴 API
  deleteSignup = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { nickname, password } = req.body;

    try {
      const existUser = await this.userService.findNickname(nickname);

      if (existUser.nickname === nickname && existUser.password === password) {
        return res
          .status(412)
          .json({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
      }
      if (userId === existUser.userId) {
        await this.userService.deleteSignup(userId);
        //회원탈퇴시 세션제거
        await req.session.destroy()
        return res.status(200).json({ message: "회원탈퇴에 성공하였습니다." });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errorMessage: "회원탈퇴에 실패하였습니다." });
    }
  };


  login = async (req, res, next) => {
    try {
      const {
        phoneNumber,
        password,
        userLongitude,
        userLatitude,
        position,
      } = req.body;

      if (!phoneNumber || !password) {
        return res
          .status(412)
          .json({ errorMessage: "데이터의 형식이 일치하지 않습니다." });
      }

      const loginUser = await this.userService.loginUser(phoneNumber);
      const userId = loginUser.userId;

      const passwordMatch = await bcrypt.hash(password, 10);
      if (!loginUser || !passwordMatch) {
        return res
          .status(412)
          .json({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
      }

      await Users.update(
        {
          userLongitude: userLongitude,
          userLatitude: userLatitude,
          position: position,
        },
        {
          where: { userId },
        }
      );

      const accessToken = await this.userService.createAccessToken(loginUser);
      const refreshToken = await this.userService.createRefreshToken();

      await this.userService.saveToken(loginUser, refreshToken);
      res.cookie("accesstoken", `Bearer ${accessToken}`);
      res.cookie("refreshtoken", `${refreshToken}`);

      const sessionData = {
        userId: loginUser.userId,
        phoneNumber: loginUser.phoneNumber,
        nickname: loginUser.nickname,
        isLogined: true,
      };

      req.session.sessionData = sessionData;

      await req.session.save();
      return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errorMessage: "로그인에 실패하였습니다." });
    }
  };




  logout = async (req, res, next) => {
    const userId = req.params;
    try {
      await this.userService.logout(userId);
      res.clearCookie("accesstoken");
      res.clearCookie("refreshtoken");
      req.session.destroy()

      return res.status(200).json({ message: "로그아웃에 성공하였습니다." });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errorMessage: "못.. 도망친다..." });
    }
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
    const headers = req.headers["authorization"];
    console.log("헤더에 담긴 내용", headers)
    const authCode = headers.split(" ")[1];
    console.log("스플릿 해서 담은 결과", authCode)
    const kakaoToken = await this.userService.getTokens(authCode);
    console.log("1차전 마치고 나온 결과물.", kakaoToken)
    const { accessToken } = await this.userService.signInKakao(kakaoToken);
    const refreshToken = await this.userService.createRefreshToken();
    res.cookie("accesstoken", `Bearer ${accessToken}`);
    console.log("엑세스 토큰.", accessToken)
    res.cookie("리프레쉬 토큰", refreshToken);
    return res.status(200).json({ accessToken, refreshToken });
  };

  updateUser = async (req, res) => {
    try {
      const { nickname, } = req.body;
      const { password } = req.body;
      const { userPhoto } = req;
      const { userId } = res.locals.user

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.userService.updateuser(
        userId,
        hashedPassword,
        nickname,
        userPhoto,
      );
      res.status(200).json({ message: "마이페이지를 수정하였습니다." });
    } catch (err) {
      console.error(err);
      res.status(400).send({ errorMessage: "마이페이지 수정에 실패하였습니다." });
    }
  };
}

module.exports = UserController;
