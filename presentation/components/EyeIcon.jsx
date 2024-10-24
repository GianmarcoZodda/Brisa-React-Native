import React from 'react';
import { View, Image, StyleSheet, useColorScheme } from 'react-native';

const EyeIcon = ({ style }) => {
  const colorScheme = useColorScheme(); // me dice si esta en dark mode o ñight

  const eyeImage = colorScheme === 'dark' 
    ? require('../../assets/black_eye_brisa.png') // Imagen para modo oscuro
    : require('../../assets/white_eye_brisa.jpg'); // Imagen para modo claro

  return (
    <View style={[styles.container, style]}>
      <Image
        source={eyeImage}
        style={styles.image} // Aplica los estilos a la imagen
        resizeMode="cover" // Asegúrate de que la imagen se recorte correctamente
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 88, // Ancho de la imagen
    height: 88, // Alto de la imagen
    borderRadius: 44, // Hace que la imagen sea circular
  },
});

export default EyeIcon;