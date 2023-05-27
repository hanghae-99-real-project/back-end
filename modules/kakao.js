const axios = require('axios');

const getAddress = async (lat, lon) => {
    const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`, {
        headers: {
            'Authorization': `KakaoAK ${process.env.KAKAO_API_KEY}`
        }
    });

    const address = response.data.documents[0]?.address?.address_name;
    return address;
}

module.exports = getAddress