const UserService = require("@services/users.service.js");
const { Users } = require('@models')
const bcrypt = require("bcrypt");

class UserController {
  userService = new UserService();



  signup = async (req, res, next) => {
    const { nickname, password, phoneNumber, position } = req.body;
    const { userPhoto } = req;
    console.log("닉네임 콘솔로그", nickname)

    try {
      const passwordFilter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      const phoneNumberFilter = /^\d+$/;
      const existNickname = await this.userService.findNickname(nickname);
      console.log("아이디 중복 체크", existNickname)

      if (!passwordFilter.test(password)) {
        return res
          .status(401)
          .json({ errorMessage: "패스워드 형식이 일치하지 않습니다." });
      }

      if (!phoneNumberFilter.test(phoneNumber)) {
        return res
          .status(401)
          .json({ errorMessage: "핸드폰 번호 형식이 일치하지 않습니다." });
      }

      if (existNickname) {
        return res
          .status(401)
          .json({ errorMessage: "중복된 닉네임입니다." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("암호화된 패스워드 ", hashedPassword)
      const passwordMatch = await bcrypt.compare(password, hashedPassword);
      console.log(passwordMatch)
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ errorMessage: "아니 암호 비교가 왜 안돼??" })
      }

      await this.userService.signup(
        nickname,
        hashedPassword,
        phoneNumber,
        position,
        userPhoto
      );
      res.status(200).json({ message: "회원 가입에 성공하였습니다." });
    } catch (error) {
      error.failedApi = "회원가입";
      throw error
    }
  };


  checkNickname = async (req, res, next) => {
    const { nickname } = req.body;
    try {
      const existNickname = await this.userService.findNickname(nickname);

      return res.status(200).json({ message: true });
    } catch (error) {
      console.error(error);
      error.failedApi = "닉네임 중복확인";
      throw error
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
          .status(401)
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
      error.failedApi = "회원가입 탈퇴";
      throw error
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
          .status(401)
          .json({ errorMessage: "데이터의 형식이 일치하지 않습니다." });
      }


      const loginUser = await this.userService.loginUser(phoneNumber);
      const userId = loginUser.userId;
      const hashedPassword = loginUser.password;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (!passwordMatch) {
        return res.status(400).json({ message: "비밀번호를 확인해주세요" });
      }

      if (!loginUser || !passwordMatch) {
        return res
          .status(401)
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
      error.failedApi = "로그인";
      throw error
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
      error.failedApi = "로그아웃";
      throw error
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
    const {position ,userLongitude, userLatitude } = req.body
    console.log("포지션 들어오는지", position)
    const headers = req.headers["authorization"];
    const authCode = headers.split(" ")[1];
    const kakaoToken = await this.userService.getTokens(authCode);
    const jaja = await this.userService.signInKakao(kakaoToken, position, userLongitude, userLatitude);
    const accessToken = await this.userService.createKAccessToken(jaja)
    const refreshToken = await this.userService.createRefreshToken();
    res.cookie("accesstoken", `Bearer ${accessToken}`);
    res.cookie("refreshtoken", `Bearer ${refreshToken}`);
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
    } catch (error) {
      error.failedApi = "마이페이지 수정";
      throw error
    };
  }


  updatenickname = async (req, res) => {
    try {
      console.log("바디", req.body)
      const { nickname } = req.body;
      const { userId } = res.locals.user
      console.log("닉네임", nickname)

      await this.userService.updatenickname(
        userId,
        nickname,
      );
      res.status(200).json({ message: "닉네임을 수정하였습니다." });
    } catch (error) {
      error.failedApi = "마이페이지 닉네임 수정";
      throw error
    };
  }

  updatepass = async (req, res) => {
    try {
      console.log("바디", req.body)
      const { password } = req.body;
      const { userId } = res.locals.user

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.userService.updatepass(
        userId,
        hashedPassword,
      );
      res.status(200).json({ message: "패스워드를 수정하였습니다." });
    } catch (error) {
      error.failedApi = "마이페이지 패스워드 수정";
      throw error
    };
  }

  updateimage = async (req, res) => {
    try {
      const { userPhoto } = req;
      const { userId } = res.locals.user
      const { imageIndex } = req.params
      console.log(imageIndex)
      const profileImageUrl = await this.userService.updateimage(
        userId,
        userPhoto,
        imageIndex
      );
      res.status(200).json({ profileImageUrl });
    } catch (error) {
      error.failedApi = "마이페이지 이미지 수정";
      throw error
    };
  }


  newpass = async (req, res) => {
    try {
      const { phoneNumber } = req.body

      const newnumber = await this.userService.newpass(phoneNumber);
      res.status(200).json({ message: `새 비밀번호는 ${newnumber} 입니다 ` });
    } catch (error) {
      error.failedApi = "비밀번호 찾기";
      throw error
    };
  }

  findnick = async (req, res) => {
    const { phoneNumber } = req.body;
    try {
      const userdata = await this.userService.findphone(phoneNumber);
      return res.status(200).json({ message: `해당 당사자의 닉네임은${userdata.nickname}입니다` });
    } catch (error) {
      console.error(error);
      error.failedApi = "닉네임 찾기";
      throw error
    }
  };


}
module.exports = UserController;
