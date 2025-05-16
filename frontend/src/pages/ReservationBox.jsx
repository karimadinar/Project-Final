import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationBox = ({ houseId, price }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        setTotalPrice(diffDays * price);
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, price]);

  const handleReservation = async () => {
    setMessage('');
    if (!startDate || !endDate) {
      setMessage('Veuillez choisir les deux dates.');
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      setMessage('La date de fin doit être après la date de début.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/reservations', {
        houseId,
        startDate,
        endDate,
        totalPrice,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });

      setMessage('Réservation réussie !');
      setStartDate('');
      setEndDate('');
      setTotalPrice(0);
      console.log('Réservation response:', response.data);
    } catch (error) {
      console.error('Erreur réservation détail:', error.response ? error.response.data : error.message);
      setMessage('Erreur lors de la réservation.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Réserver cette maison</h2>

      <label className="block mb-2 font-medium">Start Date:</label>
      <input
        type="date"
        className="w-full border rounded p-2 mb-4"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label className="block mb-2 font-medium">End Date:</label>
      <input
        type="date"
        className="w-full border rounded p-2 mb-4"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <p className="mb-4 font-semibold">Total Price: {totalPrice > 0 ? `${totalPrice} MAD` : 'N/A'}</p>

      <button
        onClick={handleReservation}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Réserver
      </button>

      {message && (
        <p className={`mt-4 font-semibold ${message.includes('Erreur') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ReservationBox;
