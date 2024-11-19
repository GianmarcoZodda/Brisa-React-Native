import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import API_URL_BACKEND from "../../data/api/apiUrl"
import { useTheme } from '../../utils/theme';
import strings from '../../utils/strings/strings';
import EyeIcon from "../components/EyeIcon";
import Btn from "../components/Btn";


const SubirImagenScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [imagen, setImagen] = useState(null);
  const [fechaSubida, setFechaSubida] = useState(null);

  const elegirImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    } else {
      Alert.alert("Selección cancelada", "No se seleccionó ninguna imagen.");
    }
  };

  const subirImagen = async () => {
    if (!imagen) {
      Alert.alert("Error", "Primero selecciona una imagen.");
      return;
    }

    const fechaActual = new Date();
    const fecha = fechaActual.toLocaleDateString();
    const horario = fechaActual.toLocaleTimeString();
    setFechaSubida({ fecha, horario });

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imagen,
        type: 'image/jpeg',
        name: 'imagen.jpg',
      });

      // Verificar si la imagen es una retina
      const response = await fetch(`${API_URL_BACKEND}isRetina`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.result) {
        Alert.alert("Éxito", "La imagen es una retina.");
        // Aquí puedes proceder con el análisis adicional o la lógica adicional
        navigation.navigate("Perfil", { imagen, fecha, horario });
      } else {
        Alert.alert("No es una retina", "La imagen seleccionada no es una retina.");
      }
    } catch (error) {
      console.error("Error al verificar si es retina:", error);
      Alert.alert("Error", "Hubo un problema al verificar si la imagen es una retina.");
    }
  };

  return (
    <View style={styles.container}>
      <EyeIcon />


      <TouchableOpacity style={[styles.imagePlaceholder, {borderColor: theme.primary}]} onPress={elegirImagen}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>{strings.seleccionarImagen}</Text>
        )}
      </TouchableOpacity>

      <Btn
        onPress={subirImagen} 
        text={strings.subirImagen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: 244,
    height: 244,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 18,
  },
  image: {
    width: 244,
    height: 244,
    borderRadius: 10,
  }
});

export default SubirImagenScreen;
