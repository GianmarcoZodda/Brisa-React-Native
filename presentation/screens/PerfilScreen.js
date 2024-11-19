import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Btn from '../../presentation/components/Btn';
import RetinaCard from '../components/RetinaCard';
import { useAuth } from '../../data/AuthContext';
import { useTheme } from '../../utils/theme';
import EyeIcon from '../components/EyeIcon';
import retina1 from '../../assets/retina1.jpg';
import retina2 from '../../assets/retina2.jpg';
import retina3 from '../../assets/retina3.jpg';

const PerfilScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth(); // Obtenemos datos del usuario y función logout del contexto
  const [miniCards, setMiniCards] = useState([]);
  const theme = useTheme();

  // Manejo de imágenes subidas
  useEffect(() => {
    if (route.params?.imagen) {
      const nuevaImagen = {
        id: `${miniCards.length + 1}`,
        miniatura: { uri: route.params.imagen },
        fecha: route.params.fecha,
        horario: route.params.horario,
      };
      setMiniCards((prevCards) => [nuevaImagen, ...prevCards]);
    }
  }, [route.params]);

  const subirImagen = () => {
    navigation.navigate('SubirImagen');
  };


  if (!user) {
    navigation.navigate("Login")
  }

  return (
    <View style={styles.container}>
      <EyeIcon />

      <View style={styles.profileContainer}>
        <Text style={[styles.username, {color: theme.inverseBackground}]}>{user.username || 'Usuario'}</Text>
        <Text style={[styles.email, {color: theme.inverseBackground}]}>{user.email || 'Correo no disponible'}</Text>
      </View>

      <Text style={[styles.retinasText, {color: theme.inverseBackground}]}>Mis Estudios:</Text>

      {miniCards.length === 0 ? (
        <Text style={[styles.noImagesText, {color: theme.inverseBackground}]}>Todavía no tienes imágenes de tus estudios.</Text>
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

      <Text style={styles.exampleImagesTitle}>Imágenes de ejemplo:</Text>
      <FlatList
        data={[
          { id: '1', miniatura: retina1, fecha: '2024-11-10', horario: '14:30' },
          { id: '2', miniatura: retina2, fecha: '2024-11-11', horario: '15:00' },
          { id: '3', miniatura: retina3, fecha: '2024-11-12', horario: '16:15' },
        ]}
        renderItem={({ item }) => (
          <RetinaCard
            miniatura={item.miniatura}
            fecha={item.fecha}
            horario={item.horario}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.exampleList}
        contentContainerStyle={styles.exampleListContent}
      />

      <Btn text="Subir Imagen" onPress={subirImagen} />
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
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
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
  exampleImagesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginVertical: 10,
  },
  exampleList: {
    flex: 1,
    width: '100%',
  },
  exampleListContent: {
    paddingBottom: 20,
  },
});

export default PerfilScreen;