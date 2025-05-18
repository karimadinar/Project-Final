// Rou.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserContext } from './context/UserContext';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import Houses from '../pages/Houses';
import Services from '../pages/Services';
import HouseDetails from '../pages/HouseDetails';
import Login from './Login';
import SignUp from './SignUp';
import AddFavorite from './AddFavorite';
import ProtectedRoute from './ProtectedRoute';
import HouseForm from './HouseForm';
import ReservatinAdmin from './ReservatinAdmin';
import HousesAdmin from './housesAdmin';
import Admin from './Admin';



const Rou = () => {
  const { userData, loading } = useUserContext();

  if (loading) return <div>Loading...</div>;

  const userRole = userData?.role?.toLowerCase() || 'guest';

  if (userRole === 'admin') {
    return (
      <Routes>
         <Route
          path="/Admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/HousesAdmin"
          element={
            <ProtectedRoute requiredRole="admin">
              <HousesAdmin />
            </ProtectedRoute>
          }
        />
           <Route
          path="/HouseForm"
          element={
            <ProtectedRoute requiredRole="admin">
              <HouseForm />
            </ProtectedRoute>
          }
        />
          <Route
          path="/ReservatinAdmin"
          element={
            <ProtectedRoute requiredRole="admin">
              <ReservatinAdmin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/houses" element={<Houses />} />
      <Route path="/houses/:id" element={<HouseDetails />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/addFavorite" element={<AddFavorite />} />

      <Route path="/admin" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Rou;
