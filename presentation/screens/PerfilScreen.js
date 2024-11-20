import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../data/AuthContext'; 
import { useTheme } from '../../utils/theme'; 
import strings from '../../utils/strings/strings';
import EyeIcon from "../components/EyeIcon";
import axios from 'axios';
import API_URL_BACKEND from "../../data/api/apiUrl"; 
import UserImages from '../components/UserImages'; // Importamos el componente

const PerfilScreen = () => {
  const { user, token } = useAuth(); 
  const theme = useTheme();
  const [images, setImages] = useState([]);

  useEffect(() => {
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

    fetchUserImages();
  }, [token]);

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

      <UserImages images={images} /> {/* Pasamos las imágenes al componente UserImages */}
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
