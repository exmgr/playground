const axios = require("axios");

async function create(jwt_token, name, label) {
    const url = process.env.WXM_API_URL + "/device"
    const body = {
        "name": name,
        "label": label,
        "deviceProfileId": {"entityType": "DEVICE_PROFILE", "id": process.env.DEVICE_PROFILE_ID},
    }
    const config = {
        method: 'POST',
        url: url,
        headers: {
            "content-type": "application/json", "X-Authorization": "Bearer " + jwt_token,
        },
        data: JSON.stringify(body),
    };

    return await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (e) {
            throw "error creating device: " + e
        });
}

async function remove(jwt_token, deviceId) {
    const url = process.env.WXM_API_URL + "/device/" + deviceId

    const config = {
        method: 'DELETE',
        url: url,
        headers: {
            "content-type": "application/json", "X-Authorization": "Bearer " + jwt_token,
        },
    };

    return await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (e) {
            throw "error removing device: " + e
        });
}

module.exports = {
    create, remove
}
