import { createContext, useState, useEffect } from "react";
import { Refresh } from "../services/refresh";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Función para leer las cookies
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // Inicializar el contexto al cargar
  useEffect(() => {
    const token = getCookie("g4_session");
    if (token) {
      Refresh(token)
        .then((response) => {
          if (response.success) {
            setLoggedIn(true);
            setUser({ token: response.token });
          } else {
            setLoggedIn(false);
            setUser(null);
          }
        })
        .catch(() => {
          setLoggedIn(false);
          setUser(null);
        });
    }
  }, []);

  // Función para realizar el inicio de sesión del usuario
  const login = (userData) => {
    setLoggedIn(true);
    setUser({
      ...userData,
    });
  };

  // Función para cerrar sesión del usuario
  const logout = () => {
    setLoggedIn(false);
    setUser(null);
    document.cookie =
      "g4_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  // Proporciona el contexto y sus valores a los componentes secundarios
  return (
    <UserContext.Provider value={{ loggedIn, user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
