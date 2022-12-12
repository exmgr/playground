const telemetryService = require("../services/telemetry.service");

async function download(req, res, next) {
    const jwt_token = await req.app.get("jwt_token")

    try {
        const resp = await telemetryService.download(jwt_token, req.params.device_id, "DEVICE")
        res.status(200).json(resp);
    } catch (err) {
        console.error(`Error while downloading telemetry`, err.message);
        next(err);
    }
}

async function upload(req, res, next) {
    const jwt_token = await req.app.get("jwt_token")
    const telemetryData = req.body;
    try {
        const resp = await telemetryService.upload(jwt_token, req.params.device_id, telemetryData, "DEVICE", "ANY");
        res.status(201).json(resp);
    } catch (err) {
        console.error(`Error while uploading telemetry`, err.message);
        next(err);
    }
}

module.exports = {
    download,
    upload
};
