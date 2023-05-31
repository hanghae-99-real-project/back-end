const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const TokenRepository = require("../(3)repositories/tokens.repository");

const tokenRepository = new TokenRepository();

module.exports = async (req, res, next) => {

    let { accesstoken, refreshtoken } = req.headers;
    console.log('이거보여주셈1', accesstoken, req.headers.refreshtoken, refreshtoken)



    try {
        accesstoken = !req.headers.refreshtoken ? req.cookies.accesstoken : accesstoken;
        refreshtoken = !req.headers.refreshtoken ? req.cookies.refreshtoken : refreshtoken;


        const [authAccessType, authAccessToken] = (accesstoken ?? "").split(" ");

        console.log('이거보여주셈2', refreshtoken)

        if ((!refreshtoken) || (authAccessType !== "Bearer" || !authAccessToken)) {
            res.locals.user = { userId: null }; // 가짜 사용자 객체를 만듭니다
            return next(); // 다음 핸들러로 이동
        }

        const isAccessTokenValidate = validateAccessToken(authAccessToken);
        const isRefreshTokenValidate = validateRefreshToken(refreshtoken);
        console.log('이거보여주셈3', isRefreshTokenValidate)


        if (!isRefreshTokenValidate) {
            return res.status(419).json({ errorMessage: "Refresh Token이 만료되었습니다." });
        }


        if (!isAccessTokenValidate) {
            const accessTokenId = await tokenRepository.findTokenId(refreshtoken);
            if (!accessTokenId) {
                return res.json({ errorMessage: "Refresh Token의 정보가 서버에 존재하지 않습니다.", });
            }
            const newAccessToken = createAccessToken(accessTokenId);

            console.log(newAccessToken)
            res.cookie("accesstoken", `Bearer ${newAccessToken}`);
            return res.status(200).json({ newAccessToken });
        }

        const { userId } = jwt.verify(authAccessToken, process.env.ACCESS_KEY);
        const user = await Users.findOne({ where: { userId: userId } });
        res.locals.user = user;

        next();
    } catch (error) {
        console.error(error);
        res.clearCookie("accesstoken");
        res.clearCookie("refreshtoken");
        return res.status(403).json({ errorMessage: "전달된 쿠키에서 오류가 발생하였습니다." });
    }
};



const createAccessToken = (accessTokenId) => {
    const accessToken = jwt.sign(
        { userId: accessTokenId },
        process.env.ACCESS_KEY,
        {
            expiresIn: process.env.ACCESS_EXPIRES,
        }
    );
    return accessToken;
};

// access token 검증 함수
const validateAccessToken = (authAccessToken) => {
    try {
        jwt.verify(authAccessToken, process.env.ACCESS_KEY);
        return true;
    } catch (error) {
        return false;
    }
};

// refresh token 검증 함수
const validateRefreshToken = (refreshtoken) => {
    try {
        jwt.verify(refreshtoken, process.env.REFRESH_KEY);
        return true;
    } catch (error) {
        return false;
    }
};
