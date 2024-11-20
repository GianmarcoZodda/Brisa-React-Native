import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useAuth } from '../../data/AuthContext'; 
import UserImages from '../components/UserImages'; 
import { useTheme } from '../../utils/theme'; 
import strings from '../../utils/strings/strings';
import EyeIcon from "../components/EyeIcon";


const PerfilScreen = () => {
  const { user } = useAuth(); //tambien me agarro el loaddata, para hacer el usefect que me actualiza el usuario (el usefect)
  const theme = useTheme();
  const images = user.imagenes || []; 
  console.log("imagenes: ",images)


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

      {/* Componente UserImages que maneja la visualización de las imágenes */}
      <UserImages images={images} />
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
