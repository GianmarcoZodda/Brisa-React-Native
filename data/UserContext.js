import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';  
import { deleteAccount as deleteAccountService, deleteResult as deleteResultService, fetchUserImages as fetchUserImagesService } from './UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { setError, setUser, setToken, setIsAuthenticated } = useAuth();  
    const [images, setImages] = useState([]);   //para usar con el fetch

    const deleteAccount = async (navigation) => {
        setError(null);  
        
        try {
            const token = await AsyncStorage.getItem('authToken');
            const user = JSON.parse(await AsyncStorage.getItem('user'));

            if (!token || !user) {
                throw new Error("No se encontró token o usuario.");
            }
            
            const response = await deleteAccountService(user.id, token);
  
            if (response.status === 200) {
                
                await AsyncStorage.removeItem('authToken');
                await AsyncStorage.removeItem('user');
                
                setToken(null);
                setUser(null);
                setIsAuthenticated(false);
                setError(null);
  
                navigation.navigate('Login');
            }
        } catch (err) {
            setError(err.message); 
            console.error('Error al eliminar la cuenta:', err);
        }
    };

   

const deleteResult = async (resultado) => {   
    try {
        const {fecha, horario} = resultado;

        const token = await AsyncStorage.getItem('authToken');

        if (!token) {
            throw new Error("No se encontró token");
        }

        if(!resultado){
            throw new Error("No me llego un resultado en el context");
        }

        if (!fecha || !horario) {
            throw new Error("Datos incompletos para eliminar el resultado.");
        }

        const response = await deleteResultService(fecha, horario, token);

        if (response.status === 200) {
            console.log('Resultado eliminado con éxito');
        }
    } catch (err) {
        setError(err.message); 
        console.error('Error al eliminar el resultado:', err);
    }
};



const fetchUserImages = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      const imagenes = await fetchUserImagesService(token);

      setImages(imagenes || []); 
      return imagenes;
    } catch (error) {
      console.error('Error fetching images en el context:', error);
      setImages([]); 
      throw error;
    }
  };



return (
    <UserContext.Provider value={{ deleteAccount, deleteResult, fetchUserImages, images }}>
        {children}
    </UserContext.Provider>
);
};

// Custom hook para usar el contexto
export const useUser = () => {
    return useContext(UserContext);
};
