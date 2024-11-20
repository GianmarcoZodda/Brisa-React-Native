import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAuth } from '../../data/AuthContext'; 
import RetinaCard from '../components/RetinaCard'; 
import { useTheme } from '../../utils/theme'; 
import strings from '../../utils/strings/strings';
import EyeIcon from "../components/EyeIcon";
import API_URL_BACKEND from '../../data/api/apiUrl';
import axios from 'axios';

const PerfilScreen = () => {
  const { user, token } = useAuth();  // Obtener el token de autenticación
  const [miniCards, setMiniCards] = useState([]);
  const theme = useTheme();


  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const response = await axios.get(`${API_URL_BACKEND}imagenes`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });


        const contentType = response.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
          if (response.status === 200) {
            /*
            console.log("response: ", response)
            console.log("-------------------")
            console.log("response data: ", response.data)
            console.log("-------------------")
            console.log("response images: ", response.data.images)
            */
            setMiniCards(response.data.images || []);
          } else {
            Alert.alert('Error', response.data.message || 'Hubo un error al obtener las imágenes.');
          }
        } else {
          const text = response.data; // Captura la respuesta como texto si no es JSON
          console.error("La respuesta no es JSON:", text);
          Alert.alert('Error', 'La respuesta del servidor no es válida.');
        }
      } catch (error) {
        console.error('Error al obtener imágenes del usuario:', error);
        Alert.alert('Error', 'Hubo un error al obtener las imágenes.');
      }
    };

    fetchUserImages();
  }, []);


  return (
    <View style={styles.container}>
      <EyeIcon />
      <Text style={[styles.username, { color: theme.inverseBackground }]}>
        {user.username || 'Usuario'}
      </Text>
      <Text style={[styles.email, { color: theme.inverseBackground }]}>
        {user.email || 'Correo no disponible'}
      </Text>

      {/* Mostrar las imágenes si existen */}
      <Text style={[styles.retinasText, { color: theme.inverseBackground }]}>
        {strings.estudios}
      </Text>

      {miniCards.length === 0 ? (
        <Text style={[styles.noImagesText, { color: theme.inverseBackground }]}>
          No tienes estudios registrados.
        </Text>
      ) : (
        <FlatList
          data={miniCards}
          renderItem={({ item }) => (
            <RetinaCard
              fecha={item.fecha}
              horario={item.horario}
            />
          )}
          keyExtractor={(item) => item}
          style={styles.retinaList}
          contentContainerStyle={styles.retinaListContent}
        />
      )}
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
  noImagesText: {
    fontSize: 16,
    marginVertical: 20,
  },
  retinaList: {
    flex: 1,
    width: '100%',
  },
  retinaListContent: {
    paddingBottom: 20,
  },
});

export default PerfilScreen;
