const express = require('express');
const deviceCtrl = require("../controllers/device.controller");
const router = express.Router();

/* POST create device */
router.post('/', deviceCtrl.create);

/* DELETE remove device */
router.delete('/:id', deviceCtrl.remove);

module.exports = router;
