const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { houseId, startDate, endDate } = req.body;

    const newReservation = new Reservation({
      user: req.user.id,
      house: houseId,
      startDate,
      endDate,
      isValid: false,
    });

    const saved = await newReservation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la réservation", error: err.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("user", "name email")
      .populate("house", "city area price bedrooms type");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;
