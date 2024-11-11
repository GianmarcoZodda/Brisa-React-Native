import axios from 'axios';
import API_URL_BACKEND from "./api/apiUrl"
import {credencialesIncorrectas, errorDeConexion} from '../utils/strings/strings';

export const login = async (username, password) => {
  console.log(API_URL_BACKEND);
  console.log(username);
  console.log(password);

  try {
      console.log("entro al try del servicio");
      const response = await axios.post(`${API_URL_BACKEND}login`, { username, password });
      console.log("response: ", response);

      if (response.data && response.data.token) {
          console.log("token: ", response.data.token);
          return response.data.token;
      } else {
          console.log("credenciales incorrectas");
          throw new Error('Credenciales incorrectas');
      }
  } catch (error) {
      if (error.response) {
          // Si el error tiene respuesta, lo que significa que es un error HTTP
          console.log("Error en la respuesta del servidor: ", error.response.data);
          throw new Error(error.response.data.message || 'Error de conexión');
      } else if (error.request) {
          // Si no hay respuesta (por ejemplo, la solicitud no se envió correctamente)
          console.log("Error en la solicitud: ", error.request);
          throw new Error('Error de conexión');
      } else {
          // Cualquier otro error no relacionado con la respuesta HTTP
          console.log("Error desconocido: ", error.message);
          throw new Error('Error desconocido');
      }
  }
};

