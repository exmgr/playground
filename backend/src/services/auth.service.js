const axios = require("axios");

async function login() {
    const url = process.env.WXM_API_URL + "/auth/login"
    const body = {
        "username": process.env.WXM_USERNAME,
        "password": process.env.WXM_PASSWORD,
    }
    const config = {
        method: 'POST',
        url: url,
        headers: {
            "Accept-Encoding": "gzip,deflate,compress",
            "content-type": "application/json",
        },
        data: JSON.stringify(body)
    };

    return await axios(config)
        .then(function (response) {
            return response.data.token;
        })
        .catch(function (e) {
            throw `Error while authenticating` + e
        });
}

module.exports = {
    login
}
