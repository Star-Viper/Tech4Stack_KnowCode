const express = require('express');
const router = express.Router();
const service = require('../controllers/service');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/setpatient',authMiddleware, service.setpatients);
router.post('/setdoctor', authMiddleware, service.setdoctors);
router.post('/setappointment', authMiddleware, service.setappointments);
router.get('/getpatient', authMiddleware, service.getpatients);
router.get('/getdoctor', authMiddleware, service.getdoctors);
router.get('/getappointment', authMiddleware, service.getappointments);


module.exports = router;