const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/authMiddleware');

// Route example: admin dashboard
router.get('/dashboard', verifyAdmin, (req, res) => {
  res.json({ msg: 'Welcome to Admin Dashboard' });
});

// Route example: get all houses (admin only)
router.get('/houses', verifyAdmin, (req, res) => {
  // Example: fetch houses from DB (khassek tdir llogic dyalk hna)
  res.json({ msg: 'List of all houses for admin' });
});

module.exports = router;
