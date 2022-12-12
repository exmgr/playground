const deviceService = require("../services/device.service");

async function create(req, res, next) {
    const jwt_token = await req.app.get("jwt_token")
    try {
        const resp = await deviceService.create(jwt_token, req.body.name, req.body.label);
        res.status(201).json({
            id: resp.id.id
        });
    } catch (err) {
        console.error(`Error while creating device`, err.message);
        next(err);
    }
}

async function remove(req, res, next) {
    const jwt_token = await req.app.get("jwt_token")

    try {
        res.json(await deviceService.remove(jwt_token, req.params.id));
    } catch (err) {
        console.error(`Error while removing device`, err.message);
        next(err);
    }
}

module.exports = {
    create,
    remove
};
