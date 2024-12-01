import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import {
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
  deleteRequest,
} from '../../services/requests';
import { UserContext } from '../../context/userContext';

const Requests = () => {
  const { name } = useParams(); // Obtener el parámetro dinámico de la URL
  const { user } = useContext(UserContext); // Obtener el token del contexto
  const validEndpoints = ['get', 'post', 'put', 'delete', 'patch', 'options'];
  const [params, setParams] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!validEndpoints.includes(name)) {
      setError('Invalid API endpoint');
    } else {
      setError('');
    }
  }, [name]);

  const handleSendRequest = async () => {
    if (!validEndpoints.includes(name)) {
      setError('Invalid API endpoint');
      setResponse(null);
      return;
    }

    setError('');
    setResponse(null);

    const token = user?.token; // Obtener el token del contexto
    const customHeaders = {
      Authorization: `Bearer ${token}`, // Incluir el token automáticamente
    };

    try {
      let resData;

      // Determina la función según el método en la URL
      switch (name.toLowerCase()) {
        case 'get':
          resData = await getRequest(customHeaders, token);
          break;
        case 'post':
          resData = await postRequest(JSON.parse(body || '{}'), customHeaders, token);
          break;
        case 'put':
          resData = await putRequest(JSON.parse(body || '{}'), customHeaders, token);
          break;
        case 'patch':
          resData = await patchRequest(JSON.parse(body || '{}'), customHeaders, token);
          break;
        case 'delete':
          if (!params) {
            throw new Error('Params are required for DELETE');
          }
          resData = await deleteRequest(customHeaders, token, params);
          break;
        case 'options':
          resData = await fetch('http://0.0.0.0:8080/', {
            method: 'OPTIONS',
            headers: customHeaders,
          }).then((res) => res.json());
          break;
        default:
          throw new Error('Invalid method');
      }
      setResponse(resData);
    } catch (err) {
      setError(`Error: ${err.message}`);
      setResponse(null);
      console.error(err);
    }
  };

  return (
    <div className="requests-container">
      <div className="card input-card">
        <h2>Request</h2>
        <label>
          Endpoint:
          <input
            type="text"
            value={`/api/${name}`}
            readOnly // Solo lectura, ya que viene de la URL
          />
        </label>
        {name.toLowerCase() === 'delete' && (
          <label>
            Params (for DELETE, e.g., index=2):
            <input
              type="text"
              placeholder="index=2"
              value={params}
              onChange={(e) => setParams(e.target.value)}
            />
          </label>
        )}
        <label>
          Body (for POST/PUT/PATCH):
          <textarea
            placeholder='{"key": "value"}'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={name.toLowerCase() === 'get' || name.toLowerCase() === 'delete' || name.toLowerCase() === 'options'} // Desactivar si no aplica
          ></textarea>
        </label>
        <button onClick={handleSendRequest}>Send Request</button>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="card response-card">
        <h2>Response</h2>
        {response ? (
          <pre>{JSON.stringify(response, null, 2)}</pre>
        ) : (
          <p>No response yet</p>
        )}
      </div>
    </div>
  );
};

export default Requests;
