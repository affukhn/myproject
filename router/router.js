const express = require('express');
const app=express()
const router = express.Router();
const controller = require('../controller/controller');
const upload = require('../middleware/upload');
const authenticate= require('../middleware/authenticate')

router.get("/user",controller.index)
router.post("/show",authenticate,controller.show)
router.post("/update",controller.update)
router.post("/store",upload.array('avatar[]'),controller.store)
router.post("/delete",controller.Delete)

module.exports = router;