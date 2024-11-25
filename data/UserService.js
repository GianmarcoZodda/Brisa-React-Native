import axios from 'axios';
import API_URL_BACKEND from './api/apiUrl';
import {errorDeConexion, errorDesconocido, errorServidor, sinEliminarCuenta, sinEliminarResultado, sinToken} from '../utils/strings/strings';

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
            throw new Error(sinEliminarCuenta);
        }
    } catch (error) {
        if (error.response) {
            // Error del servidor
            throw new Error(error.response.data.message || errorServidor);
        } else if (error.request) {
            // Error en la solicitud
            console.log(errorDeConexion)
            throw new Error(errorDeConexion);
        } else {
            // Otros errores
            console.log(errorDesconocido)
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
            throw new Error(sinEliminarResultado);
        }
    } catch (error) {
        if (error.response) {
            // Error del servidor
            throw new Error(error.response.data.message || errorServidor);
        } else if (error.request) {
            // Error en la solicitud
            console.log(errorDeConexion)
            throw new Error(errorDeConexion);
        } else {
            // Otros errores
            console.log(errorDesconocido)
            throw new Error(errorDesconocido);
        }
    }
};

export const fetchUserImages = async (token) => {
    if (!token) {
        throw new Error(sinToken);
    }

    try {
        const response = await axios.get(`${API_URL_BACKEND}imagenes`, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Cache-Control': 'no-cache'
            }
        });
        
        return response.data.images || []; 
        
    } catch (error) {
        if (error.response) {
            console.error(errorServidor, " ", error.response.data.message || error.response.status);
            throw new Error(error.response.data.message || errorServidor);
        } else if (error.request) {
            console.error(errorDeConexion, " ", error.message);
            throw new Error(errorDeConexion);
        } else {
            console.error(errorDesconocido, " ", error.message);
            throw new Error(errorDesconocido);
        }
    }
};
