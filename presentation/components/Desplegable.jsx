import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../data/ThemeContext';

const Desplegable = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const theme = useAppTheme();

  // Función para alternar el estado de apertura/cierre
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleOpen}>
        <Text style={[styles.title, {color: theme.inverseBackground}]}>{title}</Text>
        <MaterialIcons 
          name={isOpen ? "expand-less" : "expand-more"} 
          size={24} 
          color={theme.inverseBackground} 
          style={styles.icon} 
        />
      </TouchableOpacity>
      
      {isOpen && (
        <View style={styles.content}>
          <Text style={{color: theme.inverseBackground, marginBottom: 40}}>{content}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 30
  },
  header: {
    flexDirection: 'row',   //para q quede como fila lo de adentro del touchable
    justifyContent: 'space-between', // Alinea los elementos con espacio entre ellos
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, // Hace que el título ocupe todo el espacio disponible para centrarlo (lo manda al medio, porque le di flex1)
    textAlign: 'center', // Centra el texto (lo manda al medio, porque le di flex1)
  },
  icon: {
    marginLeft: 10, // Da un espacio entre el título y el icono (se lo estoy poniendo solo al icono..)
  },
  content: {
    padding: 15,

  },
});

export default Desplegable;
