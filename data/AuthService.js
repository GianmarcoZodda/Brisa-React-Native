import axios from 'axios';
import API_URL_BACKEND from "./api/apiUrl"
import {credencialesIncorrectas, errorDeConexion} from '../utils/strings/strings';

export const login = async (email, password) => {
    console.log(API_URL_BACKEND)
    console.log(email)
    console.log(password)
  try {
    console.log("entro al try del servicio")
    const response = await axios.post(API_URL_BACKEND, { email, password });
    if (response.data.success  && response.data.token) {
        console.log("token: " + response.data.token)
      return response.data.token;
      //es exitoso, me devuelve el token
    } else {
        console.log("credenciales incorrectas")
      throw new Error(response.data.message || credencialesIncorrectas);
      //no es exitoso, algo mal con lo ingresado (me devuelve ese error o el mensaje predefinido)
    }
  } catch (error) {
    console.log("error de conexion")
    throw new Error(error?.response?.data?.message || errorDeConexion);
    //devuelve ese error desconocido o el mnsj predefinido
  }
};