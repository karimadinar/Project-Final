// models/Reservation.js
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  house: { type: mongoose.Schema.Types.ObjectId, ref: "House", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isValid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reservation", reservationSchema);
