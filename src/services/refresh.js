export const Refresh = async (token) => {
    const url = "https://request-flaskapi-g4.onrender.com/refresh";
  
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Refresh failed");
      }
  
      const data = await response.json();
  
      // Guardar el token en las cookies
      document.cookie = `g4_session=${data.access_token}; path=/;`;
  
      return {
        success: true,
        token: data.access_token,
        message: "Refresh successful",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };
  
