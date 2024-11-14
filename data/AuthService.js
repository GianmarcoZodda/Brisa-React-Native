import axios from 'axios';
import API_URL_BACKEND from "./api/apiUrl"
import {credencialesIncorrectas, errorDeConexion, errorDesconocido} from '../utils/strings/strings';

export const login = async (email, password) => {
  console.log(API_URL_BACKEND);
  console.log(email);
  console.log(password);

  try {
      console.log("entro al try del servicio");
      const response = await axios.post(`${API_URL_BACKEND}login`, { email, password });
      console.log("response: ", response);
      console.log("user: ", response.data.user)
      if (response.data && response.data.token && response.data.user) {
          const token = response.data.token;
          console.log("token: ", token);
          const user = response.data.user;
          console.log("user: ", user);
          console.log("respuesta: ", [token, user])
          return [token, user];
      } else {
          console.log(credencialesIncorrectas);
          throw new Error(credencialesIncorrectas);
      }
  } catch (error) {
      if (error.response) {
          // Si el error tiene respuesta, lo que significa que es un error HTTP
          console.log("Error en la respuesta del servidor: ", error.response.data);
          throw new Error(error.response.data.message || errorDeConexion);
      } else if (error.request) {
          // Si no hay respuesta (por ejemplo, la solicitud no se envió correctamente)
          console.log("Error en la solicitud: ", error.request);
          throw new Error(errorDeConexion);
      } else {
          // Cualquier otro error no relacionado con la respuesta HTTP
          console.log("Error desconocido: ", error.message);
          throw new Error(errorDesconocido);
      }
  }
};

export const register = async (username, email, password) => {
    console.log("estoy en el servicio");
    console.log(username);
    console.log(email);
    console.log(password);

    try{
        console.log("entro al try del servicio para el registro");
        const response = await axios.post(`${API_URL_BACKEND}register`, { username, email, password });
        console.log("response: ", response);
        const token = response.data.token;
        console.log("token en response data: ", token);
        const user = response.data.user;
        console.log("user: ", user)
        if(token && user){
            return [token, user];
        }
    }catch (error){
        if (error.response) {
            // Si el error tiene respuesta, lo que significa que es un error HTTP
            console.log("Error en la respuesta del servidor: ", error.response.data);
            throw new Error(error.response.data.message || errorDeConexion);
        } else if (error.request) {
            // Si no hay respuesta (por ejemplo, la solicitud no se envió correctamente)
            console.log("Error en la solicitud: ", error.request);
            throw new Error(errorDeConexion);
        } else {
            // Cualquier otro error no relacionado con la respuesta HTTP
            console.log("Error desconocido: ", error.message);
            throw new Error(errorDesconocido);
        }
    }
};

