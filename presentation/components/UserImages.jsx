import strings from '../../utils/strings/strings';
import React from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import { useAppTheme } from '../../data/ThemeContext';
import API_URL_BACKEND from '../../data/api/apiUrl';

const UserImages = ({ images }) => {
  const theme = useAppTheme();

  if (!images || images.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[styles.noImagesText, { color: theme.inverseBackground }]}>
          {strings.sinEstudios}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item }) => {
          console.log("item: ", item)
          console.log("---------")
          console.log("item path: ", item.path)
          const correctedPath = item.path.replace(/\\/g, '/'); // Asegúrate de usar barras inclinadas
          return (
            <View style={styles.imageCard}>
              <Image
                source={{ uri: `${API_URL_BACKEND}${correctedPath}` }} 
                style={styles.image}
              />
              <Text style={[styles.imageText, { color: theme.inverseBackground }]}>
                Fecha: {item.fecha} - Hora: {item.horario}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
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
