const express = require('express');
const router = express.Router();
const service = require('../controllers/service');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/setpatient', service.setpatients);
router.post('/setdoctor', service.setdoctors);
router.post('/setappointment', service.setappointments);
router.get('/getpatient', service.getpatients);
router.get('/getdoctor', service.getdoctors);
router.get('/getappointment', service.getappointments);


module.exports = router;