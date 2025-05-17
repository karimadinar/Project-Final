import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationBox = ({ houseId, price }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/reservations/reserved-dates', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservedDates(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReservedDates();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        setTotalPrice(diffDays * price);
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
    }
    setAvailabilityMessage(''); 
  }, [startDate, endDate, price]);

  const isRangeAvailable = (start, end) => {
    for (const { startDate, endDate } of reservedDates) {
      const reservedStart = new Date(startDate);
      const reservedEnd = new Date(endDate);
      if (
        (start >= reservedStart && start <= reservedEnd) ||
        (end >= reservedStart && end <= reservedEnd) ||
        (start <= reservedStart && end >= reservedEnd)
      ) {
        return false;
      }
    }
    return true;
  };

  const checkAvailability = () => {
    if (!startDate || !endDate) {
      setAvailabilityMessage('');
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      setAvailabilityMessage('La date de fin doit être après la date de début.');
      return;
    }
    if (isRangeAvailable(new Date(startDate), new Date(endDate))) {
      setAvailabilityMessage('Les dates sont disponibles pour la réservation.');
    } else {
      setAvailabilityMessage('Ces dates sont déjà réservées. Veuillez choisir d\'autres dates.');
    }
  };

  useEffect(() => {
    checkAvailability();
  }, [startDate, endDate, reservedDates]);

  const handleReservation = async () => {
    setMessage('');
    if (!startDate || !endDate) {
      setMessage('Please choose both dates.');
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      setMessage('The end date must be after the start date.');
      return;
    }
    if (!isRangeAvailable(new Date(startDate), new Date(endDate))) {
      setMessage("These dates are already booked. Please choose other dates.");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/reservations', {
        houseId,
        startDate,
        endDate,
        totalPrice,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Reservation successful.');
      setStartDate('');
      setEndDate('');
      setTotalPrice(0);
      setAvailabilityMessage('');
    } catch (error) {
      setMessage('Reservation reject!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Book this house</h2>

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

      {availabilityMessage && (
        <p className={`mb-4 font-semibold ${availabilityMessage.includes('réservées') || availabilityMessage.includes('doit') ? 'text-red-600' : 'text-green-600'}`}>
          {availabilityMessage}
        </p>
      )}

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
