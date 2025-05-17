const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const { authMiddleware } = require("../middleware/authMiddleware");

const getReservedDates = async (req, res) => {
  try {
    const reservations = await Reservation.find({ isValid: true });
    const reservedDates = reservations.map(r => ({
      startDate: r.startDate,
      endDate: r.endDate
    }));
    res.status(200).json(reservedDates);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération des dates réservées." });
  }
};

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

router.get("/reserved-dates", authMiddleware, getReservedDates);

module.exports = router;
