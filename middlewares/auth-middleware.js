const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const TokenRepository = require("../(3)repositories/tokens.repository");

const tokenRepository = new TokenRepository();

// module.exports = async (req, res, next) => { // 로그인을 한 사용자만 사이트 조회 가능
//     let { accesstoken, refreshtoken } = req.headers;
//     console.log(req.headers);
//     console.log(accesstoken);
//     console.log(refreshtoken);


//     try {
//     accesstoken = !req.headers.refreshtoken
//         ? req.cookies.accesstoken
//         : accesstoken;

//     refreshtoken = !req.headers.refreshtoken
//         ? req.cookies.refreshtoken
//         : refreshtoken;
//     console.log(accesstoken);
//     console.log(refreshtoken);
//     const [authAccessType, authAccessToken] = (accesstoken ?? "").split(" ");
//     const [authRefreshType, authRefreshToken] = (refreshtoken ?? "").split(" ");

//     if (authRefreshType !== "Bearer" || !authRefreshToken) {
//         return res
//         .status(403)
//         .json({ errorMessage: "로그인이 필요한 기능입니다." });
//     }


//     if (authAccessType !== "Bearer" || !authAccessToken) {
//         return res
//         .status(400)
//         .json({ errorMessage: "로그인이 필요한 기능입니다." });
//     }

//     const isAccessTokenValidate = validateAccessToken(authAccessToken);
//     const isRefreshTokenValidate = validateRefreshToken(authRefreshToken);


//     if (!isRefreshTokenValidate) {
//         return res
//         .status(419)
//         .json({ errorMessage: "Refresh Token이 만료되었습니다." });
//     }


//     if (!isAccessTokenValidate) {
//         const accessTokenId = await tokenRepository.findTokenId(authRefreshToken);
//         if (!accessTokenId) {
//         return res.json({
//             errorMessage: "Refresh Token의 정보가 서버에 존재하지 않습니다.",
//         });
//     }
//         const newAccessToken = createAccessToken(accessTokenId);


//         res.cookie("accesstoken", `Bearer ${newAccessToken}`);
//         return res.status(200).json({ newAccessToken });
//     }


//     const { userId } = jwt.verify(authAccessToken, process.env.ACCESS_KEY);
//     const user = await Users.findOne({ where: { userId: userId } });
//     res.locals.user = user;

//     next();
//     } catch (error) {
//     console.error(error);
//     res.clearCookie("accesstoken");
//     res.clearCookie("refreshtoken");
//     return res
//         .status(403)
//         .json({ errorMessage: "전달된 쿠키에서 오류가 발생하였습니다." });
//     }
// };

module.exports = async (req, res, next) => { // 로그인을 한 사용자와 로그인을 하지 않은 사용자 둘 다 사이트 조회 가능  

    let { accesstoken, refreshtoken } = req.headers;



    try {
        accesstoken = !req.headers.refreshtoken ? req.cookies.accesstoken : accesstoken;
        refreshtoken = !req.headers.refreshtoken ? req.cookies.refreshtoken : refreshtoken;

        console.log(accesstoken)
        console.log(refreshtoken)
        const [authAccessType, authAccessToken] = (accesstoken ?? "").split(" ");
        const [authRefreshType, authRefreshToken] = (refreshtoken ?? "").split(" ");
        // 토큰이 없으면 무시하고 다음 핸들러로 이동
        if ((authRefreshType !== "Bearer" || !authRefreshToken) || (authAccessType !== "Bearer" || !authAccessToken)) {
            res.locals.user = { userId: null }; // 가짜 사용자 객체를 만듭니다
            return next(); // 다음 핸들러로 이동
        }

        const isAccessTokenValidate = validateAccessToken(authAccessToken);
        const isRefreshTokenValidate = validateRefreshToken(authRefreshToken);

        if (!isRefreshTokenValidate) {
            return res.status(419).json({ errorMessage: "Refresh Token이 만료되었습니다." });
        }

        if (!isAccessTokenValidate) {
            const accessTokenId = await tokenRepository.findTokenId(authRefreshToken);
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
const validateRefreshToken = (authRefreshToken) => {
    try {
        jwt.verify(authRefreshToken, process.env.REFRESH_KEY);
        return true;
    } catch (error) {
        return false;
    }
};
