import axios from 'axios';
import API_URL_BACKEND from "./api/apiUrl"
import {credencialesIncorrectas, errorDeConexion} from '../utils/strings/strings';

export const login = async (username, password) => {
    console.log(API_URL_BACKEND)
    console.log(username)
    console.log(password)
  try {
    console.log("entro al try del servicio")
    const response = await axios.post(`${API_URL_BACKEND}login`, { username, password });
    console.log(response)
    console.log("-------------")
    console.log(response.data.token)
    console.log("-------------")
    if (response.data.token) {
        console.log("token: " + response.data.token)
      return response.data.token;
      //es exitoso, me devuelve el token
    } else {
        console.log("credenciales incorrectas")
      throw new Error(credencialesIncorrectas);
      //no es exitoso, algo mal con lo ingresado (me devuelve el mensaje predefinido)
    }
  } catch (error) {
    console.log(errorDeConexion)
    throw new Error(errorDeConexion);
  }
};
