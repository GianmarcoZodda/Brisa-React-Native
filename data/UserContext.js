import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';  
import { deleteAccount as deleteAccountService, deleteResult as deleteResultService } from './UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { setError, setUser, setToken, setIsAuthenticated } = useAuth();  

    const deleteAccount = async (navigation) => {
        setError(null);  
        
        try {
            const token = await AsyncStorage.getItem('authToken');
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            console.log("Token cargado desde AsyncStorage en userContext:", token)
            console.log("User cargado desde AsyncStorage en userContext:", user)

            if (!token || !user) {
                throw new Error("No se encontró token o usuario.");
            }
            
            const response = await deleteAccountService(user.id, token);
  
            if (response.status === 200) {
                console.log('Cuenta eliminada con éxito');
                
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
        console.log("imagen: ",resultado)
        console.log("----------")
        console.log("fecha: ",fecha)
        console.log("horario: ",horario)
        console.log("----------")

        const token = await AsyncStorage.getItem('authToken');
        console.log("Token cargado desde AsyncStorage en userContext:", token)

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

return (
    <UserContext.Provider value={{ deleteAccount, deleteResult }}>
        {children}
    </UserContext.Provider>
);
};

// Custom hook para usar el contexto
export const useUser = () => {
    return useContext(UserContext);
};
