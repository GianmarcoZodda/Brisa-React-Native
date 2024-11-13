import React from 'react';
import { View, Image, StyleSheet, useColorScheme, Dimensions } from 'react-native';


const LogoImg = () => {
  const colorScheme = useColorScheme(); // me da el modo claro/oscuro

  const eyeImage = colorScheme === 'dark' 
    ? require('../../assets/brisa.jpg') // img light mode
    : require('../../assets/white_brisa.jpg'); // img dark

  // uso dimens para obtener cual es el ancho de mi pantalla
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Image
        source={eyeImage}
        style={[styles.image, { width: screenWidth * 1.4 }]} // con esto, le digo q el logo tenga un widht del 80x100to
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  image: {
    height: undefined, // Deja que el alto se ajuste automáticamente
    aspectRatio: 2, // Relación de aspecto, ajusta según la proporción de tu imagen
  },
});

export default LogoImg;
