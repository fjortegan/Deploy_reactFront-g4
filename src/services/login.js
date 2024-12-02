import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useLogin = () => {
  const { login: updateContextLogin } = useContext(UserContext);

  const login = async (email, password) => {
    const url = "https://request-flaskapi-g4.orender.com/login";

    const credentials = btoa(`${email}:${password}`);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Login failed");
      }

      const data = await response.json();

      // Actualizar el contexto del usuario
      updateContextLogin({ email, token: data.access_token });

      // Guardar el token en las cookies
      document.cookie = `g4_session=${data.access_token}; path=/;`;

      return {
        success: true,
        message: "Login successful",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  return { login };
};
