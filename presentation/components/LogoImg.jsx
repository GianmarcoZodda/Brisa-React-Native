import React from 'react';
import { View, Image, StyleSheet, useColorScheme } from 'react-native';

const LogoImg = () => {
  const colorScheme = useColorScheme(); // me dice si esta en dark mode o ñight

  const eyeImage = colorScheme === 'dark' 
    ? require('../../assets/brisa.jpg') // Imagen para modo oscuro
    : require('../../assets/white_brisa.jpg'); // Imagen para modo claro

  return (
    <View style={[styles.container]}>
      <Image
        source={eyeImage}
        style={styles.image} // Aplica los estilos a la imagen
        resizeMode="contain" // Asegúrate de que la imagen se recorte correctamente
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '95%', // Ancho de la imagen
    height: 30, // Alto de la imagen
  },
});

export default LogoImg;