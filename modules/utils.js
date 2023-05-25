// 코드 발급
const createAuthCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000);
    return code + "";
};

module.exports = createAuthCode