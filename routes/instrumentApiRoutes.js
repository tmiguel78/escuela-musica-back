const express = require('express');
const router = express.Router();
const InstrumentApiController = require('../controllers/instrumentController');
const upload = require('../middlewares/upload');

router.get('/instrument', InstrumentApiController.showInstruments);

router.post('/instrument', upload.single('image'), InstrumentApiController.createInstrument);

router.put('/instrument/:instrumentId', upload.single('image'),InstrumentApiController.updateInstrument);

router.delete('/instrument/:instrumentId', InstrumentApiController.deleteInstrument);

module.exports = router;