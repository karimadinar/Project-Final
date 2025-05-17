const Reservation = require('../models/Reservation');
const sendEmail = require('../utils/sendEmail');

const confirmReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('user');

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }

    
    reservation.isValid = true;
    await reservation.save();

    await sendEmail(
      reservation.user.email,
      "Confirmation de réservation",
      `Bonjour ${reservation.user.name},\n\nVotre réservation a été confirmée. Merci pour votre confiance.\n\n- L'équipe Rezerv.ma`
    );

    return res.status(200).json({ message: "Réservation confirmée et email envoyé avec succès." });

  } catch (error) {
    console.error("Erreur lors de la confirmation :", error);
    return res.status(500).json({ message: "Erreur serveur lors de la confirmation." });
  }
};
const rejectReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('user');

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }

    await Reservation.findByIdAndDelete(req.params.id);

    await sendEmail(
      reservation.user.email,
      "Réservation refusée",
      `Bonjour ${reservation.user.name},\n\nNous vous informons que votre demande de réservation a été refusée.\n\n- L'équipe Rezerv.ma`
    );

    return res.status(200).json({ message: "Réservation rejetée et email envoyé." });

  } catch (error) {
    console.error("Erreur lors du rejet :", error);
    return res.status(500).json({ message: "Erreur serveur lors du rejet." });
  }
};

module.exports = { confirmReservation, rejectReservation};
