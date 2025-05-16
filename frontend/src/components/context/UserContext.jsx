import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);  // نضيف حالة loading

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole'); 

    if (token && userName && userEmail && userRole) {
      setUserData({ name: userName, email: userEmail, role: userRole, token });
      setLoading(false);  // انتهاء التحميل هنا
    } else if (token) {
      axios
        .get('http://localhost:3000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          setUserData({ ...res.data, token });
          localStorage.setItem('userName', res.data.name);
          localStorage.setItem('userEmail', res.data.email);
          localStorage.setItem('userRole', res.data.role);
          setLoading(false);
        })
        .catch(() => {
          setUserData(null);
          localStorage.clear();
          setLoading(false);
        });
    } else {
      setUserData(null);
      setLoading(false);
    }
  }, []);

  const loginUser = (data) => {
    setUserData({ ...data.user, token: data.token });
    localStorage.setItem('token', data.token);
    localStorage.setItem('userName', data.user.name);
    localStorage.setItem('userEmail', data.user.email);
    localStorage.setItem('userRole', data.user.role);
  };

  const logoutUser = () => {
    setUserData(null);
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{ userData, loginUser, logoutUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
