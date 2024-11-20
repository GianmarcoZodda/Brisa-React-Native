import strings from '../../utils/strings/strings';
import React from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import { useAppTheme } from '../../data/ThemeContext'

const UserImages = ({ images }) => {
  const theme = useAppTheme();

  if (!images || images.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[styles.noImagesText, {color: theme.inverseBackground}]}>
          {strings.sinEstudios}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={images} // Recibimos las imágenes como props
        renderItem={({ item }) => (
          <View style={styles.imageCard}>
            <Image
              source={{ uri: item.path }} // Mostramos la imagen
              style={styles.image}
            />
            <Text style={[styles.imageText, {color: theme.inverseBackground}]}>
              Fecha: {item.fecha} - Hora: {item.horario}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Usamos el índice como clave única
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingVertical: 10,
  },
  imageCard: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  imageText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  noImagesText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default UserImages;
