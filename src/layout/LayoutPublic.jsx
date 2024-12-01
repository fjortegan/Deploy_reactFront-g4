// src/layout/LayoutPublic.jsx
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const LayoutPublic = () => {
  const { loggedIn } = useContext(UserContext);

  if (loggedIn) {
    // Si el usuario está autenticado, redirige a /api/get
    return <Navigate to="/api/get" replace />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutPublic;