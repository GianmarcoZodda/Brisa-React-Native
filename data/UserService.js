import axios from 'axios';
import API_URL_BACKEND from './api/apiUrl';
import {errorDeConexion, errorDesconocido} from '../utils/strings/strings';

export const deleteAccount = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL_BACKEND}users/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

       
        if (response.status === 200) {
            return response;  
        } else {
            throw new Error("No se pudo eliminar la cuenta.");
        }
    } catch (error) {
        if (error.response) {
            // Error del servidor
            throw new Error(error.response.data.message || "Error en el servidor.");
        } else if (error.request) {
            // Error en la solicitud
            console.log("Error de conexión")
            throw new Error(errorDeConexion);
        } else {
            // Otros errores
            console.log("Error desconocido")
            throw new Error(errorDesconocido);
        }
    }
};


export const deleteResult = async (fecha, horario, token) => {
    try {
        const response = await axios.delete(`${API_URL_BACKEND}users/deleteResult/${fecha}/${horario}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
       
        if (response.status === 200) {
            return response;  
        } else {
            throw new Error("No se pudo eliminar el resultado.");
        }
    } catch (error) {
        if (error.response) {
            // Error del servidor
            throw new Error(error.response.data.message || "Error en el servidor.");
        } else if (error.request) {
            // Error en la solicitud
            console.log("Error de conexión")
            throw new Error(errorDeConexion);
        } else {
            // Otros errores
            console.log("Error desconocido")
            throw new Error(errorDesconocido);
        }
    }
};
