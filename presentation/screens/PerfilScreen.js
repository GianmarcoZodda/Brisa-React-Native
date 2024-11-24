import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../data/AuthContext'; 
import { useUser } from '../../data/UserContext'; 
import { useTheme } from '../../utils/theme'; 
import strings from '../../utils/strings/strings';
import EyeIcon from "../components/EyeIcon";
import axios from 'axios';
import UserImages from '../components/UserImages'; 
import API_URL_BACKEND from '../../data/api/apiUrl.js';

const PerfilScreen = () => {
  const { user, token } = useAuth(); 
  const { deleteResult } = useUser(); 
  const theme = useTheme();
  const [images, setImages] = useState([]);


    const fetchUserImages = async () => {
      try {
        const response = await axios.get(`${API_URL_BACKEND}imagenes`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache'
          }
        });

        console.log('Imágenes recibidas:', response.data.images);
        setImages(response.data.images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    useEffect(() => {
      fetchUserImages();
    }, [])

    //este metodo es para que se vuelva a llamar el fetch, que me trae mis imgs
    const handleDeleteResult = async (resultado) => {
      await deleteResult(resultado);
      fetchUserImages(); 
  };


  return (
    <View style={styles.container}>
      <EyeIcon />
      
      <Text style={[styles.username, { color: theme.inverseBackground }]}>
        {user.username || 'Usuario'}
      </Text>
      
      <Text style={[styles.email, { color: theme.inverseBackground }]}>
        {user.email || 'Correo no disponible'}
      </Text>

      <Text style={[styles.retinasText, { color: theme.inverseBackground }]}>
        {strings.estudios}
      </Text>

      <UserImages images={images} deleteResult={handleDeleteResult}/> 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    paddingBottom: 80,
    marginTop: 30,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  retinasText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default PerfilScreen;
