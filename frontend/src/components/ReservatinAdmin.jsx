import React, { useEffect, useState } from "react";
import axios from "axios";

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
        `http://localhost:3000/api/reservations/${reservationId}`,
        { isValid: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReservations();
    } catch (error) {
      console.error("Erreur lors de la confirmation", error);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des réservations</h1>
      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reservations.map((res) => (
            <div key={res._id} className="border rounded-xl p-4 shadow-sm bg-white">
              <p>
                <strong>User:</strong> {res.user.name} ({res.user.email})
              </p>
              <p>
                <strong>House:</strong> {res.house.city} - {res.house.area} - {res.house.type}
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
                <span className={res.isValid ? "text-green-600" : "text-yellow-600"}>
                  {res.isValid ? "Confirmée" : "En attente"}
                </span>
              </p>
              {!res.isValid && (
                <button
                  onClick={() => handleConfirm(res._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mt-3"
                >
                  Confirmer
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationAdmin;
