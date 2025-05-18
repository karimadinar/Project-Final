import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReservationBox = ({ houseId, price }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [reservedDates, setReservedDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get('http://localhost:3000/api/reservations/reserved-dates', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservedDates(res.data);
      } catch {}
    };
    fetchReservedDates();
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) {
      setTotalPrice(0);
      setAvailabilityMessage('');
      return;
    }
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);
    if (end <= start) {
      setTotalPrice(0);
      setAvailabilityMessage('End date must be after start date.');
      return;
    }
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    setTotalPrice(diffDays * price);
    for (const { startDate: rs, endDate: re } of reservedDates) {
      const reservedStart = new Date(rs);
      const reservedEnd = new Date(re);
      if (
        (start >= reservedStart && start <= reservedEnd) ||
        (end >= reservedStart && end <= reservedEnd) ||
        (start <= reservedStart && end >= reservedEnd)
      ) {
        setAvailabilityMessage("These dates are already booked. Please choose different dates.");
        return;
      }
    }
    setAvailabilityMessage('Dates are available for reservation.');
  }, [startDate, endDate, price, reservedDates]);

  const handleReservation = async () => {
    setMessage('');
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    if (!startDate || !endDate) {
      setMessage('Please select both start and end dates.');
      return;
    }
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);
    if (end <= start) {
      setMessage('End date must be after start date.');
      return;
    }
    for (const { startDate: rs, endDate: re } of reservedDates) {
      const reservedStart = new Date(rs);
      const reservedEnd = new Date(re);
      if (
        (start >= reservedStart && start <= reservedEnd) ||
        (end >= reservedStart && end <= reservedEnd) ||
        (start <= reservedStart && end >= reservedEnd)
      ) {
        setMessage("These dates are already booked. Please choose different dates.");
        return;
      }
    }

    try {
      await axios.post('http://localhost:3000/api/reservations', {
        houseId,
        startDate,
        endDate,
        totalPrice,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Reservation successful.');
      setStartDate('');
      setEndDate('');
      setTotalPrice(0);
      setAvailabilityMessage('');
    } catch (e) {
      setMessage(e.response?.data?.message || 'Reservation failed.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Reserve this house</h2>
      <label className="block mb-2 font-medium">Start date:</label>
      <input
        type="date"
        className="w-full border rounded p-2 mb-4"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
      />
      <label className="block mb-2 font-medium">End date:</label>
      <input
        type="date"
        className="w-full border rounded p-2 mb-4"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
      />
      <p className="mb-4 font-semibold">Total price: {totalPrice > 0 ? `${totalPrice} MAD` : 'N/A'}</p>
      {availabilityMessage && (
        <p className={`mb-4 font-semibold ${availabilityMessage.includes('booked') || availabilityMessage.includes('after') ? 'text-red-600' : 'text-green-600'}`}>
          {availabilityMessage}
        </p>
      )}
      <button
        onClick={handleReservation}
        className="w-full px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
      >
        Reserve
      </button>
      {message && (
        <p className={`mt-4 font-semibold ${message.toLowerCase().includes('failed') || message.toLowerCase().includes('error') || message.toLowerCase().includes('booked') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ReservationBox;
