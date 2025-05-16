import React, { useState } from "react";
import { format } from "date-fns";
import { useNavigate, useLocation } from "react-router-dom";

const ReservationBox = ({ price }) => {
  const [dates, setDates] = useState({
    startDate: "",
    endDate: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDates(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!isLoggedIn) {
      sessionStorage.setItem("tempReservation", JSON.stringify({
        dates,
        from: location.pathname
      }));

      navigate("/login", {
        state: {
          from: location.pathname,
          message: "Connectez-vous pour compléter votre réservation"
        }
      });
      return;
    }

    if (!dates.startDate || !dates.endDate) {
      setError("Veuillez sélectionner les deux dates");
      return;
    }

    if (new Date(dates.endDate) <= new Date(dates.startDate)) {
      setError("La date de fin doit être après la date de début");
      return;
    }

    submitReservation();
  };

  const submitReservation = () => {
    const days = Math.ceil(
      (new Date(dates.endDate) - new Date(dates.startDate)) / (1000 * 60 * 60 * 24)
    );
    const total = days * price;

    alert(`Réservation confirmée du ${format(new Date(dates.startDate), "dd/MM/yyyy")} au ${format(new Date(dates.endDate), "dd/MM/yyyy")}\nTotal: ${total}€`);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto mt-6 sticky top-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Reserver</h3>
      
      {price && (
        <div className="mb-4">
          <span className="text-2xl font-bold text-blue-600">{price}</span>
          <span className="text-gray-500"> / nuit</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Date d'arrivée</label>
          <input
            type="date"
            name="startDate"
            value={dates.startDate}
            onChange={handleDateChange}
            min={format(new Date(), "yyyy-MM-dd")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Date de départ</label>
          <input
            type="date"
            name="endDate"
            value={dates.endDate}
            onChange={handleDateChange}
            min={dates.startDate || format(new Date(), "yyyy-MM-dd")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          {isLoggedIn ? "Confirmer la réservation" : " Reserver"}
        </button>
      </form>

      {isLoggedIn && dates.startDate && dates.endDate && (
        <div className="mt-4 text-sm text-gray-600">
          <div className="flex justify-between py-2 border-b">
            <span>{price} {Math.ceil((new Date(dates.endDate) - new Date(dates.startDate)) / (1000 * 60 * 60 * 24))} nuits</span>
            <span>{price * Math.ceil((new Date(dates.endDate) - new Date(dates.startDate)) / (1000 * 60 * 60 * 24))}</span>
          </div>
          <div className="flex justify-between font-bold py-2">
            <span>Total</span>
            <span>{price * Math.ceil((new Date(dates.endDate) - new Date(dates.startDate)) / (1000 * 60 * 60 * 24))}€</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationBox;
