import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import API_URL_BACKEND from '../../data/api/apiUrl'; 
import { useAuth } from '../../data/AuthContext'; 
import RetinaCard from '../components/RetinaCard'; 
import { useTheme } from '../../utils/theme'; 
import strings from '../../utils/strings/strings';
import EyeIcon from "../components/EyeIcon";

const PerfilScreen = () => {
  const { user, token } = useAuth(); 
  const [miniCards, setMiniCards] = useState([]);
  const theme = useTheme();

  const obtenerImagenes = async () => {
    try {
      const response = await fetch(`${API_URL_BACKEND}imagenes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener las imágenes');
      }

      const data = await response.json();
      if (data && data.images) {
        const images = data.images.map((image, index) => ({
          id: index.toString(),
          miniatura: { uri: image.url },
          fecha: image.fecha,
          horario: image.horario,
        }));
        setMiniCards(images);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las imágenes');
      console.error(error);
    }
  };

  // Verifica si 'user' está presente antes de intentar renderizar la información
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text> {/* O redirigir a una pantalla de carga */}
      </View>
    );
  }

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
              miniatura={item.miniatura}
              fecha={item.fecha}
              horario={item.horario}
            />
          )}
          keyExtractor={(item) => item.id}
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
