// sens.js
function send_message(phoneNumber, authcode) {

    // 예약자 번호, 닉네임, 코인이름
    const user_phone_number = phoneNumber;
    const user_authcode = authcode

    // 모듈들을 불러오기. 오류 코드는 맨 마지막에 삽입 예정
    const finErrCode = 404;
    const axios = require('axios');
    const CryptoJS = require('crypto-js');
    const date = Date.now().toString();

    // 환경변수로 저장했던 중요한 정보들
    const serviceId = process.env.SENS_SERVICE_ID;
    const secretKey = process.env.SENS_SECRET_KEY;
    const accessKey = process.env.SENS_ACCESS_KEY;
    const my_number = process.env.SENS_MYNUM;

    // 그 외 url 관련
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
    const url2 = `/sms/v2/services/${serviceId}/messages`;

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);

    axios({
        method: method,
        // request는 uri였지만 axios는 url이다
        url: url,
        headers: {
            "Contenc-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2": signature,
        },
        data: {
            type: "SMS",
            countryCode: "82",
            from: my_number,
            // 원하는 메세지 내용
            content: `푸댕에 가입해주셔서 감사합니다. \n인증번호는 ${user_authcode} 입니다`,
            messages: [
                // 신청자의 전화번호
                { to: `${user_phone_number}`, },],
        },
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    })
    return finErrCode

}

module.exports = send_message;