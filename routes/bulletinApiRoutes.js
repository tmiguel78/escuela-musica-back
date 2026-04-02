const express = require('express');
const router = express.Router();
const BulletinApiController = require('../controllers/bulletinController');
const upload = require('../middlewares/upload');
const verifyToken = require('../middlewares/auth');

router.get('/bulletin', BulletinApiController.showBulletin);

router.post('/bulletin', verifyToken, upload.single('image'), BulletinApiController.createBulletin);

router.put('/bulletin/:bulletinId', verifyToken, upload.single('image'), BulletinApiController.updateBulletin);

router.delete('/bulletin/:bulletinId', verifyToken, BulletinApiController.deleteBulletin);

module.exports = router;