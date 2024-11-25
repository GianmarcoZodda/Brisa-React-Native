import strings from '../../utils/strings/strings';
import React, {useState} from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../data/ThemeContext';
import API_URL_BACKEND from '../../data/api/apiUrl';
import { Ionicons } from '@expo/vector-icons';
import ModalDelete from './ModalDelete';
import ModalAnalisis from './ModalAnalisis';

const UserImages = ({ images, deleteResult }) => {
  const theme = useAppTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);  //modal para eliminar
  const [isModalShowVisible, setIsModalShowVisible] = useState(false);  //modale para mostrar
  const [selectedImage, setSelectedImage] = useState(null); //same

  if (!images || images.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[styles.noImagesText, { color: theme.inverseBackground }]}>
          {strings.sinEstudios}
        </Text>
      </View>
    );
  }

  //modal eliminar
  const handleDeletePress = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  //modal mostrar
  const handleShowPress = (image) => {
    setSelectedImage(image);
    setIsModalShowVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item }) => {

          const correctedPath = item.path.replace(/\\/g, '/'); 
        
          return (
            <View style={styles.imageCard}>

            <TouchableOpacity onPress={() => handleShowPress(item)}>
              <Image
                source={{ uri: `${API_URL_BACKEND}${correctedPath}` }} 
                style={styles.image}
              />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleShowPress(item)}>
              <View style={styles.infoContainer}>
              <Text style={[styles.imageText, { color: theme.inverseBackground }]}>
                Fecha: {item.fecha} 
              </Text>
              <Text style={[styles.imageText, { color: theme.inverseBackground }]}>
                Hora: {item.horario}
              </Text>
              </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDeletePress(item)} style={styles.deleteImg}>
                <Ionicons name="trash" size={30} color="red"/>
              </TouchableOpacity>

            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />

       
        <ModalDelete
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onDelete={() => {
          deleteResult(selectedImage); // esta es la funcion que me pasa la screen
          setIsModalVisible(false); 
        }}
      />

      <ModalAnalisis
      isVisible={isModalShowVisible}
      onClose={() => setIsModalShowVisible(false)}
      resultado={selectedImage  || {}}  //este no recibe funcion, porq solo mem mmuestra el resultado del anmalisis. le agregho el obj vacio porque si no selecciono img me da error
      ></ModalAnalisis>

    </View>

  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  imageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 40,
  },
  infoContainer: {
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageText: {
    fontSize: 16,
  },
  noImagesText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  deleteImg: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserImages;
