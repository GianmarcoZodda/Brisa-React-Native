import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../data/AuthContext'; 
import { useUser } from '../../data/UserContext'; 
import { useTheme } from '../../utils/theme'; 
import strings from '../../utils/strings/strings';
import EyeIcon from "../components/EyeIcon";
import UserImages from '../components/UserImages'; 

const PerfilScreen = () => {
  const { user } = useAuth(); 
  const { images, deleteResult, fetchUserImages } = useUser(); 
  const theme = useTheme();

//este useffect es para traerme las imagenes
  useEffect(() => {
    fetchUserImages();
  }, []);

  //este es para borrar las imagenes y traerme las imagenes nuevamente (el array actualizado)
const handleDeleteResult = async (resultado) => {
    await deleteResult(resultado);
    await fetchUserImages(); 
};


if (!user) {
  return (
    <View style={styles.container}>
      <Text style={[styles.username, { color: theme.inverseBackground }]}>
        Cargando perfil...
      </Text>
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
