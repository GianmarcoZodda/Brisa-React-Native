import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService } from './AuthService';
import { register as registerService } from './AuthService';
import { deleteAccount as deleteAccountService } from './AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import emailRegex from '../utils/Constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null)

  //esto se usa para saber si el user esta autenticado o no
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        const storedUser = JSON.parse(await AsyncStorage.getItem('user'));
        console.log("Token cargado desde AsyncStorage:", storedToken)
        console.log("User cargado desde AsyncStorage:", storedUser)
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
          setIsAuthenticated(true);
          setError(null);
           // agarro el user y el token
        }
      } catch (err) {
        console.error("Error cargando la data:", err);
      }
    };
    loadData();
  }, []);

   



  const deleteAccount = async (navigation) => {
    setError(null);
    
    try {
      // Enviar solicitud al backend para eliminar la cuenta
      const token = await AsyncStorage.getItem('authToken');
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      console.log("id: ", user.id)
      console.log("authToken: ", token)

      if (!token || !user) {
        throw new Error("No se encontró token o user.");
      }
      
      const response = await deleteAccountService(user.id, token);
  
      if (response.status === 200) {
        console.log('Cuenta eliminada con éxito');
        
        // Borrar datos locales (token y usuario)
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('user');
        console.log("user: ", user)
        console.log("authToken: ", token)
        
        // Actualizar el estado en el contexto
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
  
        // Redirigir al usuario a la pantalla de login o cualquier otra página
        navigation.navigate('Login');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error al eliminar la cuenta:', err);
    }
  };




  const login = async (username, password) => {
    setError(null); //pongo el error en nulo para sacar el anterior, sui es q habia
   
    try {
      const [authToken, userData] = await loginService(username, password);   
      console.log("llame al servicio")

      if (authToken && userData) {
      console.log("authtoken: "+authToken)
      console.log("user: "+userData)

      setToken(authToken);
      setUser(userData);
      setIsAuthenticated(true);

      await AsyncStorage.setItem('authToken', authToken);
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      console.log("entre en el try del context. Token: "+authToken)
      console.log("entre en el try del context. user: "+userData)
      }
    
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
    } 
  };

  const register = async (username, email, password) => {
    setError(null)
    try{
      console.log("entro al try del authcontext")
      const [registroToken, userData] = await registerService(username, email, password);
      console.log("token al registrarme: ", registroToken);
      console.log("user al registrarme: ", userData);

      if(registroToken && userData){
        setToken(registroToken);
        setUser(userData)
        setIsAuthenticated(true);

        await AsyncStorage.setItem('authToken', registroToken);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
      }
    }catch(error){
      setError(error.message)
      setIsAuthenticated(false);
      console.log("error: ", error)
    }
  }
  
  const logout = async (navigation) => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      console.log("Token y User eliminado de AsyncStorage");
      navigation.navigate("Login")
    } catch (err) {
      console.error("Error al eliminar el token y el user:", err);
    }
  };


  const validateEmail = (email) => {
    if (email && !emailRegex.test(email)) { //esa funcion de test valida que lo que tiene entre () cumpla con lo que esta en regex
      return false;
    }
    return true;
  }

  const validateLength = (text, minLength) => {
    if (text.length < minLength) {
      return false;
    }
    return true;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error, setError,  token, register, user, validateEmail, validateLength, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};