import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ReservationAdmin = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(res.data);
    } catch (error) {
      setError("Erreur lors du chargement des réservations");
      console.error("Erreur lors du chargement des réservations", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (reservationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/api/email/confirm/${reservationId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReservations(); // Refresh after confirm
    } catch (error) {
      console.error("Erreur lors de la confirmation:", error);
    }
  };

  const handleReject = async (reservationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/email/reject/${reservationId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReservations(); // Refresh after reject
    } catch (error) {
      console.error("Erreur lors du rejet de la réservation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Liste des réservations</h1>
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          ⬅ Go Back
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-700">Chargement...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : reservations.length === 0 ? (
        <p className="text-center text-gray-600">Aucune réservation trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reservations.map((res) => {
            const userName = res.user?.name || "Utilisateur inconnu";
            const userEmail = res.user?.email || "Email non disponible";
            const houseInfo = res.house
              ? `${res.house.city} - ${res.house.area} - ${res.house.type}`
              : "Maison non disponible";

            return (
              <div key={res._id} className="border rounded-xl p-5 bg-white shadow-md">
                <p>
                  <strong>User:</strong> {userName} ({userEmail})
                </p>
                <p>
                  <strong>House:</strong> {houseInfo}
                </p>
                <p>
                  <strong>Start:</strong> {new Date(res.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End:</strong> {new Date(res.endDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total Price:</strong> {res.totalPrice ? `${res.totalPrice} MAD` : "N/A"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      res.isValid
                        ? "text-green-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {res.isValid ? "Confirmée" : "En attente"}
                  </span>
                </p>
                {!res.isValid && (
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => handleConfirm(res._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                      Confirmer
                    </button>
                    <button
                      onClick={() => handleReject(res._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                      Rejeter
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReservationAdmin;
