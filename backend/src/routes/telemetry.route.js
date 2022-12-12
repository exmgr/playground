const express = require('express');
const telemetryController = require("../controllers/telemetry.controller");
const router = express.Router();

/* GET download telemetry */
router.get('/:device_id', telemetryController.download);

/* POST upload telemetry */
router.post('/:device_id', telemetryController.upload);

module.exports = router;
