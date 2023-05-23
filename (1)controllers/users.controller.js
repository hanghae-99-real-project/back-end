const UserService = require("../(2)services/users.service");

class UserController {
  userService = new UserService();



  signup = async (req, res, next) => {
    const {
      nickname,
      password,
      confirmpassword,
      email,
      photoUrl,
      introduction,
    } = req;
    try {
      const nicknameFilter = /^[a-zA-Z0-9]{6,}/gi;
      const passwordFilter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      const existNickname = await this.userService.findNickname(nickname);
      const emailFilter = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/gi;

      if (!nicknameFilter.test(nickname)) {
        return res
          .status(412)
          .json({ errorMessage: "닉네임의 형식이 일치하지 않습니다." });
      }

      if (!emailFilter.test(email)) {
        return res
          .status(412)
          .json({ errorMessage: "이메일의 형식이 일치하지 않습니다." });
      }

      if (!passwordFilter.test(password)) {
        return res
          .status(412)
          .json({ errorMessage: "패스워드 형식이 일치하지 않습니다." });
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
        email,
        photoUrl,
        introduction
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
        .json({ errorMessage: "로그아웃에 실패하였습니다." });
    }
  };
}

module.exports = UserController;
