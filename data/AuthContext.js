import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService } from './AuthService';
import { register as registerService } from './AuthService';
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
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, error, setError,  token, setToken, register, user, setUser, validateEmail, validateLength }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};