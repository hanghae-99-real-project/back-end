const UserService = require("../(2)services/users.service");


class UserController {
  userService = new UserService();



  signup = async (req, res, next) => {
    const {
      nickname,
      password,
      confirmpassword,
      phoneNumber,
      position,
      introduction,
      userLatitude,
      userLongitude
    } = req.body;
    const { userPhoto } = req;
    try {
      const nicknameFilter = /^[a-zA-Z0-9]{6,}/gi;
      const passwordFilter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      const phoneNumberFilter = /^\d+$/;
      const existNickname = await this.userService.findNickname(nickname);

      if (!nicknameFilter.test(nickname)) {
        return res
          .status(412)
          .json({ errorMessage: "닉네임의 형식이 일치하지 않습니다." });
      }

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


      if (password.includes(nickname)) {
        return res
          .status(412)
          .json({ errorMessage: "패스워드에 닉네임이 포함되어 있습니다." });
      }


      if (password !== confirmpassword) {
        return res
          .status(412)
          .json({ errorMessage: "패스워드가 일치하지 않습니다." });
      }

      if (existNickname) {
        return res.status(412).json({ errorMessage: "중복된 닉네임입니다." });
      }


      await this.userService.signup(
        nickname,
        password,
        phoneNumber,
        userPhoto,
        position,
        introduction,
        userLongitude,
        userLatitude
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
    const nicknameFilter = /^[a-zA-Z0-9]{6,}/gi;
    try {
      const existNickname = await this.userService.findNickname(nickname);
      if (existNickname || !nicknameFilter.test(nickname)) {
        return res.status(412).json({ message: false });
      }
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
      const { nickname, password } = req.body;

      if (!nickname || !password) {
        return res
          .status(412)
          .json({ errorMessage: "데이터의 형식이 일치하지 않습니다." });
      }

      const loginUser = await this.userService.loginUser(nickname);
      console.log(loginUser.userId);
      if (!loginUser || loginUser.password !== password) {
        return res
          .status(412)
          .json({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
      }

      const accessToken = await this.userService.createAccessToken(loginUser);
      const refreshToken = await this.userService.createRefreshToken();


      await this.userService.saveToken(loginUser, refreshToken);

      res.cookie("accesstoken", `Bearer ${accessToken}`);
      res.cookie("refreshtoken", `Bearer ${refreshToken}`);

      return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errorMessage: "로그인에 실패하였습니다." });
    }
  };


  // kakaoCallback = async (req, res) => {
  //   try {
  //     const profile = req.user; 

  //     const user = await userService.processKakaoLogin(profile);


  //     res.redirect('/profile');
  //   } catch (error) {
  //     res.redirect('/login');
  //   }
  // };

  logout = async (req, res, next) => {
    const userId = req.params;
    try {
      await this.userService.logout(userId);
      res.clearCookie("accesstoken");
      res.clearCookie("refreshtoken");

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
    const kakaoToken = headers.split(" ")[1];

    const accessToken = await this.userService.signInKakao(kakaoToken);
    
    return res.status(200).json({ accessToken: accessToken });
};
}

module.exports = UserController;
