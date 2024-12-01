const API_BASE_URL = "https://request-flaskapi-qx9g.onrender.com"; // Cambia esto si es necesario

/**
 * Realiza una solicitud HTTP al backend en el endpoint `/`.
 * @param {string} method - El método HTTP ("GET", "POST", "PUT", "PATCH", "DELETE").
 * @param {Object} [data] - Los datos a enviar en el cuerpo de la solicitud (opcional).
 * @param {Object} [headers] - Encabezados personalizados (opcional).
 * @param {string} [token] - Token de autorización Bearer (opcional).
 * @param {string} [params] - Parámetros en la URL (opcional, para DELETE).
 * @returns {Promise<Object>} - Respuesta JSON del servidor.
 */
const sendRequest = async (method, data = null, headers = {}, token = null, params = '') => {
  const url = `${API_BASE_URL}/${params ? `?${params}` : ''}`; // Añade parámetros si existen
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(url, {
      method,
      headers: { ...defaultHeaders, ...headers },
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Error in request");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error during ${method} request to ${url}:`, error.message);
    throw error;
  }
};

/**
 * Realiza una solicitud GET al backend.
 */
export const getRequest = (headers = {}, token = null) => {
  return sendRequest("GET", null, headers, token);
};

/**
 * Realiza una solicitud POST al backend.
 */
export const postRequest = (data, headers = {}, token = null) => {
  return sendRequest("POST", data, headers, token);
};

/**
 * Realiza una solicitud PUT al backend.
 */
export const putRequest = (data, headers = {}, token = null) => {
  return sendRequest("PUT", data, headers, token);
};

/**
 * Realiza una solicitud PATCH al backend.
 */
export const patchRequest = (data, headers = {}, token = null) => {
  return sendRequest("PATCH", data, headers, token);
};

/**
 * Realiza una solicitud DELETE al backend.
 * @param {Object} headers - Encabezados personalizados.
 * @param {string} token - Token de autorización Bearer.
 * @param {string} params - Parámetros en la URL, e.g., "index=2".
 */
export const deleteRequest = (headers = {}, token = null, params = '') => {
  return sendRequest("DELETE", null, headers, token, params);
};
