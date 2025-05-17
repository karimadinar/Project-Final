const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware');
const { confirmReservation,rejectReservation } = require('../controllers/emailController');

router.patch('/confirm/:id', authMiddleware, confirmReservation);
router.delete('/reject/:id',authMiddleware,rejectReservation)

module.exports = router;
