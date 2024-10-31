import React from 'react';
import { View, StyleSheet, Image, } from 'react-native';
import logoTransp from '../../assets/logoTransparente.png';
import Btn from '../../presentation/components/Btn';
import strings from '../../utils/strings/strings'; // Asegúrate de tener `strings` configurado correctamente
import { useNavigation } from '@react-navigation/native';



const HomeScreen = () => {
  const navigation = useNavigation();

  const subirImagen = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image 
        source={logoTransp} 
        style={styles.logo} 
        resizeMode="contain" 
      />
      <Btn 
        text={strings.logOut} 
        onPress={subirImagen} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  logo: {
    width: 88,
    height: 88,
    marginBottom: 16,
    position: 'absolute', // Posiciona la imagen en un lugar específico dentro de la pantalla
    top: 30, // Margen desde la parte superior
    left: 16, // Margen desde la izquierda
  },
});

export default HomeScreen;
