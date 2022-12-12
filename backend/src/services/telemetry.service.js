const axios = require('axios');

async function download(jwt_token, entity_id, entity_type = "DEVICE") {
    const url = process.env.WXM_API_URL + `/plugins/telemetry/${entity_type}/${entity_id}/values/timeseries?`
    const params = new URLSearchParams({
        "keys": "timestamp,temperature,humidity,pressure,wind_speed,wind_gust,wind_direction",
        "startTs": "1670608860310",
        "endTs": "1670609860310",
        "interval": "3600000",
        "agg": "SUM",
    });

    const config = {
        method: 'GET',
        url: url + params,
        headers: {
            "Accept-Encoding": "gzip,deflate,compress",
            "content-type": "application/json",
            "X-Authorization": "Bearer " + jwt_token,
        },
    };

    return await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch(function (e) {
            throw "error" + e
        });
}

async function upload(jwt_token, entity_id, body, entity_type = "DEVICE", scope = "ANY") {
    const url = process.env.WXM_API_URL + `/plugins/telemetry/${entity_type}/${entity_id}/timeseries/${scope}?scope=${scope}`

    const config = {
        method: 'POST',
        url: url,
        headers: {
            "content-type": "application/json", "X-Authorization": "Bearer " + jwt_token,
        },
        data: JSON.stringify(body)
    };

    return await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (e) {
            throw "error" + e
        });
}

module.exports = {
    download,
    upload
}
